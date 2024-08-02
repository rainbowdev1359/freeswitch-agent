const fs = require("fs");
const http = require("http");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const express = require("express");
const { createClient, LiveTranscriptionEvents } = require("@deepgram/sdk");
const OpenAI = require('openai');
const twilio = require('twilio');
const WebSocketServer = require("websocket").server;
const logger = require('./logger'); // Assuming you have a logger module

dotenv.config();

const app = express();
const HTTP_SERVER_PORT = 5000; 
let streamSid = ''; 

const deepgramClient = createClient(process.env.DEEPGRAM_API_KEY);
const deepgramTTSWebsocketURL = 'wss://api.beta.deepgram.com/v1/speak?encoding=mulaw&sample_rate=8000&container=none';
let keepAlive;

// Middleware
app.use(cors());
app.use(express.json()); // For parsing application/json

const server = http.createServer(app);
const wsserver = new WebSocketServer({
  httpServer: server,
  autoAcceptConnections: true,
});

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

// Define routes
app.get("/", (req, res) => {
  res.status(200).send('Hello, World!');
});

// Handle incoming call from Twilio
app.post("/incoming", (req, res) => {
  const response = new twilio.twiml.VoiceResponse();
  response.connect().stream({
    url: 'wss://your-server.com/streams', // Update to your server's WebSocket URL
    parameters: {
      aCustomParameter: "aCustomValue that was set in TwiML"
    }
  });

  res.set('Content-Type', 'text/xml');
  res.status(200).send(response.toString());
});

// Serve TwiML
app.post("/twiml", (req, res) => {
  const filePath = path.join(__dirname, "templates", "streams.xml");
  fs.access(filePath, fs.constants.R_OK, (err) => {
    if (err) {
      logger.error("Error accessing streams.xml");
      res.status(502).send("Bad Gateway");
      return;
    }
    fs.stat(filePath, (err, stat) => {
      if (err) {
        logger.error("Error getting file stats");
        res.status(502).send("Bad Gateway");
        return;
      }

      res.set({
        "Content-Type": "text/xml",
        "Content-Length": stat.size,
      });
      const readStream = fs.createReadStream(filePath);
      readStream.pipe(res);
    });
  });
});

// Make a call
app.post("/makeCall", (req, res) => {
  const { toNumber, twimlUrl } = req.body;

  if (!toNumber || !twimlUrl) {
    return res.status(400).json({ message: 'Missing required parameters: toNumber or twimlUrl' });
  }

  makeCall(toNumber, process.env.TWILIO_PHONE_NUMBER, twimlUrl)
    .then(() => {
      res.status(200).json({ message: 'Call initiated successfully' });
    })
    .catch(err => {
      logger.error('Failed to initiate call', { error: err });
      res.status(500).json({ message: 'Failed to initiate call', error: err.message });
    });
});

// WebSocket handling
wsserver.on("connect", function (connection) {
  new MediaStream(connection);
});

class MediaStream {
  constructor(connection) {
    this.connection = connection;
    this.deepgram = setupDeepgram(this);
    this.chatHistory = []; // Each MediaStream instance has its own chat history
    connection.on("message", this.processMessage.bind(this));
    connection.on("close", this.close.bind(this));
  }

  processMessage(message) {
    if (message.type === "utf8") {
      let data = JSON.parse(message.utf8Data);
      switch (data.event) {
        case "close":
          this.close();
          break;
        // Handle other events as needed
      }
    }
  }

  close() {
    logger.info("Connection closed");
  }
}

// Function to initiate Twilio call
const makeCall = async (to, from, twimlUrl) => {
  const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  try {
    await client.calls.create({
      twiml: `<Response><Connect><Stream url="${twimlUrl}"><Parameter name="aCustomParameter" value="aCustomValue" /></Stream></Connect></Response>`,
      to,
      from,
    });
    logger.info('Call initiated successfully to', to);
  } catch (error) {
    logger.error('Failed to initiate call', { error });
    throw error;
  }
};

const setupDeepgram = (mediaStream) => {
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

  deepgram.addListener(LiveTranscriptionEvents.Open, () => {
    logger.info("Deepgram STT: Connected");
  });

  deepgram.addListener(LiveTranscriptionEvents.Transcript, (data) => {
    // Handle transcription data
  });

  return deepgram;
};

// Start server
server.listen(HTTP_SERVER_PORT, () => {
  logger.info(`Server listening on port ${HTTP_SERVER_PORT}`);
});