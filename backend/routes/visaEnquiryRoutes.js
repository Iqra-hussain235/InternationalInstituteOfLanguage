import express from "express";
// import { createContact, getContacts } from "../controllers/contactController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// router.post("/", );
router.get("/", protect, getVisaEnquiries);

export default router;