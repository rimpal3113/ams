import express from "express";

import {
  addDoctor,
  getDoctors,updateDoctor,
deleteDoctor,
} from "../controllers/doctorController.js";

const router = express.Router();

router.post("/", addDoctor);

router.get("/", getDoctors);
router.put("/:id", updateDoctor);
router.delete("/:id", deleteDoctor);

export default router;