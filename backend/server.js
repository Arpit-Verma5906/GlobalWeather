import express from "express";
import cors from "cors";
import dotenv from 'dotenv';

const app = express();
const port = 4988;
app.use(cors({ origin: 'https://globalweather-frontend.netlify.app' }));
dotenv.config();

const apiKey = process.env.WEATHER_API_KEY;
const baseURL = "https://api.openweathermap.org/data/2.5"

app.get("/forecast", async (req, res) => {
    const city = req.query.q;
    const url = `${baseURL}/forecast?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch weather data" });
    }
});

app.get("/weather", async (req, res) => {
    const city = req.query.q;
    const url = `${baseURL}/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.status == 200) {
            res.json(data);
        } else {
            res.status(response.status).json(data)
        }

    } catch (error) {
        res.status(500).json({ error: "Failed to fetch weather data" });
    }

});

app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
});
