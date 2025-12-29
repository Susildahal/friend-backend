import { createClient } from "@sanity/client";
import dotenv from "dotenv";

dotenv.config();

const config = {
  projectId: process.env.SANITY_PROJECT_ID || "e6ou6t4t",
  dataset: process.env.SANITY_DATASET || "production",
  apiVersion: "2025-01-01",
  useCdn: false,
  ...(process.env.SANITY_API_TOKEN && { token: process.env.SANITY_API_TOKEN }),
};

// Log token status for debugging
if (!process.env.SANITY_API_TOKEN) {
  console.error("⚠️ WARNING: SANITY_API_TOKEN is not set in .env file!");
} else {
  console.log("✅ Sanity API token loaded (length:", process.env.SANITY_API_TOKEN.length, "chars)");
}
    
export const client = createClient(config);

export default client;