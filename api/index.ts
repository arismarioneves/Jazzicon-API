import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const text = `
JAZZICON API

ENDPOINT:
  GET /api/jazzicon?id={PERSONAL_ID}

PARAMETERS:
  id (required) - Personal ID (0-9)

EXAMPLE:
  curl "/api/jazzicon?id=1234567890"

RESPONSE:
  Content-Type: image/svg+xml
  SVG identicon (100x100px)

ERRORS:
  400 - Missing 'id' parameter
  500 - Server error
    `;

    // Set headers for proper content type and caching
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    
    res.status(200).send(text.trim());
}