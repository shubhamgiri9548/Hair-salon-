import express from "express";

import {
  createAppointment,
  getAppointments,
  getAvailability
} from "../controllers/appointmentcontroller.js";

const router = express.Router();

router.post("/", createAppointment);
router.get("/availability", getAvailability);
router.get("/", getAppointments);

export default router;