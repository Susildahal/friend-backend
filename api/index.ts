import app from "../src/app.js";
import { connectDB } from "../src/config/database.js";
import type { VercelRequest, VercelResponse } from '@vercel/node';

// Connect to database once
let isConnected = false;

const connectToDatabase = async () => {
  if (!isConnected) {
    try {
      await connectDB();
      isConnected = true;
      console.log("✅ Database connected");
    } catch (error) {
      console.error("❌ Database connection failed:", error);
    }
  }
};

// Simple API route to check server status
app.get("/", (req, resp) => {
  resp.status(200).json({
    status: "success",
    message: "Friends United Backend is running"
  });
});

// Export the serverless function handler
export default async (req: VercelRequest, res: VercelResponse) => {
  await connectToDatabase();
  return app(req, res);
};
