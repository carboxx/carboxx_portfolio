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

The app supports Next.js 16 and Node.js 20.9 or newer. Set `NEXT_PUBLIC_SITE_URL=https://antoniocarbone.com` before building; it is used for canonical metadata, `robots.txt`, and `sitemap.xml`. Configure that domain as Netlify's primary domain and redirect `www` to it. Netlify preview hosts carry `noindex`; production pages become indexable on the canonical host.

For Google Search Console, verify the `antoniocarbone.com` domain with the DNS record Google supplies, then submit `https://antoniocarbone.com/sitemap.xml` after the domain points to the new site. URL-prefix verification is also supported with the optional `GOOGLE_SITE_VERIFICATION` environment variable. Request indexing for `/` and `/en`; indexing and ranking are controlled by Google.

`GROQ_API_KEY` is optional. Without it, the chat API uses the local knowledge base. With it, requests are sent to Groq and limited to 1,200 characters with a 15-second timeout. Configure rate limiting in the hosting provider before enabling the key.
