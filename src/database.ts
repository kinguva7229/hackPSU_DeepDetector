import mongoose from "mongoose";

export const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/deepscan";

export async function connectDB() {
  try {
    await mongoose.connect(mongoUri);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
}
