const fs = require("fs");
const http = require("http");
const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const WebSocketServer = require("websocket").server;
const { createClient, LiveTranscriptionEvents } = require("@deepgram/sdk");
const { OpenAI } = require('openai');
const WebSocket = require('ws');

// Load environment variables from .env file
dotenv.config();

const HTTP_SERVER_PORT = 5000; // Set the port for the HTTP server

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const app = express();
app.use(cors({ origin: '*' })); // Enable CORS for all requests
app.use(bodyParser.json()); // Parse JSON request bodies

// Create an HTTP server
const server = http.createServer(app);

// Set up the WebSocket server
const mediaws = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: true,
});

// Deepgram client setup
const deepgramClient = createClient(process.env.DEEPGRAM_API_KEY);

let SYSTEM_PROMPT = "You are an assistant. Respond concisely and clearly.";
fs.readFile('./prompt.txt', 'utf-8', (err, data) => {
    if (err) {
        console.error('Error reading prompt file', { error: err });
    } else {
        SYSTEM_PROMPT = data;
        console.info('System prompt loaded');
    }
});

// Handle incoming WebSocket connection from FreeSWITCH
mediaws.on("connect", function (connection) {
    console.info("FreeSWITCH: Client connected");
    connection.on("error", (error) => {
        console.error("Connection Error:", error);
    });
    new MediaStream(connection); // Create a new MediaStream instance
});

class MediaStream {
    constructor(connection) {
        this.connection = connection;
        this.deepgram = setupDeepgram(this);
        this.chatHistory = [];

        // Listen for incoming messages
        connection.on("message", this.processMessage.bind(this));
        connection.on("close", this.close.bind(this));
        connection.on("error", (error) => {
            console.error("Connection Error:", error);
        });

        // Start the conversation with a delay
        this.initiateConversationWithDelay();
    }

    initiateConversationWithDelay() {
        setTimeout(() => {
            this.initiateConversation();
        }, 1000);
    }

    async initiateConversation() {
        await promptLLM(this, "");
    }

    async processMessage(message) {
        const audioFilePath = message.utf8Data; // File URL from FreeSWITCH3

        console.log("processMessage called.");

        if (this.deepgram == null) {
            this.deepgram = setupDeepgram(this);
        }

        // Read the audio file content in chunks
        const stream = fs.createReadStream(audioFilePath, { highWaterMark: 3200 }); // 4 KB chunks

        stream.on('data', (chunk) => {
            this.deepgram.send(chunk);
        });

        stream.on('end', () => {
            console.info("Audio streaming finished");
        });

        stream.on('error', (err) => {
            console.error("Error reading audio file:", err);
        });

        console.info("Audio file URL received: ", audioFilePath);
    }

    close() {
        console.info("FreeSWITCH: Connection closed");
        if (this.deepgram) {
            this.deepgram = null;
        }
    }
}

async function promptLLM(mediaStream, prompt) {
    mediaStream.chatHistory.push({ role: 'user', content: prompt });

    const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...mediaStream.chatHistory,
        ]
    });

    const completeResponse = response.choices[0].message.content;
    console.info(`\nAgent: ${completeResponse}`);

    // Split the response into sentences for faster processing
    const sentences = completeResponse.match(/[^.!?]+[.!?]*\s*/g) || [];

    for (const sentence of sentences) {
        // Append the assistant's response to the chat history
        mediaStream.chatHistory.push({ role: 'assistant', content: sentence });

        if (mediaStream.chatHistory.length > 10) {
            mediaStream.chatHistory.shift(); // Keep only the last 10 interactions
        }

        // Send the response for TTS processing
        await synthesizeAudio(mediaStream, sentence);
    }
}

async function synthesizeAudio(mediaStream, text) {
    // STEP 1: Make a request and configure the request with options
    const response = await deepgramClient.speak.request(
        { text },
        {
            model: "aura-stella-en",
            encoding: "linear16",
            container: "wav",
        }
    );

    // STEP 2: Get the audio stream and headers from the response
    const stream = await response.getStream();
    const headers = await response.getHeaders();
    if (stream) {
        // STEP 3: Convert the stream to an audio buffer
        const buffer = await getAudioBuffer(stream);
        // STEP 4: Write the audio buffer to a file
        const filePath = `/tmp/epic/output_${Date.now()}.wav`;
        fs.writeFile(filePath, buffer, (err) => {
            if (err) {
                console.error("Error writing audio to file:", err);
            } else {
                console.log(`Audio file written to ${filePath}`);
                mediaStream.connection.send(filePath); // Send the audio file path back to FreeSWITCH
                console.log(`Audio file send to ${filePath}`);
            }
        });
    } else {
        console.error("Error generating audio:", stream);
    }
}

// Helper function to convert the stream to an audio buffer
const getAudioBuffer = async (response) => {
    const reader = response.getReader();
    const chunks = [];

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        chunks.push(value);
    }

    const dataArray = chunks.reduce(
        (acc, chunk) => Uint8Array.from([...acc, ...chunk]),
        new Uint8Array(0)
    );

    return Buffer.from(dataArray.buffer);
};

const setupDeepgram = (mediaStream) => {
    const connection = deepgramClient.listen.live({
        model: "nova-2",
        language: "en-US",
        smart_format: true,
    });

    connection.on(LiveTranscriptionEvents.Open, () => {
        console.info("Deepgram STT: Connected");

        connection.on(LiveTranscriptionEvents.Transcript, (data) => {
            console.info("Received transcript:", data); // Add logging here
            const transcript = data.channel.alternatives[0].transcript;
            if (transcript) {
                console.info(`\nUser: ${transcript}`);
                promptLLM(mediaStream, transcript); // Process the user's utterance
            }
        });

        connection.on(LiveTranscriptionEvents.Metadata, (data) => {
            console.log(data);  // You can log metadata if necessary
        });

        connection.on(LiveTranscriptionEvents.Error, (err) => {
            console.error("Deepgram STT: Error received", err);
        });
    });

    return connection;
}

// Serve static files (e.g., audio files) from the current directory
app.use(express.static(__dirname));

// Create /tmp/epic directory if it doesn't exist
const outputDir = '/tmp/epic';
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Start the server
server.listen(HTTP_SERVER_PORT, () => {
    console.info(`Server listening on port ${HTTP_SERVER_PORT}`);
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(500).json({ error: err.message });
});