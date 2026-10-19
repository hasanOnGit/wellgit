import type { APIRoute } from 'astro';
import { findBestAnswer } from '@data/chatbotKnowledge';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const contentType = request.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      return new Response(
        JSON.stringify({ success: false, error: 'Content-Type must be application/json' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const body = await request.json();
    const query = typeof body.message === 'string' ? body.message.trim() : '';

    if (!query) {
      return new Response(
        JSON.stringify({ success: false, error: 'Message cannot be empty' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Process through domain knowledge & intent engine
    const result = findBestAnswer(query);

    return new Response(
      JSON.stringify({
        success: true,
        answer: result.answer,
        routes: result.routes || [],
        followUps: result.followUps || [],
        matchedTitle: result.matchedTitle || null,
        timestamp: new Date().toISOString(),
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store, max-age=0',
        },
      }
    );
  } catch (error) {
    console.error('Chat API Error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: 'An unexpected error occurred while processing your request.',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
