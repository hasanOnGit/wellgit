import type { APIRoute } from 'astro';
import { SESSION_COOKIE_NAME } from '@/utils/auth';

export const prerender = false;

export const POST: APIRoute = async () => {
  const cookie = `${SESSION_COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  return new Response(JSON.stringify({ success: true, message: 'Logged out successfully.' }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': cookie,
    },
  });
};

export const GET: APIRoute = async () => {
  const cookie = `${SESSION_COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  return new Response(null, {
    status: 302,
    headers: {
      Location: '/dashboard/login',
      'Set-Cookie': cookie,
    },
  });
};
