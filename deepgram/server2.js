const fs = require("fs");
const http = require("http");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const HttpDispatcher = require("httpdispatcher");
const WebSocketServer = require("websocket").server;
const dispatcher = new HttpDispatcher();
const wsserver = http.createServer(handleRequest);

const { createClient, LiveTranscriptionEvents } = require("@deepgram/sdk");
const OpenAI = require('openai');
const openai = new OpenAI();
const WebSocket = require('ws');
const twilio = require('twilio');
const logger = require('./logger');

const HTTP_SERVER_PORT = 5000; 
let streamSid = ''; 

const mediaws = new WebSocketServer({
  httpServer: wsserver,
  autoAcceptConnections: true,
});

const deepgramClient = createClient(process.env.DEEPGRAM_API_KEY);
const deepgramTTSWebsocketURL = 'wss://api.beta.deepgram.com/v1/speak?encoding=mulaw&sample_rate=8000&container=none';
let keepAlive;

let llmStart = 0;
let ttsStart = 0;
let firstByte = true;
let speaking = false;

let SYSTEM_PROMPT = "You are an assistant. Respond concisely and clearly.";  // Default prompt
let chatHistory = [];

// Read the system prompt from the file
fs.readFile('./prompt.txt', 'utf-8', (err, data) => {
  if (err) {
    logger.error('Error reading prompt file', { error: err });
  } else {
    SYSTEM_PROMPT = data;
    logger.info('System prompt loaded');
  }
});

function handleRequest(request, response) {
  try {
    dispatcher.dispatch(request, response);
  } catch (err) {
    logger.error('Error handling request', { error: err });
    response.writeHead(500);
    response.end('Internal Server Error');
  }
}

dispatcher.onGet("/", function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, World!');
});

// Handle incoming call from Twilio
dispatcher.onPost("/incoming", function (req, res) {
  const response = new twilio.twiml.VoiceResponse();
  response.connect().stream({
    url: 'wss://your-server.com/streams', // Update to your server's WebSocket URL
    parameters: {
      aCustomParameter: "aCustomValue that was set in TwiML"
    }
  });

  res.writeHead(200, { "Content-Type": "text/xml" });
  res.end(response.toString());
});

dispatcher.onPost("/twiml", function (req, res) {
  const filePath = path.join(__dirname, "templates", "streams.xml");

  fs.access(filePath, fs.constants.R_OK, (err) => {
    if (err) {
      logger.error("Error accessing streams.xml");
      res.writeHead(502, { "Content-Type": "text/plain" });
      res.end("Bad Gateway");
      return;
    }

    fs.stat(filePath, (err, stat) => {
      if (err) {
        logger.error("Error getting file stats");
        res.writeHead(502, { "Content-Type": "text/plain" });
        res.end("Bad Gateway");
        return;
      }

      res.writeHead(200, {
        "Content-Type": "text/xml",
        "Content-Length": stat.size,
      });

      const readStream = fs.createReadStream(filePath);
      readStream.pipe(res);
    });
  });
});

dispatcher.onPost("/makeCall", function (req, res) {
  let body = '';

  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', () => {
    const { toNumber, twimlUrl } = JSON.parse(body);

    makeCall(toNumber, process.env.TWILIO_PHONE_NUMBER, twimlUrl)
      .then(() => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Call initiated successfully' }));
      })
      .catch(err => {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Failed to initiate call', error: err.message }));
      });
  });
});

mediaws.on("connect", function (connection) {
  new MediaStream(connection);
});

class MediaStream {
  constructor(connection) {
    this.connection = connection;
    this.deepgram = setupDeepgram(this);
    this.deepgramTTSWebsocket = setupDeepgramWebsocket(this);
    connection.on("message", this.processMessage.bind(this));
    connection.on("close", this.close.bind(this));
    this.hasSeenMedia = false;
    this.messages = [];
    this.repeatCount = 0;
  }

  processMessage(message) {
    if (message.type === "utf8") {
      let data = JSON.parse(message.utf8Data);
      switch (data.event) {
        case "connected":
          logger.info("Twilio: Connected event received");
          break;
        case "start":
          logger.info("Twilio: Start event received");
          break;
        case "media":
          if (!this.hasSeenMedia) {
            this.hasSeenMedia = true;
          }
          if (!streamSid) {
            streamSid = data.streamSid;
          }
          if (data.media.track === "inbound") {
            let rawAudio = Buffer.from(data.media.payload, 'base64');
            this.deepgram.send(rawAudio);
          }
          break;
        case "mark":
          logger.info("Twilio: Mark event received");
          break;
        case "close":
          this.close();
          break;
      }
    } else if (message.type === "binary") {
      logger.warn("Twilio: Binary message received (not supported)");
    }
  }

  close() {
    logger.info("Twilio: Connection closed");
  }
}

async function promptLLM(mediaStream, prompt) {
  llmStart = Date.now();

  // Append the new user message to the chat history
  chatHistory.push({ role: 'user', content: prompt });

  const stream = openai.beta.chat.completions.stream({
    model: 'gpt-4o',
    stream: true,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      ...chatHistory,
    ],
  });

  speaking = true;
  let firstToken = true;
  try {
    for await (const chunk of stream) {
      if (speaking) {
        if (firstToken) {
          const duration = Date.now() - llmStart;
          ttsStart = Date.now();
          firstToken = false;
          firstByte = true;
        }
        const chunk_message = chunk.choices[0].delta.content;
        if (chunk_message) {
          process.stdout.write(chunk_message);

          // Append the assistant's message to the chat history
          chatHistory.push({ role: 'assistant', content: chunk_message });

          mediaStream.deepgramTTSWebsocket.send(JSON.stringify({ 'type': 'Speak', 'text': chunk_message }));
        }
      }
    }
  } catch (err) {
    logger.error("Error during LLM streaming", err);
  }
  mediaStream.deepgramTTSWebsocket.send(JSON.stringify({ 'type': 'Flush' }));
}

const setupDeepgramWebsocket = (mediaStream) => {
  const options = {
    headers: { Authorization: `Token ${process.env.DEEPGRAM_API_KEY}` }
  };
  const ws = new WebSocket(deepgramTTSWebsocketURL, options);

  ws.on('open', () => {
    logger.info('Deepgram TTS: Connected');
  });

  ws.on('message', (data) => {
    if (speaking) {
      try {
        const json = JSON.parse(data.toString());
        if (json.type === 'Metadata') {
          return;
        }
      } catch (e) {
        // Ignore
      }
      if (firstByte) {
        const duration = Date.now() - ttsStart;
        firstByte = false;
      }
      const payload = data.toString('base64');
      const message = {
        event: 'media',
        streamSid: streamSid,
        media: { payload },
      };
      mediaStream.connection.sendUTF(JSON.stringify(message));
    }
  });

  ws.on('close', () => {
    logger.info('Deepgram TTS: Disconnected from the WebSocket server');
  });

  ws.on('error', (error) => {
    logger.error('Deepgram TTS: Error received');
  });

  return ws;
}

const setupDeepgram = (mediaStream) => {
  let is_finals = [];
  const deepgram = deepgramClient.listen.live({
    model: "nova-2-phonecall",
    language: "en",
    smart_format: true,
    encoding: "mulaw",
    sample_rate: 8000,
    channels: 1,
    multichannel: false,
    no_delay: true,
    interim_results: true,
    endpointing: 300,
    utterance_end_ms: 1000
  });

  if (keepAlive) clearInterval(keepAlive);
  keepAlive = setInterval(() => {
    deepgram.keepAlive();
  }, 10 * 1000);

  deepgram.addListener(LiveTranscriptionEvents.Open, async () => {
    logger.info("Deepgram STT: Connected");

    deepgram.addListener(LiveTranscriptionEvents.Transcript, (data) => {
      const transcript = data.channel.alternatives[0].transcript;
      if (transcript !== "") {
        if (data.is_final) {
          is_finals.push(transcript);
          if (data.speech_final) {
            const utterance = is_finals.join(" ");
            is_finals = [];
            llmStart = Date.now();
            promptLLM(mediaStream, utterance);
          }
        } else {
          if (speaking) {
            mediaStream.connection.sendUTF(JSON.stringify({
              event: 'clear',
              streamSid: streamSid,
            }));
            mediaStream.deepgramTTSWebsocket.send(JSON.stringify({ 'type': 'Reset' }));
            speaking = false;
          }
        }
      }
    });

    deepgram.addListener(LiveTranscriptionEvents.UtteranceEnd, (data) => {
      if (is_finals.length > 0) {
        const utterance = is_finals.join(" ");
        is_finals = [];
        llmStart = Date.now();
        promptLLM(mediaStream, utterance);
      }
    });

    deepgram.addListener(LiveTranscriptionEvents.Close, async () => {
      logger.info("Deepgram STT: Disconnected");
      clearInterval(keepAlive);
      deepgram.requestClose();
    });

    deepgram.addListener(LiveTranscriptionEvents.Error, async (error) => {
      logger.error("Deepgram STT: Error received");
    });

    deepgram.addListener(LiveTranscriptionEvents.Warning, async (warning) => {
      logger.warn("Deepgram STT: Warning received");
    });

    deepgram.addListener(LiveTranscriptionEvents.Metadata, (data) => {
    });
  });

  return deepgram;
};

wsserver.listen(HTTP_SERVER_PORT, function () {
  logger.info(`Server listening on port ${HTTP_SERVER_PORT}`);
});

const makeCall = async (to, from, twimlUrl) => {
  const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  try {
    await client.calls.create({
      twiml: `<Response><Dial>${to}</Dial></Response>`,
      to,
      from,
    });
    logger.info('Call initiated successfully to', to);
  } catch (error) {
    logger.error('Failed to initiate call');
    throw error;
  }
};