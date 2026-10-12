export const prerender = true;
import type { APIRoute } from 'astro';

const getRobotsTxt = () => `User-agent: *
Allow: /
Disallow: /keystatic/
Disallow: /api/keystatic/

Sitemap: https://wellbit.in/sitemap.xml
Host: https://wellbit.in
`;

export const GET: APIRoute = () => {
  return new Response(getRobotsTxt(), {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
};
