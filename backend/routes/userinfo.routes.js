import express from "express";
import { getUserProfile, updateUserInfo } from "../controllers/userinfo.controller.js";

const router = express.Router();

// Route to fetch user profile
// This assumes the email is sent in the body of the request
router.get("/:email", getUserProfile);

// Route to update user profile
// This assumes the email is provided as a parameter in the URL
router.put("/:email", updateUserInfo);

export default router;
