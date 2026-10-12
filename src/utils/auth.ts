import crypto from 'node:crypto';

export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'm.hasanmzp@gmail.com';
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Aman@7860';
const SECRET_KEY =
  process.env.ADMIN_JWT_SECRET || 'wellbit_secret_key_8948626497_secure_salt_2026';

export const SESSION_COOKIE_NAME = 'wellbit_admin_session';

export function validateCredentials(email: string, pass: string): boolean {
  if (!email || !pass) return false;
  return (
    email.trim().toLowerCase() === ADMIN_EMAIL.trim().toLowerCase() &&
    pass.trim() === ADMIN_PASSWORD.trim()
  );
}

export function createSessionToken(email: string): string {
  const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days
  const payload = JSON.stringify({ email, exp: expiresAt });
  const encodedPayload = Buffer.from(payload).toString('base64url');

  const hmac = crypto.createHmac('sha256', SECRET_KEY);
  hmac.update(encodedPayload);
  const signature = hmac.digest('base64url');

  return `${encodedPayload}.${signature}`;
}

export function verifySessionToken(token: string | null | undefined): {
  valid: boolean;
  email?: string;
} {
  if (!token || typeof token !== 'string' || !token.includes('.')) {
    return { valid: false };
  }

  const [encodedPayload, signature] = token.split('.');
  if (!encodedPayload || !signature) {
    return { valid: false };
  }

  const expectedHmac = crypto.createHmac('sha256', SECRET_KEY);
  expectedHmac.update(encodedPayload);
  const expectedSignature = expectedHmac.digest('base64url');

  if (signature !== expectedSignature) {
    return { valid: false };
  }

  try {
    const payload = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString('utf8'));
    if (payload.exp && Date.now() > payload.exp) {
      return { valid: false }; // Expired
    }
    return { valid: true, email: payload.email };
  } catch {
    return { valid: false };
  }
}

export function isAuthenticated(request: Request): boolean {
  const cookieHeader = request.headers.get('cookie') || '';
  const cookies = Object.fromEntries(
    cookieHeader.split(';').map(c => {
      const [k, ...v] = c.trim().split('=');
      return [k, v.join('=')];
    })
  );

  const token = cookies[SESSION_COOKIE_NAME];
  return verifySessionToken(token).valid;
}
