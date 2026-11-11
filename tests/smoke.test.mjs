import assert from 'node:assert/strict';
import test from 'node:test';

const baseUrl = process.env.BASE_URL || 'http://127.0.0.1:3000';
const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://antoniocarbone.com');

test('Italian home renders with the Italian language', async () => {
  const response = await fetch(new URL('/', baseUrl), {
    headers: { 'accept-language': 'it-IT,it;q=0.9' },
  });

  assert.equal(response.status, 200);
  assert.match(await response.text(), /<html[^>]+lang="it"/);
});

test('Italian URL stays Italian despite browser language and an old English cookie', async () => {
  const response = await fetch(new URL('/', baseUrl), {
    headers: { 'accept-language': 'en-US,en;q=0.9', cookie: 'portfolio_language=en' },
    redirect: 'manual',
  });

  assert.equal(response.status, 200);
  assert.match(await response.text(), /<html[^>]+lang="it"/);
});

test('English home renders', async () => {
  const response = await fetch(new URL('/en', baseUrl), {
    headers: { cookie: 'portfolio_language=it' },
  });

  assert.equal(response.status, 200);
  assert.match(await response.text(), /<html[^>]+lang="en"/);
});

test('preview pages are excluded from indexing and expose canonical metadata', async () => {
  const response = await fetch(new URL('/', baseUrl));
  assert.match(response.headers.get('x-robots-tag') || '', /noindex/);
  const html = await response.text();
  const canonical = html.match(/rel="canonical" href="([^"]+)"/)?.[1];
  assert.equal(new URL(canonical).toString(), siteUrl.toString());
  assert.match(html, /name="robots" content="noindex, follow"/);
  assert.match(html, /property="og:image"/);
  assert.match(html, /Antonio Carbone \| Ingegnere informatico e AI Engineer/);
  assert.ok(html.includes(`"@id":"${new URL('/#antonio-carbone', siteUrl)}"`));
});

test('canonical domain is indexable while the Netlify host is excluded', async () => {
  for (const host of [siteUrl.hostname, `www.${siteUrl.hostname.replace(/^www\./, '')}`]) {
    const response = await fetch(new URL('/', baseUrl), {
      headers: { host, 'x-forwarded-host': host, 'user-agent': 'Googlebot' },
    });
    assert.equal(response.status, 200);
    assert.equal(response.headers.get('x-robots-tag'), null);
    assert.match(await response.text(), /name="robots" content="index, follow"/);
  }
  const preview = await fetch(new URL('/', baseUrl), {
    headers: { host: 'carboxx-portfolio.netlify.app', 'x-forwarded-host': 'carboxx-portfolio.netlify.app' },
  });
  assert.match(preview.headers.get('x-robots-tag') || '', /noindex/);
});

test('journey alias redirects to its section', async () => {
  const response = await fetch(new URL('/percorso', baseUrl), { redirect: 'manual' });

  assert.equal(response.status, 307);
  assert.match(response.headers.get('location') || '', /#percorso$/);
});

test('withdrawn curricula are not linked or downloadable, including direct URLs', async () => {
  for (const path of ['/', '/en']) {
    const response = await fetch(new URL(path, baseUrl));
    assert.doesNotMatch(await response.text(), /href="[^\"]*cv_(?:it|en)\.pdf/);
  }
  for (const path of ['/cv_it.pdf', '/cv_en.pdf']) {
    for (const method of ['GET', 'HEAD']) {
      const response = await fetch(new URL(path, baseUrl), { method });
      assert.equal(response.status, 410);
      assert.equal(response.headers.get('cache-control'), 'no-store');
      assert.match(response.headers.get('x-robots-tag') || '', /noindex/);
      assert.equal((await response.arrayBuffer()).byteLength, 0);
    }
  }
});

test('brand icons are discoverable by browsers and crawlers in both languages', async () => {
  for (const path of ['/', '/en']) {
    const response = await fetch(new URL(path, baseUrl));
    const html = await response.text();
    assert.match(html, /rel="icon"[^>]+href="\/favicon\.ico/);
    assert.match(html, /rel="apple-touch-icon"/);
    assert.match(html, /rel="manifest"/);
  }
  for (const path of ['/favicon.ico', '/icon.png', '/apple-icon.png']) {
    const response = await fetch(new URL(path, baseUrl), { headers: { 'user-agent': 'Googlebot' } });
    assert.equal(response.status, 200);
    assert.match(response.headers.get('content-type') || '', /image\//);
    assert.ok((await response.arrayBuffer()).byteLength > 100);
  }
  const response = await fetch(new URL('/manifest.webmanifest', baseUrl));
  assert.equal(response.status, 200);
  const manifest = await response.json();
  assert.equal(manifest.short_name, 'Antonio Carbone');
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
