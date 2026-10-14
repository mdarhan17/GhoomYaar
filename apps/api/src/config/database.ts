import mongoose from 'mongoose';
import { env } from './env.js';

mongoose.set('bufferCommands', false);
export async function connectDatabase(): Promise<void> {
  await mongoose.connect(env.MONGODB_URI, { serverSelectionTimeoutMS: 10000 });
  console.info('[database] connected');
}
export async function disconnectDatabase(): Promise<void> {
  await mongoose.disconnect();
}