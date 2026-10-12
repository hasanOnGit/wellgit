import type { APIRoute } from 'astro';
import { getInquiriesCollection, type InquiryDocument } from '@/db/mongodb';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { slug, type } = data;

    if (!slug) {
      return new Response(JSON.stringify({ helpful: 0, notHelpful: 0 }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const collection = await getInquiriesCollection();

    if (type === 'helpful' || type === 'notHelpful') {
      const feedbackDoc: InquiryDocument = {
        category: 'Article Feedback',
        name: 'Reader Feedback',
        email: 'reader@wellbit.in',
        slug,
        feedbackType: type,
        message: `Reader marked article "${slug}" as ${type === 'helpful' ? 'Helpful' : 'Not Helpful'}.`,
        status: 'new',
        createdAt: new Date(),
        metadata: {
          ip: request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || undefined,
          userAgent: request.headers.get('user-agent') || undefined,
        },
      };

      await collection.insertOne(feedbackDoc);
    }

    // Count votes for this slug from MongoDB
    const helpfulCount = await collection.countDocuments({
      category: 'Article Feedback',
      slug,
      feedbackType: 'helpful',
    });
    const notHelpfulCount = await collection.countDocuments({
      category: 'Article Feedback',
      slug,
      feedbackType: 'notHelpful',
    });

    return new Response(
      JSON.stringify({ helpful: helpfulCount, notHelpful: notHelpfulCount }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error handling feedback with MongoDB:', error);
    return new Response(JSON.stringify({ helpful: 0, notHelpful: 0 }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
