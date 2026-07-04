import express from "express";
import { createAcademyEnquiry, getAcademyEnquiries } from "../controllers/academyController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/enquiry", createAcademyEnquiry);
router.get("/enquiry", protect, getAcademyEnquiries);

export default router;
