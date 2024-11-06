import express from "express";
import { verifyToken } from "../utils/verifyToken.js";
import {
  signup,
  login,
  logout,
  checkAuth,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/signout", logout);
router.get("/check-auth", verifyToken, checkAuth);
export default router;
