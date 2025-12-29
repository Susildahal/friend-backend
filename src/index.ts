


import app from "./app.js";
import { connectDB } from "./config/database.js";


const PORT = Number(process.env.PORT) || 5000;



// Simple API route to check server status
app.get("/", (req, resp) => {
  resp.status(200).json({
    status: "success",
    message: "Friends United Backend is running"
  });
});

// Connect to database (non-blocking)
connectDB()
  .then(async () => {
    console.log("✅ Database connected");
    // await seedAdminUser();
  })
  .catch((error) => {
    console.error("❌ Database connection failed:", error.message);
    console.log("⚠️ Server is running but database is not connected");
  });

// Start server only in development (Vercel handles this in production)
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
  });
}

// Export for Vercel
export default app;
