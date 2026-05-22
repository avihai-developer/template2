import { MongoClient, Db } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/template2';
const client = new MongoClient(mongoUri);

let db: Db;

export async function connectDB(): Promise<Db> {
  if (db) return db;
  await client.connect();
  console.log('🔌 Connected to MongoDB successfully');
  db = client.db();
  return db;
}

export function getDB(): Db {
  if (!db) {
    throw new Error('Database not initialized. Call connectDB first.');
  }
  return db;
}
