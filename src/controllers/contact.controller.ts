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
  <div style="background-color:#f4f6f8; padding:40px 0; font-family: Arial, sans-serif;">
    <div style="
      max-width:600px;
      margin:0 auto;
      background:#ffffff;
      border-radius:8px;
      overflow:hidden;
      box-shadow:0 4px 10px rgba(0,0,0,0.08);
    ">

      <!-- Header -->
      <div style="background:#2563eb; padding:20px; color:#ffffff;">
        <h2 style="margin:0; font-size:20px;">📩 New Contact Form Submission</h2>
      </div>

      <!-- Body -->
      <div style="padding:24px; color:#333;">
        <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
          <tr>
            <td style="padding:8px 0;"><strong>Name</strong></td>
            <td style="padding:8px 0;">${firstName} ${lastName}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;"><strong>Email</strong></td>
            <td style="padding:8px 0;">${email}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;"><strong>Phone</strong></td>
            <td style="padding:8px 0;">+${phoneNumber}</td>
          </tr>
        </table>

        <hr style="margin:20px 0; border:none; border-top:1px solid #e5e7eb;" />

        <p style="margin:0 0 8px;"><strong>Message</strong></p>
        <div style="
          background:#f9fafb;
          padding:16px;
          border-radius:6px;
          border:1px solid #e5e7eb;
        ">
          <p style="margin:0;">${message}</p>
        </div>
      </div>

      <!-- Footer -->
      <div style="
        background:#f9fafb;
        padding:16px;
        text-align:center;
        font-size:12px;
        color:#6b7280;
      ">
        This message was sent from the <strong>Contact Us</strong> form on your website.
      </div>

    </div>
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
