import type { APIRoute } from 'astro';
import {
  validateCredentials,
  createSessionToken,
  SESSION_COOKIE_NAME,
} from '@/utils/auth';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return new Response(
        JSON.stringify({ success: false, error: 'Please provide both email and password.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!validateCredentials(email, password)) {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid credentials. Access denied.' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const token = createSessionToken(email);
    const isProduction = process.env.NODE_ENV === 'production';
    const secureFlag = isProduction ? 'Secure;' : '';
    const cookie = `${SESSION_COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Lax; ${secureFlag} Max-Age=604800`;

    return new Response(
      JSON.stringify({ success: true, message: 'Authenticated successfully.' }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Set-Cookie': cookie,
        },
      }
    );
  } catch (error) {
    console.error('Login error:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Internal authentication error.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
