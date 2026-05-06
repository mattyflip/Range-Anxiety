import axios from 'axios';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { lat, lng, lon } = req.query;
  const targetLon = lon || lng;
  const API_KEY = process.env.OPENWEATHER_API_KEY;

  if (!lat || !targetLon) {
    return res.status(400).json({ error: 'Latitude and Longitude are required' });
  }

  // Default to a known key for testing if user hasn't set one, but warn
  // Best practice: return error if key is missing
  if (!API_KEY) {
    return res.status(500).json({ error: 'OpenWeather API Key missing in Vercel environment' });
  }

  try {
    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {  
      params: {
        lat,
        lon: targetLon,
        appid: API_KEY,
        units: 'imperial'
      }
    });

    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(200).json({
      wind_speed: response.data.wind.speed,
      wind_deg: response.data.wind.deg,
      temp: response.data.main.temp
    });
  } catch (error) {
    console.error('Weather API error:', error);
    return res.status(500).json({ error: 'Failed to fetch weather data' });
  }
}
