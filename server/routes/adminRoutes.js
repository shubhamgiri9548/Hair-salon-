import express from "express"
import {protect} from "../middleware/protect.js";

import {
    getDashboard,
    getCustomers,
    getAppointments
} from "../controllers/admincontroller.js";

const router = express.Router();

router.get("/dashboard",  protect, getDashboard );
router.get("/customers", protect, getCustomers);
router.get("/appointments", protect, getAppointments);

export default router;