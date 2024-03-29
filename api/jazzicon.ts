import { VercelRequest, VercelResponse } from '@vercel/node';
import { inject } from '@vercel/analytics';
import jazzicon from './data/jazzicon';

inject();

export default async function handler(req: VercelRequest, res: VercelResponse) {
    try {
        const id = req.query.id as string;

        if (typeof id === 'undefined') {
            throw new Error("Param 'ID' is required");
        }

        const seed = parseInt(id.slice(2, 10), 16);

        const identicon = jazzicon(100, seed);

        res.status(200);
        res.setHeader('Content-Type', 'image/svg+xml');
        res.setHeader('Cache-Control', 'max-age=0, s-maxage=86400');
        res.send(identicon);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: error.message,
        });
    }
}
