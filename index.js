const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');

// Load environment variables from .env file
dotenv.config();

// Create an instance of Express
const app = express();
const PORT = process.env.PORT || 7000;

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse incoming JSON requests

// Root route to confirm the server is working
app.get('/', (req, res) => {
  res.send('Backend is running properly');
});

// Example GET route to fetch data from QuickBase
app.get('/api/medals', async (req, res) => {
  try {
    const response = await axios({
      method: 'post', // Correct method for QuickBase query API
      url: 'https://api.quickbase.com/v1/records/query',
      headers: {
        'QB-Realm-Hostname': process.env.QB_REALM,
        'Authorization': `QB-USER-TOKEN ${process.env.QB_USER_TOKEN}`,
        'Content-Type': 'application/json',
      },
      data: {
        "from": process.env.QB_TABLE_ID,
        "select": [7, 14, 9, 11] // Field IDs you want to fetch
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data from QuickBase:', error.response ? error.response.data : error.message);
    res.status(500).send('Server Error');
  }
});

// Example POST route to submit a new medal record to QuickBase
app.post('/api/medals', async (req, res) => {
    const { country, sport, medal, year } = req.body;

    try {
        const response = await axios({
            method: 'post', // Use 'post' for upserting records
            url: 'https://api.quickbase.com/v1/records',
            headers: {
                'QB-Realm-Hostname': process.env.QB_REALM,
                'Authorization': `QB-USER-TOKEN ${process.env.QB_USER_TOKEN}`,
                'Content-Type': 'application/json',
            },
            data: {
                "to": process.env.QB_TABLE_ID, // QuickBase Medals Received table ID
                "data": [
                    {
                        "7": { "value": country }, // Field ID for Country
                        "9": { "value": medal },   // Field ID for Medal
                        "11": { "value": year },    // Field ID for Year
                        "14": { "value": sport }    // Field ID for Sport
                    }
                ],
                "fieldsToReturn": [
                    7,
                    9,
                    11,
                    14
                ]
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error posting data to QuickBase:', error.response ? error.response.data : error.message);
        res.status(500).send('Server Error');
    }
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
