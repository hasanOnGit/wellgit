export const prerender = true;
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

interface SitemapEntry {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export const GET: APIRoute = async () => {
  const siteUrl = 'https://wellbit.in';
  const today = new Date().toISOString().split('T')[0];

  // Core static pages
  const staticPages: SitemapEntry[] = [
    { loc: `${siteUrl}/`, changefreq: 'weekly', priority: 1.0, lastmod: today },
    { loc: `${siteUrl}/solutions`, changefreq: 'weekly', priority: 0.9, lastmod: today },
    { loc: `${siteUrl}/platform`, changefreq: 'weekly', priority: 0.9, lastmod: today },
    { loc: `${siteUrl}/about`, changefreq: 'monthly', priority: 0.8, lastmod: today },
    { loc: `${siteUrl}/contact`, changefreq: 'monthly', priority: 0.8, lastmod: today },
    { loc: `${siteUrl}/downloads/editions`, changefreq: 'monthly', priority: 0.7, lastmod: today },
    { loc: `${siteUrl}/downloads/license-options`, changefreq: 'monthly', priority: 0.7, lastmod: today },
    { loc: `${siteUrl}/downloads/subscription-licensing`, changefreq: 'monthly', priority: 0.7, lastmod: today },
    { loc: `${siteUrl}/downloads/request-quote`, changefreq: 'monthly', priority: 0.7, lastmod: today },
    { loc: `${siteUrl}/downloads/datanova-core`, changefreq: 'monthly', priority: 0.7, lastmod: today },
    { loc: `${siteUrl}/support/knowledge-base`, changefreq: 'weekly', priority: 0.8, lastmod: today },
    { loc: `${siteUrl}/support/articles`, changefreq: 'weekly', priority: 0.8, lastmod: today },
    { loc: `${siteUrl}/support/reference`, changefreq: 'monthly', priority: 0.7, lastmod: today },
    { loc: `${siteUrl}/support/whitepapers`, changefreq: 'monthly', priority: 0.7, lastmod: today },
    { loc: `${siteUrl}/support/sample-spreadsheets`, changefreq: 'monthly', priority: 0.6, lastmod: today },
  ];

  // Dynamic content collections: articles
  let articleEntries: SitemapEntry[] = [];
  try {
    const articles = await getCollection('articles');
    articleEntries = articles.map(item => ({
      loc: `${siteUrl}/support/articles/${item.id}`,
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: item.data.date ? new Date(item.data.date).toISOString().split('T')[0] : today,
    }));
  } catch (err) {
    console.error('Failed to load articles for sitemap:', err);
  }

  // Dynamic content collections: reference
  let referenceEntries: SitemapEntry[] = [];
  try {
    const references = await getCollection('reference');
    referenceEntries = references.map(item => ({
      loc: `${siteUrl}/support/reference/${item.id}`,
      changefreq: 'monthly',
      priority: 0.6,
      lastmod: item.data.date ? new Date(item.data.date).toISOString().split('T')[0] : today,
    }));
  } catch (err) {
    console.error('Failed to load references for sitemap:', err);
  }

  const allEntries = [...staticPages, ...articleEntries, ...referenceEntries];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allEntries
  .map(
    entry => `  <url>
    <loc>${entry.loc}</loc>${entry.lastmod ? `\n    <lastmod>${entry.lastmod}</lastmod>` : ''}${entry.changefreq ? `\n    <changefreq>${entry.changefreq}</changefreq>` : ''}${entry.priority !== undefined ? `\n    <priority>${entry.priority.toFixed(1)}</priority>` : ''}
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
};
