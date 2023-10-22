import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const openWeatherApiKey = process.env.OPEN_WEATHER_API_KEY;
const ipGeolocationApiKey = process.env.IP_GEOLOCATION_API_KEY;

app.use(express.json());
app.use(
    cors({
      origin: "http://localhost:3000", 
      allowedHeaders: 'Content-Type, Authorization',
    })
  );

app.get('/api-keys', (req, res) => {
  res.json(ipGeolocationApiKey)
});

app.post('/city-name-weather', async (req, res) => {
    const formData = req.body;
    const userCityName = formData.cityName;
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${userCityName}&appid=${openWeatherApiKey}&units=metric`);
    res.json(response.data);
});

app.post('/city-weather', async (req, res) => {
    //Data coming from the client 
    const requestData = req.body; 
    const cityName = requestData.city;
    // const latitude = requestData.latitude;
    // const longitude = requestData.longitude;
    try {
      //Data coming from open weather api
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${openWeatherApiKey}&units=metric`);
      res.json(response.data);
    } catch (error) {
      console.log(error.message);
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});