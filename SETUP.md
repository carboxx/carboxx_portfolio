# Development and deployment

## Requirements

- Node.js 20.9 or newer
- npm

## Local development

```bash
npm ci
npm run dev
```

## Verification

```bash
npm run check
npm run build
npm run start
npm run test:smoke
```

Run the smoke tests while the production server is available at `http://127.0.0.1:3000`. Set `BASE_URL` to test another local address.

## Deployment configuration

The app supports Next.js 16 and Node.js 20.9 or newer. Set `NEXT_PUBLIC_SITE_URL` to the final canonical HTTPS URL before building; it is used for canonical metadata, `robots.txt`, and `sitemap.xml`. The fallback is `https://www.antoniocarbone.com` until the replacement domain is confirmed.

`GROQ_API_KEY` is optional. Without it, the chat API uses the local knowledge base. With it, requests are sent to Groq and limited to 1,200 characters with a 15-second timeout. Configure rate limiting in the hosting provider before enabling the key.
