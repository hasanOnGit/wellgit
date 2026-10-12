import type { APIRoute } from 'astro';
import { getInquiriesCollection, type InquiryDocument } from '@/db/mongodb';

export const prerender = false;

interface ContactPayload {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  service?: string;
  message?: string;
  category?: 'Contact Inquiry' | 'Quote Request' | 'Newsletter';
}

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

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
        phone: formData.get('phone')?.toString(),
        company: formData.get('company')?.toString(),
        service: formData.get('service')?.toString(),
        message: formData.get('message')?.toString(),
        category: (formData.get('category')?.toString() as any) || undefined,
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

    const rawEmail = data.email?.trim() || '';
    if (!rawEmail || !EMAIL_REGEX.test(rawEmail)) {
      return new Response(
        JSON.stringify({ success: false, error: 'Please provide a valid email address.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Determine category
    let category: 'Contact Inquiry' | 'Quote Request' | 'Newsletter' = 'Contact Inquiry';
    if (data.category) {
      category = data.category;
    } else if (data.service === 'Newsletter Subscription' || (!data.name && !data.message)) {
      category = 'Newsletter';
    } else if (data.company || (data.service && data.service !== 'General Inquiry')) {
      category = 'Quote Request';
    }

    const rawName = data.name?.trim() || (category === 'Newsletter' ? 'Newsletter Subscriber' : 'Anonymous');
    const rawPhone = data.phone?.trim() || '';
    const rawCompany = data.company?.trim() || '';
    const rawService = data.service?.trim() || (category === 'Newsletter' ? 'Newsletter' : 'Custom Software Engineering');
    const rawMessage = data.message?.trim() || (category === 'Newsletter' ? 'Subscribed to Wellbit newsletter updates.' : 'No message provided.');

    // Client metadata
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || '';
    const userAgent = request.headers.get('user-agent') || '';
    const pageUrl = request.headers.get('referer') || '';

    // Create MongoDB document
    const inquiryDoc: InquiryDocument = {
      category,
      name: rawName,
      email: rawEmail,
      phone: rawPhone || undefined,
      company: rawCompany || undefined,
      service: rawService,
      message: rawMessage,
      status: 'new',
      createdAt: new Date(),
      metadata: {
        ip: ip || undefined,
        userAgent: userAgent || undefined,
        pageUrl: pageUrl || undefined,
      },
    };

    // Save to MongoDB Atlas
    const collection = await getInquiriesCollection();
    const result = await collection.insertOne(inquiryDoc);

    console.info('[Wellbit MongoDB] Form inquiry saved successfully:', {
      id: result.insertedId,
      category,
      email: rawEmail,
      timestamp: new Date().toISOString(),
    });

    return new Response(
      JSON.stringify({
        success: true,
        message:
          category === 'Newsletter'
            ? 'Thank you! You are now subscribed to Wellbit engineering updates.'
            : 'Thank you for reaching out. Your inquiry has been received. Our team will review your requirements and get back to you shortly.',
        inquiryId: result.insertedId,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('[Wellbit MongoDB] Error saving inquiry:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: 'An unexpected error occurred while processing your request. Please email us directly at m.hasanmzp@gmail.com.',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
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
