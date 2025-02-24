require('dotenv').config();
const express = require("express");
const axios = require("axios");
const twilio = require("twilio");
const cron = require("node-cron");

const app = express();
const port = process.env.PORT || 3000;

// Twilio setup 
const client = new twilio(process.env.TWILO_ACCOUNT_SID, process.env.TWILO_AUTH_TOKEN);

// Send whatsapp message
async function sendWhatsappMessage(body) {
    try {
        await client.messages.create({
            body: body,
            from: `whatsapp:${process.env.TWILO_PH_NO}`,
            to: `whatsapp:${process.env.PH_NO}`
        });
        console.log('message sent successsfully');
    } catch (error) {
        console.log('error', error);
    }
}

// Get motivational quote from ZenQuote
const getMotivationalQuote = async () => {
    try {
        const { data } = await axios.get('https://zenquotes.io/api/random');
        const [quote] = data;

        return [
            null,
            {
                text: quote.q,
                author: quote.a
            },
        ];
    } catch (error) {
        return [error, null]
    }
};

// API route to fetch quote
app.get('/quote', async (req, res) => {
    const [error, quote] = await getMotivationalQuote();

    if (error) {
        return res.status(500).send("error fetching quote")
    }

    const message = `${quote.text} - ${quote.author}`;
    await sendWhatsappMessage(message);

    res.json({ quote });
})

// Schedule a daily task to send a quote at 8am
cron.schedule("0 8 * * * ", async () => {
    const [error, quote] = await getMotivationalQuote();
    if (error) {
        console.error('error fetching quote ', error);
        return;
    }

    const message = `${quote.text} - ${quote.author}`;
    await sendWhatsAppMessage(message);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

