import type { APIRoute } from 'astro';
import { ObjectId } from 'mongodb';
import { getInquiriesCollection } from '@/db/mongodb';
import { isAuthenticated } from '@/utils/auth';

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  if (!isAuthenticated(request)) {
    return new Response(JSON.stringify({ success: false, error: 'Unauthorized.' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const url = new URL(request.url);
    const category = url.searchParams.get('category');
    const status = url.searchParams.get('status');
    const search = url.searchParams.get('search');
    const limit = Math.min(parseInt(url.searchParams.get('limit') || '100', 10), 500);

    const collection = await getInquiriesCollection();

    // Build filter
    const filter: Record<string, any> = {};
    if (category && category !== 'All') {
      filter.category = category;
    }
    if (status && status !== 'all') {
      filter.status = status;
    }
    if (search && search.trim().length > 0) {
      const regex = { $regex: search.trim(), $options: 'i' };
      filter.$or = [
        { name: regex },
        { email: regex },
        { phone: regex },
        { company: regex },
        { service: regex },
        { message: regex },
      ];
    }

    const inquiries = await collection
      .find(filter)
      .sort({ createdAt: -1 })
      .limit(limit)
      .toArray();

    // Calculate real-time stats
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const totalCount = await collection.countDocuments({});
    const todayCount = await collection.countDocuments({ createdAt: { $gte: startOfToday } });
    const newCount = await collection.countDocuments({ status: 'new' });

    const contactCount = await collection.countDocuments({ category: 'Contact Inquiry' });
    const quoteCount = await collection.countDocuments({ category: 'Quote Request' });
    const newsletterCount = await collection.countDocuments({ category: 'Newsletter' });
    const feedbackCount = await collection.countDocuments({ category: 'Article Feedback' });

    return new Response(
      JSON.stringify({
        success: true,
        inquiries,
        stats: {
          total: totalCount,
          today: todayCount,
          new: newCount,
          byCategory: {
            'Contact Inquiry': contactCount,
            'Quote Request': quoteCount,
            'Newsletter': newsletterCount,
            'Article Feedback': feedbackCount,
          },
        },
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Failed to fetch inquiries.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

export const PATCH: APIRoute = async ({ request }) => {
  if (!isAuthenticated(request)) {
    return new Response(JSON.stringify({ success: false, error: 'Unauthorized.' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return new Response(
        JSON.stringify({ success: false, error: 'Inquiry ID and new status are required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const collection = await getInquiriesCollection();
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status, updatedAt: new Date() } }
    );

    if (result.matchedCount === 0) {
      return new Response(
        JSON.stringify({ success: false, error: 'Inquiry not found.' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: `Status updated to ${status}.` }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error updating inquiry status:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Failed to update status.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

export const DELETE: APIRoute = async ({ request }) => {
  if (!isAuthenticated(request)) {
    return new Response(JSON.stringify({ success: false, error: 'Unauthorized.' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return new Response(
        JSON.stringify({ success: false, error: 'Inquiry ID is required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const collection = await getInquiriesCollection();
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return new Response(
        JSON.stringify({ success: false, error: 'Inquiry not found.' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Inquiry deleted successfully.' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error deleting inquiry:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Failed to delete inquiry.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
