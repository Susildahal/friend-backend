import dotenv from "dotenv";
import { AppError } from "../utils/AppError.js";
import { catchAsync } from "../utils/catchAsync.js";
import { sendEmail } from "../utils/sendEmail.js";
import { sendResponse } from "../utils/sendResponse.js";

dotenv.config();

export const createContactemail = catchAsync(async (req, res ,next) => {
  const { firstName, lastName, email, phoneNumber, message } = req.body;

  if (!firstName || !lastName || !email || !phoneNumber || !message) {
    throw new AppError("All fields are requird", 400);
  }

  const subject = "New Contact Form Submission";
  const html = `
    <div style="font-family: Arial, sans-serif;
    line-height: 1.6; color: #333;">
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> +${phoneNumber}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
      <hr/>
      <p>This message was sent from the Contact Us form on your website.</p>
      </div>
      `;

  await sendEmail({
    to: process.env.SMTP_USER as string,
    subject,
    html,
  });

  // Don't send response here - let the next controller handle it
  next();
});
