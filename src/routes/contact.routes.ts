import express from "express";
import { createContact } from "../controllers/contract.js";
import { createContactemail } from "../controllers/contact.controller.js";

const router = express.Router();

router.post("/",createContactemail, createContact);

export default router;
