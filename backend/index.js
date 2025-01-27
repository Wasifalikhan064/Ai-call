const express = require('express');
const dotenv = require('dotenv');
const twilio = require('twilio');
const OpenAI = require('openai');

// Load environment variables
dotenv.config();

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Initialize Express
const app = express();
app.use(express.urlencoded({ extended: true })); // Parse form data
app.use(express.json()); // Parse JSON data

// Initialize Twilio client
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Questions to ask
const questions = [
  "Can you explain the difference between props and state in React.js?",
  "What is middleware in Express.js, and how does it work?",
  "What is the difference between 'let', 'const', and 'var' in JavaScript?",
];

// Route to initiate an outbound call
app.post('/make-call', async (req, res) => {
  const to = '+919493499473'; // Replace with process.env.TO_PHONE_NUMBER if needed
  const from = process.env.TWILIO_PHONE_NUMBER; // Use environment variable

  try {
    // Initiate the call
    const call = await client.calls.create({
      url: `${process.env.BASE_URL}/voice`, // Use Render URL
      to: to,
      from: from,
    });

    res.json({ success: true, callSid: call.sid });
  } catch (error) {
    console.error('Error making call:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// TwiML route for the outbound call
app.post('/voice', (req, res) => {
  const twiml = new twilio.twiml.VoiceResponse();

  // Ask the first question
  twiml.say('Hello! I am your AI assistant. I will ask you three questions.');
  twiml.say('Here is the first question: ' + questions[0]);
  twiml.gather({
    input: 'speech', // Collect speech input
    action: '/handle-response/0', // Send user input to this route
    method: 'POST',
  });

  res.type('text/xml');
  res.send(twiml.toString());
});

// Handle user response
app.post('/handle-response/:questionIndex', async (req, res) => {
  const questionIndex = parseInt(req.params.questionIndex, 10); // Current question index
  const userSpeech = req.body.SpeechResult; // User's speech input
  const twiml = new twilio.twiml.VoiceResponse();

  console.log(`Question ${questionIndex + 1}:`, questions[questionIndex]);
  console.log('User Response:', userSpeech);

  // If all questions are answered, end the call
  if (questionIndex >= questions.length - 1) {
    twiml.say('Thank you for answering all the questions. Goodbye!');
    twiml.hangup();
  } else {
    // Ask the next question
    twiml.say('Here is the next question: ' + questions[questionIndex + 1]);
    twiml.gather({
      input: 'speech',
      action: `/handle-response/${questionIndex + 1}`, // Move to the next question
      method: 'POST',
    });
  }

  res.type('text/xml');
  res.send(twiml.toString());
});

// Start the server
const PORT = process.env.PORT || 10000; // Render uses port 10000 by default
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});