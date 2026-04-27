import express from "express";
import {
  getHospitalAppointments,
  updateAppointmentStatus,
} from "../controller/hospital.controller.js";

const router = express.Router();

router.get("/hospital/:hospitalId", getHospitalAppointments);
router.patch("/:id", updateAppointmentStatus);

export default router;