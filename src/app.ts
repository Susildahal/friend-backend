import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

import userRoutes from "./routes/user.routes.js";
import contactRoutes from "./routes/contact.routes.js";

import { errorHandler } from "./middleware/error.middleware.js";


dotenv.config();

const app = express();

// CORS Configuration
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:8080',
  process.env.CLIENT_URL,
  'https://friends-united.vercel.app',
  'https://*.vercel.app'
].filter((origin): origin is string => Boolean(origin));

const corsOptions = {
  origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.some(allowed => {
      if (allowed.includes('*')) {
        const pattern = allowed.replace(/\*/g, '.*');
        return new RegExp(`^${pattern}$`).test(origin);
      }
      return allowed === origin;
    })) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Routes
const baseApi = "/api"; // Updated base API path

app.use(`${baseApi}/users`, userRoutes);
app.use(`${baseApi}/contacts`, contactRoutes);



// Error handler
app.use(errorHandler);

export default app;
