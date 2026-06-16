import express from "express";
import {
addAppointment,
getAppointments,
 updateAppointment,
  deleteAppointment,
} from "../controllers/appointmentController.js";

const router = express.Router();

router.post("/", addAppointment);

router.get("/", getAppointments);
router.put("/:id", updateAppointment);

router.delete("/:id", deleteAppointment);
export default router;
