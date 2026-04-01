import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Jazzicon API - Documentation</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem;
            line-height: 1.6;
            color: #333;
        }
        h1 {
            color: #000;
            border-bottom: 2px solid #000;
            padding-bottom: 0.5rem;
        }
        h2 {
            color: #333;
            margin-top: 2rem;
        }
        code {
            background-color: #f4f4f4;
            padding: 0.2rem 0.4rem;
            border-radius: 3px;
            font-family: 'Courier New', monospace;
        }
        pre {
            background-color: #f4f4f4;
            padding: 1rem;
            border-radius: 5px;
            overflow-x: auto;
        }
        .example {
            margin-top: 1rem;
            padding: 1rem;
            border-left: 3px solid #000;
            background-color: #f9f9f9;
        }
        .example img {
            vertical-align: middle;
            margin-left: 0.5rem;
        }
    </style>
    <script>
        window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
    </script>
    <script defer src="/_vercel/insights/script.js"></script>
</head>
<body>
    <h1>🎨 JAZZICON API</h1>
    
    <h2>Endpoint</h2>
    <pre><code>GET /api/jazzicon?id={ID}</code></pre>
    
    <h2>Parameters</h2>
    <p><code>id</code> (required) - Any string (username, user ID, email, address, etc.)</p>
    
    <h2>Example</h2>
    <div class="example">
        <p><strong>Request:</strong></p>
        <pre><code>curl "/api/jazzicon?id=johndoe"</code></pre>
        
        <p><strong>Try it:</strong></p>
        <a href="/api/jazzicon?id=johndoe" target="_blank">/api/jazzicon?id=johndoe</a>
        <img src="/api/jazzicon?id=johndoe" alt="Jazzicon example" width="100" height="100">
    </div>
    
    <h2>Response</h2>
    <ul>
        <li><strong>Content-Type:</strong> image/svg+xml</li>
        <li><strong>Size:</strong> 100x100px</li>
        <li><strong>Format:</strong> SVG identicon</li>
    </ul>
    
    <h2>Error Codes</h2>
    <ul>
        <li><strong>400</strong> - Missing 'id' parameter</li>
        <li><strong>500</strong> - Server error</li>
    </ul>
    
    <h2>More Examples</h2>
    <div class="example">
        <p>Different IDs generate different jazziicons:</p>
        <p>
            <img src="/api/jazzicon?id=alice" alt="Alice" width="50" height="50">
            <img src="/api/jazzicon?id=bob" alt="Bob" width="50" height="50">
            <img src="/api/jazzicon?id=charlie" alt="Charlie" width="50" height="50">
            <img src="/api/jazzicon?id=diana" alt="Diana" width="50" height="50">
            <img src="/api/jazzicon?id=0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6" alt="Ethereum Address" width="50" height="50">
        </p>
    </div>
</body>
</html>`;

    // Set headers for proper content type and caching
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 'public, max-age=3600');

    res.status(200).send(html);
}