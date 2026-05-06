import axios from 'axios';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Support both GET and POST for flexibility
  const path = req.method === 'POST' ? req.body.path : req.query.path;
  const GOOGLE_API_KEY = process.env.VITE_GOOGLE_MAPS_API_KEY;

  if (!path || !Array.isArray(path)) {
    return res.status(400).json({ error: 'Path array is required' });
  }

  // Convert array of {lat, lng} to polyline string or pipe-separated string
  // For simplicity and sample limit, we'll pick a subset of points if the path is long
  const sampledPath = path.filter((_, i) => i % Math.max(1, Math.floor(path.length / 50)) === 0);
  const pathString = sampledPath.map(p => `${p.lat},${p.lng}`).join('|');

  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/elevation/json', {
      params: {
        locations: pathString,
        key: GOOGLE_API_KEY
      }
    });

    const results = response.data.results;
    let gain = 0;
    for (let i = 1; i < results.length; i++) {
      const diff = results[i].elevation - results[i-1].elevation;
      if (diff > 0) gain += diff;
    }

    // Convert meters to feet
    const gainFeet = gain * 3.28084;

    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(200).json({ gain: gainFeet });
  } catch (error) {
    console.error('Elevation API error:', error);
    return res.status(500).json({ error: 'Failed to fetch elevation data' });
  }
}
