import axios from 'axios';

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const response = await axios.get(url, {
      responseType: 'arraybuffer', // This allows us to handle binary data
    });

    // Set headers to match the content type of the file
    res.setHeader('Content-Type', response.headers['content-type']);
    res.setHeader('Content-Disposition', 'inline');

    // Send the file data as the response
    res.send(response.data);
  } catch (error) {
    console.error('Failed to fetch the audio file:', error);
    res.status(500).json({ error: 'Failed to fetch the audio file.' });
  }
}