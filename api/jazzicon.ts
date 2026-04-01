import { VercelRequest, VercelResponse } from '@vercel/node';
import jazzicon from './data/jazzicon';

function hashId(id: string): number {
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
        hash = Math.imul(31, hash) + id.charCodeAt(i) | 0;
    }
    return Math.abs(hash);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    try {
        const id = req.query.id as string;

        if (!id) {
            res.status(400).json({ error: "Missing required parameter 'id'" });
            return;
        }

        import('@vercel/analytics/server')
            .then(({ track }) => track('jazzicon-generated', { id: id.slice(0, 10) }))
            .catch(() => {});

        const seed = hashId(id);

        const identicon = jazzicon(100, seed);

        res.status(200);
        res.setHeader('Content-Type', 'image/svg+xml');
        res.setHeader('Cache-Control', 'max-age=0, s-maxage=86400');
        res.send(identicon);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: error instanceof Error ? error.message : 'Internal server error',
        });
    }
}
