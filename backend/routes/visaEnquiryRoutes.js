import express from "express";
import { createVisaEnquiry, getVisaEnquiries } from "../controllers/visaController.js";

const router = express.Router();

router.post("/", createVisaEnquiry);
router.get("/", getVisaEnquiries);

export default router;
