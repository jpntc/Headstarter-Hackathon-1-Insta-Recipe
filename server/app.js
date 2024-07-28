// let OpenAI = require('openai')
// let express = require('express');
// let dotenv = require('dotenv');

// const openai = new OpenAI(
//     {
//         apiKey: process.env.OPENAI_API_KEY,
//     }
// );

// async function main() {
//   const completion = await openai.chat.completions.create({
//     messages: [{ role: "system", content: "You are a helpful assistant." }],
//     model: "gpt-3.5-turbo",
//   });

//   console.log(completion.choices[0]);
// }

// main();
let OpenAI = require('openai');
let express = require('express');
let dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Initialize OpenAI with the API key from environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Create an Express app
let app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Define a route to handle the GPT-3.5-turbo request
app.post('/api/gpt', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: userMessage },
      ],
      model: "gpt-3.5-turbo",
    });

    // Send the completion response back to the client
    res.json({ response: completion.choices[0].message.content });
  } catch (error) {
    console.error('Error communicating with OpenAI API:', error);
    res.status(500).send('Error communicating with OpenAI API');
  }
});

// Start the Express server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});