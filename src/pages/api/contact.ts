import type { APIRoute } from 'astro';
import { db } from '@/db/client';
import { inquiries } from '@/db/schema';
import { sql } from 'drizzle-orm';

export const prerender = false;

interface ContactPayload {
  name?: string;
  email?: string;
  company?: string;
  service?: string;
  message?: string;
}

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const VALID_SERVICES = [
  'Custom Software Development',
  'AI Solutions & Agents',
  'Workflow Automation',
  'CRM & Business Portals',
  'HR & Enterprise Applications',
  'Cloud & API Integration',
  'Application Modernization',
  'Engineering Support',
  'Technical Consulting',
  'Other',
];

export const POST: APIRoute = async ({ request }) => {
  try {
    let data: ContactPayload;
    const contentType = request.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      data = await request.json();
    } else if (
      contentType.includes('application/x-www-form-urlencoded') ||
      contentType.includes('multipart/form-data')
    ) {
      const formData = await request.formData();
      data = {
        name: formData.get('name')?.toString(),
        email: formData.get('email')?.toString(),
        company: formData.get('company')?.toString(),
        service: formData.get('service')?.toString(),
        message: formData.get('message')?.toString(),
      };
    } else {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Unsupported media type. JSON or form-data expected.',
        }),
        { status: 415, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const rawName = data.name;
    const rawEmail = data.email;
    const rawCompany = data.company ?? '';
    const rawService = data.service ?? 'Custom Software Development';
    const rawMessage = data.message;

    // Server-side validation: Name
    if (!rawName || typeof rawName !== 'string' || rawName.trim().length === 0) {
      return new Response(
        JSON.stringify({ success: false, error: 'Please provide your name.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    const trimmedName = rawName.trim();
    if (trimmedName.length > 100) {
      return new Response(
        JSON.stringify({ success: false, error: 'Name cannot exceed 100 characters.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Server-side validation: Email
    if (!rawEmail || typeof rawEmail !== 'string' || !EMAIL_REGEX.test(rawEmail.trim())) {
      return new Response(
        JSON.stringify({ success: false, error: 'Please provide a valid email address.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    const trimmedEmail = rawEmail.trim();
    if (trimmedEmail.length > 254) {
      return new Response(
        JSON.stringify({ success: false, error: 'Email cannot exceed 254 characters.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Server-side validation: Message
    if (!rawMessage || typeof rawMessage !== 'string' || rawMessage.trim().length === 0) {
      return new Response(
        JSON.stringify({ success: false, error: 'Please provide a brief description of your project or inquiry.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    const trimmedMessage = rawMessage.trim();
    if (trimmedMessage.length > 2000) {
      return new Response(
        JSON.stringify({ success: false, error: 'Message cannot exceed 2000 characters.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Server-side validation: Company (optional, max 100 chars)
    const trimmedCompany = typeof rawCompany === 'string' ? rawCompany.trim().slice(0, 100) : '';

    // Server-side validation: Service (restricted to whitelist or default)
    let validatedService = typeof rawService === 'string' ? rawService.trim() : 'Custom Software Development';
    if (!VALID_SERVICES.includes(validatedService)) {
      validatedService = 'Other';
    }

    // Database persistence
    let persistedToDb = false;
    try {
      await db.run(sql`
        CREATE TABLE IF NOT EXISTS Inquiries (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          company TEXT,
          service TEXT,
          message TEXT NOT NULL,
          created_at TEXT NOT NULL
        )
      `);

      await db.insert(inquiries).values({
        name: trimmedName,
        email: trimmedEmail,
        company: trimmedCompany || null,
        service: validatedService,
        message: trimmedMessage,
        createdAt: new Date().toISOString(),
      });
      persistedToDb = true;
    } catch (dbError) {
      console.warn('[Wellbit Contact API] Database persistence note:', dbError);
    }

    // Structured logging for audit & observability
    console.info('[Wellbit Contact API] New inquiry received:', {
      name: trimmedName,
      email: trimmedEmail,
      company: trimmedCompany,
      service: validatedService,
      messageLength: trimmedMessage.length,
      persistedToDb,
      timestamp: new Date().toISOString(),
    });

    return new Response(
      JSON.stringify({
        success: true,
        message:
          'Thank you for reaching out. Your enquiry has been received. Our team will review your requirements and get back to you shortly.',
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('[Wellbit Contact API] Error processing inquiry:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: 'An unexpected error occurred while processing your request. Please email us directly at contact@wellbit.in.',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
};

export const ALL: APIRoute = async ({ request }) => {
  if (request.method !== 'POST') {
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Method not allowed. Only POST requests are supported.',
      }),
      {
        status: 405,
        headers: {
          'Content-Type': 'application/json',
          Allow: 'POST',
        },
      }
    );
  }
  return POST({ request } as any);
};
