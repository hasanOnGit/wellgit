import { MongoClient, Db, Collection, type Document } from 'mongodb';

export const MONGO_URI =
  process.env.MONGO_URI ||
  'mongodb+srv://hellorajubhaiya:Ammu7860@clustertuba.wx8jb.mongodb.net/?retryWrites=true&w=majority&appName=ClusterTuba';

export const DB_NAME = process.env.MONGO_DB_NAME || 'WellBitWebsite';

export interface InquiryDocument extends Document {
  category: 'Contact Inquiry' | 'Quote Request' | 'Newsletter' | 'Article Feedback';
  name?: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  message?: string;
  slug?: string;
  feedbackType?: 'helpful' | 'notHelpful';
  status: 'new' | 'reviewed' | 'contacted' | 'archived';
  createdAt: Date;
  metadata?: {
    ip?: string;
    userAgent?: string;
    pageUrl?: string;
  };
}

// Global cached client for serverless environments (prevents connection exhaustion)
let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function getMongoClient(): Promise<MongoClient> {
  if (cachedClient) {
    return cachedClient;
  }

  const client = new MongoClient(MONGO_URI, {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
  });

  await client.connect();
  cachedClient = client;
  return client;
}

export async function getDb(): Promise<Db> {
  if (cachedDb) {
    return cachedDb;
  }

  const client = await getMongoClient();
  const db = client.db(DB_NAME);
  cachedDb = db;
  return db;
}

export async function getInquiriesCollection(): Promise<Collection<InquiryDocument>> {
  const db = await getDb();
  return db.collection<InquiryDocument>('inquiries');
}
