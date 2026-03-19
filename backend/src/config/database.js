import mongoose from "mongoose";

export async function connectDB() {
  const { MONGO_URI } = process.env;

  // fail fast so config issues are obvious on startup
  if (!MONGO_URI) {
    throw new Error("Missing MONGO_URI in environment variables");
  }

  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    throw error;
  }
}
