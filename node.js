const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const app = express();

app.use(bodyParser.json());

app.post('/process-payment', async (req, res) => {
    const { provider, phone, currency, amount } = req.body;

    const apiKey = 'pub-bfc7d5f300cfb53ad05b2b521ce42f2f'; // Your uFitPay API key
    const apiToken = 'sec-958c1b1a7fbd80e0f7bb77688415c952'; // Your uFitPay API token
    const url = 'https://api.ufitpay.com/v1/transactions'; // Endpoint for processing transactions

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiToken}`
            },
            body: JSON.stringify({
                apiKey,
                provider,
                phoneNumber: phone, // Adjust field name based on uFitPay documentation
                currency,
                amount
            })
        });

        const data = await response.json();

        if (response.ok) {
            res.json({ success: true, transactionId: data.transactionId });
        } else {
            res.json({ success: false, error: data.error });
        }
    } catch (error) {
        res.json({ success: false, error: error.message });
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
