import mongoose from "mongoose";
import { env } from "./env.js";

export async function connectDatabase(): Promise<void> {
  try {
    await mongoose.connect(env.MONGODB_URI, {
      serverSelectionTimeoutMS: 8000,
      maxPoolSize: 10
    });

    console.log("[DATABASE] MongoDB connected");
  } catch (error) {
    console.error("[DATABASE] MongoDB connection failed");
    throw error;
  }
}

export async function disconnectDatabase(): Promise<void> {
  await mongoose.disconnect();
  console.log("[DATABASE] MongoDB disconnected");
}