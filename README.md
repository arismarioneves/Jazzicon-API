# Jazzicon API

Generate unique SVG identicons (Jazzicon-style) from any string ID.

## Endpoint

```
GET /api/jazzicon?id={id}
```

## Parameters

| Parameter | Type   | Required | Description                                      |
|-----------|--------|----------|--------------------------------------------------|
| `id`      | string | Yes      | Any string: username, user ID, email, etc.       |

## Example

```bash
curl "https://jazzicon-api.vercel.app/api/jazzicon?id=johndoe"
```

## Response

| Field          | Value                  |
|----------------|------------------------|
| Content-Type   | `image/svg+xml`        |
| Size           | 100×100px              |
| Cache-Control  | `s-maxage=86400`       |

Returns an SVG identicon generated deterministically from the given ID.

## Errors

| Status | Description                    |
|--------|--------------------------------|
| `400`  | Missing `id` parameter         |
| `500`  | Internal server error          |

## Usage Example

Use as an `<img>` tag src directly in HTML:

```html
<img src="https://jazzicon-api.vercel.app/api/jazzicon?id=johndoe" width="100" height="100" />
```

Or fetch programmatically:

```js
const res = await fetch('https://jazzicon-api.vercel.app/api/jazzicon?id=johndoe');
const svg = await res.text();
```

## Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/arismarioneves/Jazzicon-API)
