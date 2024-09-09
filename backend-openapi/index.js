require('dotenv').config()
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());  
app.use(express.json());

app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;
    console.log("Received message from client:", userMessage);
    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: userMessage }],
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.API_KEY}`,
                'Content-Type': 'application/json',
            }
        });

        res.json(response.data);
    } catch (error) {
        res.status(500).send(error.response.data);
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    console.log(process.env.API_KEY, "process.env.API_KEY}")
});
