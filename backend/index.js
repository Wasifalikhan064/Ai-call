// // const express = require('express');
// // const dotenv = require('dotenv');
// // const twilio = require('twilio');
// // const { Configuration, OpenAIApi } = require('openai');

// // // Load environment variables
// // dotenv.config();

// // // Initialize OpenAI
// // const configuration = new Configuration({
// //   apiKey: process.env.OPENAI_API_KEY,
// // });
// // const openai = new OpenAIApi(configuration);

// // // Initialize Express
// // const app = express();
// // app.use(express.urlencoded({ extended: true })); // Parse form data
// // app.use(express.json()); // Parse JSON data

// // // Twilio webhook route
// // app.post('/voice', async (req, res) => {
// //   const twiml = new twilio.twiml.VoiceResponse();

// //   // Start the conversation
// //   twiml.say('Hello! I am your AI assistant. How can I help you today?');
// //   twiml.gather({
// //     input: 'speech', // Collect speech input
// //     action: '/handle-response', // Send user input to this route
// //     method: 'POST',
// //   });

// //   res.type('text/xml');
// //   res.send(twiml.toString());
// // });

// // // Handle user response
// // app.post('/handle-response', async (req, res) => {
// //   const userSpeech = req.body.SpeechResult; // User's speech input
// //   const twiml = new twilio.twiml.VoiceResponse();

// //   // Send user input to OpenAI
// //   const gptResponse = await generateResponse(userSpeech);

// //   // Play OpenAI's response
// //   twiml.say(gptResponse);
// //   twiml.gather({
// //     input: 'speech',
// //     action: '/handle-response',
// //     method: 'POST',
// //   });

// //   res.type('text/xml');
// //   res.send(twiml.toString());
// // });

// // // Function to generate response using OpenAI
// // async function generateResponse(userInput) {
// //   try {
// //     const response = await openai.createChatCompletion({
// //       model: 'gpt-3.5-turbo',
// //       messages: [{ role: 'user', content: userInput }],
// //     });

// //     return response.data.choices[0].message.content;
// //   } catch (error) {
// //     console.error('Error generating response:', error);
// //     return 'Sorry, I encountered an error. Please try again.';
// //   }
// // }

// // // Start the server
// // const PORT = process.env.PORT || 3000;
// // app.listen(PORT, () => {
// //   console.log(`Server is running on port ${PORT}`);
// // });

// const express = require('express');
// const dotenv = require('dotenv');
// const twilio = require('twilio');
// const OpenAI = require('openai'); // Updated import

// // Load environment variables
// dotenv.config();

// // Initialize OpenAI
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY, // Use the correct environment variable
// });

// // Initialize Express
// const app = express();
// app.use(express.urlencoded({ extended: true })); // Parse form data
// app.use(express.json()); // Parse JSON data

// // Twilio webhook route
// app.post('/voice', async (req, res) => {
//   const twiml = new twilio.twiml.VoiceResponse();

//   // Start the conversation
//   twiml.say('Hello! I am your AI assistant. How can I help you today?');
//   twiml.gather({
//     input: 'speech', // Collect speech input
//     action: '/handle-response', // Send user input to this route
//     method: 'POST',
//   });

//   res.type('text/xml');
//   res.send(twiml.toString());
// });

// // Handle user response
// app.post('/handle-response', async (req, res) => {
//   const userSpeech = req.body.SpeechResult; // User's speech input
//   const twiml = new twilio.twiml.VoiceResponse();

//   // Send user input to OpenAI
//   const gptResponse = await generateResponse(userSpeech);

//   // Play OpenAI's response
//   twiml.say(gptResponse);
//   twiml.gather({
//     input: 'speech',
//     action: '/handle-response',
//     method: 'POST',
//   });

//   res.type('text/xml');
//   res.send(twiml.toString());
// });

// // Function to generate response using OpenAI
// async function generateResponse(userInput) {
//   try {
//     const response = await openai.chat.completions.create({
//       model: 'gpt-3.5-turbo',
//       messages: [{ role: 'user', content: userInput }],
//     });

//     return response.choices[0].message.content;
//   } catch (error) {
//     console.error('Error generating response:', error);
//     return 'Sorry, I encountered an error. Please try again.';
//   }
// }

// // Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// const express = require('express');
// const dotenv = require('dotenv');
// const twilio = require('twilio');
// const OpenAI = require('openai'); // Updated import

// // Load environment variables
// dotenv.config();

// // Initialize OpenAI
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY, // Use the correct environment variable
// });

// // Initialize Express
// const app = express();
// app.use(express.urlencoded({ extended: true })); // Parse form data
// app.use(express.json()); // Parse JSON data

// // Initialize Twilio client
// const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// // Route to initiate an outbound call
// app.post('/make-call', async (req, res) => {
//   const to = req.body.to; // Phone number to call
//   const from = process.env.TWILIO_PHONE_NUMBER; // Your Twilio phone number

//   try {
//     // Initiate the call
//     const call = await client.calls.create({
//         url: `${process.env.BASE_URL}/voice`, // Ngrok URL
//         to: '+919493499473',
//         from: '+13253357076',
//       });

//     res.json({ success: true, callSid: call.sid });
//   } catch (error) {
//     console.error('Error making call:', error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// });

// // TwiML route for the outbound call
// app.post('/voice', async (req, res) => {
//   const twiml = new twilio.twiml.VoiceResponse();

//   // Start the conversation
//   twiml.say('Hello! I am your AI assistant. How can I help you today?');
//   twiml.gather({
//     input: 'speech', // Collect speech input
//     action: '/handle-response', // Send user input to this route
//     method: 'POST',
//   });

//   res.type('text/xml');
//   res.send(twiml.toString());
// });

// // Handle user response
// app.post('/handle-response', async (req, res) => {
//   const userSpeech = req.body.SpeechResult; // User's speech input
//   const twiml = new twilio.twiml.VoiceResponse();

//   // Send user input to OpenAI
//   const gptResponse = await generateResponse(userSpeech);

//   // Play OpenAI's response
//   twiml.say(gptResponse);
//   twiml.gather({
//     input: 'speech',
//     action: '/handle-response',
//     method: 'POST',
//   });

//   res.type('text/xml');
//   res.send(twiml.toString());
// });

// // Function to generate response using OpenAI
// async function generateResponse(userInput) {
//   try {
//     const response = await openai.chat.completions.create({
//       model: 'gpt-3.5-turbo',
//       messages: [{ role: 'user', content: userInput }],
//     });

//     return response.choices[0].message.content;
//   } catch (error) {
//     console.error('Error generating response:', error);
//     return 'Sorry, I encountered an error. Please try again.';
//   }
// }

// // Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

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
app.post('/voice', async (req, res) => {
  const twiml = new twilio.twiml.VoiceResponse();

  // Start the conversation
  twiml.say('Hello! I am your AI assistant. How can I help you today?');
  twiml.gather({
    input: 'speech', // Collect speech input
    action: '/handle-response', // Send user input to this route
    method: 'POST',
  });

  res.type('text/xml');
  res.send(twiml.toString());
});

// Handle user response
app.post('/handle-response', async (req, res) => {
  const userSpeech = req.body.SpeechResult; // User's speech input
  const twiml = new twilio.twiml.VoiceResponse();

  // Send user input to OpenAI
  const gptResponse = await generateResponse(userSpeech);

  // Play OpenAI's response
  twiml.say(gptResponse);
  twiml.gather({
    input: 'speech',
    action: '/handle-response',
    method: 'POST',
  });

  res.type('text/xml');
  res.send(twiml.toString());
});

// Function to generate response using OpenAI
async function generateResponse(userInput) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: userInput }],
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error generating response:', error);
    return 'Sorry, I encountered an error. Please try again.';
  }
}

// Start the server
const PORT = process.env.PORT || 10000; // Render uses port 10000 by default
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});