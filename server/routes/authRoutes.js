import express from "express";

import {
  login,
  logout,
  getMe,
} from "../controllers/authcontroller.js";

import {
  protect,
} from "../middleware/protect.js";

const router = express.Router();

router.post("/login", login );

router.post("/logout", logout);

router.get("/me", protect, getMe);

export default router;