import express from "express";
import {
  getUserById,
  getUsers,
  loginUser,
  registerUser,
  verifyOtp,
  deleteUser,
  updateUserStatus,
  updateUser,
  forgotPassword,
  resetpassword,
  getme
} from "../controllers/user.controller.js";
import { adminOnly, protect } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/verifyOtp", verifyOtp);
router.post("/forgot-password",forgotPassword );
router.post("/reset-password",resetpassword );
router.get("/user-list", getUsers);
router.get('/me', protect ,getme);
router.get("/:id", getUserById);
router.delete("/:id", deleteUser);
router.patch("/updateuserstatus/:id", updateUserStatus);
router.put("/updateuser/:id", updateUser);


export default router;