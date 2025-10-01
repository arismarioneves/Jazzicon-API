const http = require('http');
const url = require('url');
const path = require('path');

// Simulando o ambiente Vercel
global.process.env.NODE_ENV = 'development';

const PORT = 3000;

const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    try {
        if (pathname === '/' || pathname === '/api/index') {
            // Carrega a página home
            const { default: handler } = require('./api/index.ts');
            const mockReq = {
                query: parsedUrl.query,
                method: req.method,
                url: req.url
            };
            const mockRes = {
                status: (code) => {
                    res.statusCode = code;
                    return mockRes;
                },
                setHeader: (key, value) => {
                    res.setHeader(key, value);
                    return mockRes;
                },
                send: (data) => {
                    res.end(data);
                },
                json: (data) => {
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(data));
                }
            };
            await handler(mockReq, mockRes);
        } else if (pathname === '/api/jazzicon') {
            // Carrega a API do jazzicon
            const { default: handler } = require('./api/jazzicon.ts');
            const mockReq = {
                query: parsedUrl.query,
                method: req.method,
                url: req.url
            };
            const mockRes = {
                status: (code) => {
                    res.statusCode = code;
                    return mockRes;
                },
                setHeader: (key, value) => {
                    res.setHeader(key, value);
                    return mockRes;
                },
                send: (data) => {
                    res.end(data);
                },
                json: (data) => {
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(data));
                }
            };
            await handler(mockReq, mockRes);
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not Found');
        }
    } catch (error) {
        console.error('Error:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: error.message }));
    }
});

server.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    console.log(`📖 Documentação: http://localhost:${PORT}/`);
    console.log(`🎨 API Jazzicon: http://localhost:${PORT}/api/jazzicon?id=0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6`);
});