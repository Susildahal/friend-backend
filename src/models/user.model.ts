import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import type { IUser } from "../types/type.js";

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "user"],
      required: true,
      default: "user",
    },
    phone: { type: String, required: true },
    address: { type: String },
    status: { type: Boolean, default: false },
    otp: { type: String, default: null },
    otpExpiry: { type: Date, default: null },
    createdBy: { type: String, enum:["user", "Admin"], default: "user" },
    bookings: [{ type: Schema.Types.ObjectId, ref: "Booking" }],
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export const User = mongoose.model("User", userSchema);
export type UserDocument = mongoose.InferSchemaType<typeof userSchema>;
