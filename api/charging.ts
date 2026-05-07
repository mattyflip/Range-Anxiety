import axios from 'axios';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const API_KEY = process.env.OPENCHARGEMAP_API_KEY;
  
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Handle both POST body and GET query
  const data = req.method === 'POST' ? req.body : req.query;
  const { lat, lng, lon, distance = 25, path, category } = data;

  // Use lng or lon
  const targetLat = lat;
  const targetLon = lng || lon;

  try {
    let allPois: any[] = [];

    // If path is provided, we search at the start, end, and middle points
    if (path && Array.isArray(path) && path.length > 0) {
      const pointsToSearch = [
        path[0],
        path[Math.floor(path.length / 2)],
        path[path.length - 1]
      ];

      for (const pt of pointsToSearch) {
        const resp = await axios.get('https://api.openchargemap.io/v3/poi/', {
          params: {
            output: 'json',
            latitude: pt.lat,
            longitude: pt.lng,
            distance: 15,
            distanceunit: 'Miles',
            maxresults: 20,
            key: API_KEY
          }
        });
        allPois = [...allPois, ...resp.data];
      }
    } else if (targetLat && targetLon) {
      const resp = await axios.get('https://api.openchargemap.io/v3/poi/', {
        params: {
          output: 'json',
          latitude: targetLat,
          longitude: targetLon,
          distance: distance,
          distanceunit: 'Miles',
          maxresults: 50,
          key: API_KEY
        }
      });
      allPois = resp.data;
    }

    // Deduplicate by ID
    const uniquePois = Array.from(new Map(allPois.map(item => [item.ID, item])).values());

    // Map to our internal POI format
    const formattedPois = uniquePois.map((poi: any) => ({
      id: `ocm-${poi.ID}`,
      name: poi.AddressInfo.Title,
      address: poi.AddressInfo.AddressLine1 || poi.AddressInfo.AddressLine2 || 'Near ' + poi.AddressInfo.Town,
      position: { lat: poi.AddressInfo.Latitude, lng: poi.AddressInfo.Longitude },
      type: 'charging station',
      details: poi.Equipment?.map((e: any) => e.ConnectionType?.Title).filter(Boolean).join(', ') || 'Standard Outlet'
    }));

    return res.status(200).json({ pois: formattedPois });
  } catch (error: any) {
    console.error('Open Charge Map API error:', error.message);
    return res.status(500).json({ error: 'Failed to fetch charging data', details: error.message });
  }
}
