import express from "express";
import { createAppointment, getAppointments } from "../controller/appointment.controller.js";

const router = express.Router();

router.post("/user", createAppointment);
router.get("/user", getAppointments);

export default router;