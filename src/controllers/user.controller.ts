import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";
import { AppError } from "../utils/AppError.js";
import { catchAsync } from "../utils/catchAsync.js";
import type { AuthRequest } from "../types/authRequest.js";
import { generateToken } from "../utils/generateToken.js";
import { sendResponse } from "../utils/sendResponse.js";
import crypto from "crypto";
import { sendEmail } from "../utils/sendEmail.js";

export const loginUser = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) throw new AppError("Invalid email", 401);

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new AppError("Incorrect Password", 401);

  const token = generateToken((user._id as string).toString(), user.role);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Login Successful",
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      },
      token,
    },
  });
});

export const registerUser = catchAsync(async (req, res) => {
  const { name, email, password, phone, address , role, createdBy  } = req.body;

  if (!name || !email || !password || !phone || !address || !role )
    throw new AppError("All fields are  required", 400);

 const existingUser = await User.findOne({
  $or: [
    { email: email }, 
    { phone: phone }
  ] 
});

if (existingUser) {
  // Check which field caused the conflict for a better error message
  const conflictField = existingUser.email === email ? "Email" : "Phone number";
  throw new AppError(`${conflictField} already exists`, 409);
}
  

  const otp = Math.floor(100000 + Math.random() * 900000);

  const hashedOtp = crypto
    .createHash("sha256")
    .update(String(otp))
    .digest("hex");

  const otpExpires = Date.now() + 10 * 60 * 1000;

  const user = new User({
    name,
    email,
    password,
    phone,
    address,
    role ,
    otp: hashedOtp,
    otpExpiry: otpExpires,
    createdBy
  });

  await user.save();

  const subject = "Your Friends United OTP Verification Code";

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2>Welcome to Friends United, ${name}!</h2>
      <p>Your One-Time Password (OTP) is:</p>
      <h1 style="color: #007bff;">${otp}</h1>
      <p>This code will expire in <strong>10 minutes</strong>.</p>
      <p>If you didn’t request this, you can ignore this email.</p>
    </div>
  `;

  if(createdBy !== "admin")
  {
    try {
      await sendEmail({ to: email, subject, html });
    } catch (emailError) {
      console.error("Failed to send OTP email:", emailError);
      // Continue with registration even if email fails
    }
  }

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Registration Successful!",
    data: {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        address: user.address,
        status: user.status,
      },
    },
  });
});

export const verifyOtp = catchAsync(async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) throw new AppError("Email and OTP are required", 400);

  const user = await User.findOne({ email });
  if (!user) throw new AppError("User not found", 404);

  const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");

  if (user.otp !== hashedOtp) throw new AppError("Invalid OTP", 400);

  if (user.otpExpiry && user.otpExpiry.getTime() < Date.now())
    throw new AppError("OTP expired", 400);

  user.status = true;
  user.otp = null;
  user.otpExpiry = null;
  await user.save();

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Email verified successfully!",
  });
});

export const getUsers = catchAsync(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;  
  const users =
    (await User.find({})
      .select("-password")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()) || [];

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: users.length ? "Users Fetched Successfully" : "No Users found",
    data: {
      users,pagination: {
        total: await User.countDocuments(),
        page,
        limit,
      },
    },
  });
});

export const getUserById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).select("-password");

  if (!user) throw new AppError("User not found", 404);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User Fetched Successfully",
    data: {
      user,
    },
  });
});

export const deleteUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);

  if (!user) throw new AppError("User not found", 404);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User Deleted Successfully",
  });
}
);

export const updateUserStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    throw new AppError("User not found", 404);
  }
  user.status = !user.status;
  await user.save();
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User status updated successfully",
    data: { user },
  });
});


export const updateUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { name, phone, address,createdBy,email,password ,role } = req.body;
  try {
    const user = await User.findById(id);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    user.name = name || user.name;
    user.phone = phone || user.phone;
    user.address = address || user.address;
    user.createdBy = createdBy || user.createdBy;
    user.email = email || user.email;
    user.role = role || user.role;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }
    await user.save();
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "User updated successfully",
      data: { user },
    });

  } catch (error) {
    throw new AppError("Error updating user: " + (error as Error).message, 500);
  }
  
});

export const forgotPassword = catchAsync(async (req, res) => {
  const { email } = req.body

  if (!email) {
    throw new AppError('Email is required', 400)
  }

  // Find user by email
  const user = await User.findOne({ email })

  if (!user) {
    // Return consistent response for security (don't reveal if email exists)
    return sendResponse(res, {
      success: true,
      statusCode: 200,
      message: 'If this email exists, you will receive a password reset link',
      data: null,
    })
  }

  // Generate OTP
  const otp = Math.floor(100000 + Math.random() * 900000)

  // Hash OTP for storage
  const hashedOtp = crypto
    .createHash('sha256')
    .update(String(otp))
    .digest('hex')

  // Set OTP expiration (10 minutes)
 const otpExpires = new Date(Date.now() + 10 * 60 * 1000)


  // Update user with OTP and expiry
  user.otp = hashedOtp
  user.otpExpiry =  otpExpires
  await user.save()
  sendResponse(res,{
      success: true,
      statusCode: 200,
      message: `${otp}`,

    }
  )

  // Send OTP via email
  const subject = 'Friends United - Password Reset OTP'

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #007bff;">Password Reset Request</h2>
        <p>Hello ${user.name},</p>
        <p>We received a request to reset your password. Use the code below to proceed:</p>
        
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
          <h1 style="color: #007bff; letter-spacing: 5px; margin: 0;">${otp}</h1>
        </div>
        
        <p><strong>This code will expire in 10 minutes.</strong></p>
        
        <p style="color: #666;">
          If you didn't request a password reset, please ignore this email or contact our support team immediately.
        </p>
        
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="font-size: 12px; color: #999;">
          Friends United Admin Dashboard<br>
          © ${new Date().getFullYear()}
        </p>
      </div>
    </div>
  `

  try {
    await sendEmail({ to: email, subject, html })
  } catch (emailError) {
    console.error('Failed to send password reset OTP:', emailError)
    throw new AppError('Failed to send reset email. Please try again.', 500)
  }

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Password reset OTP sent to your email',
    data: null,
  })
})

export const resetpassword = catchAsync(async (req, res) => {
  const { email, newPassword } = req.body;

  // Validation
  if (!email) {
    throw new AppError("Email is required", 400);
  }

  if (!newPassword) {
    throw new AppError("New password is required", 400);
  }

  if (newPassword.length < 6) {
    throw new AppError("Password must be at least 6 characters long", 400);
  }

  // Find user by email
  const user = await User.findOne({ email });

  if (!user) {
    // Return consistent response for security (don't reveal if email exists)
    return sendResponse(res, {
      success: true,
      statusCode: 204,
      message: "User not found",
      data: null,
    });
  }

  // Update password - DO NOT hash here, let the pre-save hook handle it
  user.password = newPassword;
  await user.save();

  return sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Password reset successfully",
    data: null,
  });
});

export const getme = catchAsync<AuthRequest>(async (req, res) => {
  const user = req.user;

  if (!user) {
    throw new AppError("User not found", 404);
  }

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "User profile fetched successfully",
    data: user,
  });
});


