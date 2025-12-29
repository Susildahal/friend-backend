import client from "../config/sanity.js";
import type { Request, Response } from "express";


export const createContact = async (req: Request, res: Response) => {
    interface ContactRequestBody {
      firstname: string;
    email: string;
    message: string;
    lastname: string;
    phoneNumber: string;

  }
  console.log(req.body)
  
  try {
    const { firstName, email, message, lastName, phoneNumber } = req.body;
    if (!firstName || !email || !message || !lastName || !phoneNumber) {
      return res.status(400).json({
        success: false,
        message: "Name, email, lastname, phone number, and message are required.",
      });
    }
    const contactData = {
      _type: "contact",
      firstName,
      lastName,
      email,
      phoneNumber,
      message,
    };
    await client.create(contactData);
    return res.status(201).json({
      success: true,
      message: "Contact message submitted successfully.",
    });
  } catch (error) {
    console.error("Error creating contact message:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while submitting the contact message.",
    });
  }
};
