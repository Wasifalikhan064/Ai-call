const express = require('express');
const dotenv = require('dotenv');
const twilio = require('twilio');
const OpenAI = require('openai');
const cors = require('cors')
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const app = express();
app.use(
  cors({
    origin: 'http://localhost:5173', // Allow only this origin
    methods: ['GET', 'POST'], // Allow only specific HTTP methods
    credentials: true, // Allow cookies and credentials
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const questions = [
  "Can you explain the difference between props and state in React.js?",
  "What is middleware in Express.js, and how does it work?",
  "What is the difference between 'let', 'const', and 'var' in JavaScript?",
];

let conversationLog = [];

app.post('/make-call', async (req, res) => {
  const to = '+919493499473'; // Replace with process.env.TO_PHONE_NUMBER if needed
  const from = process.env.TWILIO_PHONE_NUMBER;

  try {
    const call = await client.calls.create({
      url: `${process.env.BASE_URL}/voice`,
      to: to,
      from: from,
    });

    res.json({ success: true, callSid: call.sid });
  } catch (error) {
    console.error('Error making call:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/voice', (req, res) => {
  const twiml = new twilio.twiml.VoiceResponse();

  twiml.say('Hello! I am your AI assistant. I will ask you three questions.');
  twiml.say('Here is the first question: ' + questions[0]);
  twiml.gather({
    input: 'speech',
    action: '/handle-response/0',
    method: 'POST',
  });

  res.type('text/xml');
  res.send(twiml.toString());
});

app.post('/handle-response/:questionIndex', async (req, res) => {
  const questionIndex = parseInt(req.params.questionIndex, 10);
  const userSpeech = req.body.SpeechResult;
  const twiml = new twilio.twiml.VoiceResponse();

  conversationLog.push({
    question: questions[questionIndex],
    response: userSpeech,
  });

  if (questionIndex >= questions.length - 1) {
    twiml.say('Thank you for answering all the questions. Goodbye!');
    twiml.hangup();
  } else {
    twiml.say('Here is the next question: ' + questions[questionIndex + 1]);
    twiml.gather({
      input: 'speech',
      action: `/handle-response/${questionIndex + 1}`,
      method: 'POST',
    });
  }

  res.type('text/xml');
  res.send(twiml.toString());
});

app.get('/conversation-log', (req, res) => {
  res.json(conversationLog);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});