const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config(); 

const app = express();
const PORT = process.env.PORT || 5001; 


app.use(cors()); 
app.use(express.json()); 


const pythonApiUrl = process.env.PYTHON_API_URL;
if (!pythonApiUrl) {
  console.error("FATAL ERROR: PYTHON_API_URL is not defined in the .env file.");
  process.exit(1); 
}


app.get('/', (req, res) => {
  res.json({ message: 'Node.js backend is running!' });
});


app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body; 

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    console.log(`Forwarding message to Python service: "${message}"`);

    
    const pythonResponse = await axios.post(`${pythonApiUrl}/chat`, {
      message: message,
    });

    
    res.json(pythonResponse.data);

  } catch (error) {
    console.error('Error communicating with the Python service:', error.message);
    
    res.status(500).json({ error: 'Failed to get response from the chatbot service.' });
  }
});


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  console.log(`Proxying requests to Python service at: ${pythonApiUrl}`);
});