import mongoose from "mongoose";
import dotenv from "dotenv";
import {User} from "../models/user.model.js";

dotenv.config();

export const connectDB = async () => {
  try {
    // Support either MONGO_URI (used in code) or MONGODB_URI (common hosting env var)
    const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error('MongoDB connection string is not set. Define MONGO_URI or MONGODB_URI in your environment (or .env file).');
    }
    await mongoose.connect(mongoUri);
    const user = await User.countDocuments();
    if(user === 0){
      await User.create({
        name: "Admin User",
        email: "admin@gmail.com",
        password: "admin@123",
        role: "admin",
        phone: "0000000000",
        address: "Admin Address",
        status: true,
        createdBy: "Admin",
      });
        
      console.log("Admin user created with email: admin@gmail.com");
    }else{
      console.log("Admin user already exists");
    }

    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
