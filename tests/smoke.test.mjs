import assert from 'node:assert/strict';
import test from 'node:test';

const baseUrl = process.env.BASE_URL || 'http://127.0.0.1:3000';
const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.antoniocarbone.com');

test('Italian home renders with the Italian language', async () => {
  const response = await fetch(new URL('/', baseUrl), {
    headers: { 'accept-language': 'it-IT,it;q=0.9' },
  });

  assert.equal(response.status, 200);
  assert.match(await response.text(), /<html[^>]+lang="it"/);
});

test('English browser preference redirects to the English page', async () => {
  const response = await fetch(new URL('/', baseUrl), {
    headers: { 'accept-language': 'en-US,en;q=0.9' },
    redirect: 'manual',
  });

  assert.equal(response.status, 307);
  assert.equal(new URL(response.headers.get('location'), baseUrl).pathname, '/en');
  assert.match(response.headers.get('set-cookie') || '', /portfolio_language=en/);
});

test('English home renders', async () => {
  const response = await fetch(new URL('/en', baseUrl));

  assert.equal(response.status, 200);
  assert.match(await response.text(), /<html[^>]+lang="en"/);
});

test('journey alias redirects to its section', async () => {
  const response = await fetch(new URL('/percorso', baseUrl), { redirect: 'manual' });

  assert.equal(response.status, 307);
  assert.match(response.headers.get('location') || '', /#percorso$/);
});

test('robots and sitemap are served from the configured site origin', async () => {
  const robotsResponse = await fetch(new URL('/robots.txt', baseUrl));
  assert.equal(robotsResponse.status, 200);
  assert.match(await robotsResponse.text(), /sitemap\.xml/);

  const sitemapResponse = await fetch(new URL('/sitemap.xml', baseUrl));
  assert.equal(sitemapResponse.status, 200);
  const sitemap = await sitemapResponse.text();
  assert.ok(sitemap.includes(`<loc>${new URL('/', siteUrl).toString()}</loc>`));
  assert.ok(sitemap.includes(`<loc>${new URL('/en', siteUrl).toString()}</loc>`));
});

test('chat fallback answers a valid question', async () => {
  const response = await fetch(new URL('/api/chat', baseUrl), {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ message: 'Chi è Antonio?' }),
  });

  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(typeof body.response, 'string');
  assert.ok(body.response.length > 0);
});

test('chat rejects malformed, empty, and oversized requests', async () => {
  const malformed = await fetch(new URL('/api/chat', baseUrl), {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: '{',
  });
  assert.equal(malformed.status, 400);

  const empty = await fetch(new URL('/api/chat', baseUrl), {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ message: '   ' }),
  });
  assert.equal(empty.status, 400);

  const oversized = await fetch(new URL('/api/chat', baseUrl), {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ message: 'a'.repeat(1201) }),
  });
  assert.equal(oversized.status, 413);

  const oversizedBody = await fetch(new URL('/api/chat', baseUrl), {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ message: 'ok', metadata: 'a'.repeat(16_400) }),
  });
  assert.equal(oversizedBody.status, 413);
});
