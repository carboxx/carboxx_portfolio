const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const siteUrl = new URL(
  configuredSiteUrl || 'https://antoniocarbone.com'
);

export function isIndexableHost(hostname: string): boolean {
  const canonicalHost = siteUrl.hostname;
  const isPublicHost = hostname === canonicalHost ||
    hostname === (canonicalHost.startsWith('www.') ? canonicalHost.slice(4) : `www.${canonicalHost}`);
  return isPublicHost && (!process.env.CONTEXT || process.env.CONTEXT === 'production');
}
