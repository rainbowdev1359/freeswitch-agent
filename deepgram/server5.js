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
const { ElevenLabsClient } = require('elevenlabs');
const { pipeline } = require('stream');
const { promisify } = require('util');
const streamPipeline = promisify(pipeline);
const ffmpeg = require('fluent-ffmpeg');

const HTTP_SERVER_PORT = 5000; 
let streamSid = ''; 

const mediaws = new WebSocketServer({
  httpServer: wsserver,
  autoAcceptConnections: true,
});

const deepgramClient = createClient(process.env.DEEPGRAM_API_KEY);
const elevenlabs = new ElevenLabsClient({ apiKey: process.env.ELEVENLABS_API_KEY });
const voiceId = process.env.ELEVENLABS_VOICE_ID;
let keepAlive;

let llmStart = 0;

let SYSTEM_PROMPT = "You are an assistant. Respond concisely and clearly.";  // Default prompt

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
    this.chatHistory = []; // Each MediaStream instance has its own chat history
    connection.on("message", this.processMessage.bind(this));
    connection.on("close", this.close.bind(this));
    this.hasSeenMedia = false;
    this.messages = [];
    this.repeatCount = 0;

    // Agent talks first based on the system prompt
    this.initiateConversationWithDelay();
  }

  initiateConversationWithDelay() {
    setTimeout(() => {
      this.initiateConversation();
    }, 2000);
  }

  async initiateConversation() {
    await promptLLM(this, "");
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

async function streamToBuffer(stream) {
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}

async function convertAudioFormat(inputBuffer) {
  return new Promise((resolve, reject) => {
    const inputStream = require('stream').Readable.from(inputBuffer);
    const outputStream = require('stream').PassThrough();
    ffmpeg(inputStream)
      .audioCodec('pcm_s16le')
      .audioFrequency(8000)
      .format('s16le')
      .on('end', () => {
        const chunks = [];
        outputStream.on('data', chunk => chunks.push(chunk));
        outputStream.on('end', () => resolve(Buffer.concat(chunks)));
      })
      .on('error', err => reject(err))
      .pipe(outputStream);
  });
}

async function promptLLM(mediaStream, prompt) {
  llmStart = Date.now();

  // Append the new user message to the chat history
  mediaStream.chatHistory.push({ role: 'user', content: prompt });

  const completionStream = openai.beta.chat.completions.stream({
    model: 'gpt-4o',
    stream: true,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      ...mediaStream.chatHistory,
    ],
  });

  speaking = true;
  let responseText = '';
  try {
    for await (const chunk of completionStream) {
      const chunk_message = chunk.choices[0].delta.content;
      if (chunk_message) {
        responseText += chunk_message;
      }
    }

    if (responseText) {
      const audioStream = await elevenlabs.generate({
        voice: voiceId,
        text: responseText,
        model_id: "eleven_multilingual_v2",
        format: "pcm",
        sampleRate: 8000,
        stream: true
      });

      const audioBuffer = await streamToBuffer(audioStream);
      const convertedAudioBuffer = await convertAudioFormat(audioBuffer);

      // Send the audio buffer as media
      const payload = convertedAudioBuffer.toString('base64');
      const message = {
        event: 'media',
        streamSid: streamSid,
        media: { payload },
      };
      mediaStream.connection.sendUTF(JSON.stringify(message));
    }
  } catch (err) {
    logger.error("Error during LLM streaming", err);
  }
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
  
      deepgram.addListener(LiveTranscriptionEvents.Transcript, async (data) => {
        const transcript = data.channel.alternatives[0].transcript;
        if (transcript !== "") {
          // Log the transcription
          logger.info(`Transcription received: ${transcript}`);
  
          if (data.is_final) {
            is_finals.push(transcript);
            if (data.speech_final) {
              const utterance = is_finals.join(" ");
              is_finals = [];
              llmStart = Date.now();
              await promptLLM(mediaStream, utterance);
            }
          } else {
            if (speaking) {
              mediaStream.connection.sendUTF(JSON.stringify({
                event: 'clear',
                streamSid: streamSid,
              }));
              speaking = false;
            }
          }
        }
      });
  
      deepgram.addListener(LiveTranscriptionEvents.UtteranceEnd, async (data) => {
        if (is_finals.length > 0) {
          const utterance = is_finals.join(" ");
          is_finals = [];
          llmStart = Date.now();
          await promptLLM(mediaStream, utterance);
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