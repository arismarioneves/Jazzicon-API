import { VercelRequest, VercelResponse } from '@vercel/node';
import { track } from '@vercel/analytics/server';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Track analytics event for home page visit
    await track('home_page_visited');

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

    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send(text.trim());
}