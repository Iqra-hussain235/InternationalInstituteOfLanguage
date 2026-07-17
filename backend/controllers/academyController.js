import AcademyEnquiry from "../models/AcademyEnquiry.js";
import { sendEnquiryEmail } from "../utils/sendEmail.js";
import { appendAcademyEnquiryCSV } from "../utils/saveToCSV.js";

// @desc    Create an academy enquiry
// @route   POST /api/academy/enquiry
// @access  Public
export const createAcademyEnquiry = async (req, res) => {
  try {
    const { course, mode, type, duration, package: packageName, modules, level, purpose, name, email, phone } = req.body;

    // Only strictly require course, name, and phone.
    if (!course || !name || !phone) {
      return res.status(400).json({ message: "Please provide your Name, Phone Number, and select a Course." });
    }

    const enquiry = await AcademyEnquiry.create({
      course,
      mode,
      type,
      duration,
      package: packageName,
      modules,
      level,
      purpose,
      name,
      email,
      phone
    });

    // Save the local export and wait for the notification attempt so failures
    // are visible in the backend logs before the request completes.
    appendAcademyEnquiryCSV(enquiry);
    
    // Send email asynchronously in the background so it doesn't block the HTTP response
    sendEnquiryEmail(enquiry, true)
      .then((emailSent) => {
        if (!emailSent) {
          console.warn("Academy enquiry saved but email could not be sent.");
        }
      })
      .catch((err) => {
        console.error("Background error sending academy email:", err);
      });

    res.status(201).json({
      success: true,
      message: "Booking submitted successfully.",
      data: enquiry,
    });
  } catch (error) {
    console.error("Error creating academy enquiry:", error);
    res.status(500).json({ message: "Server error. Could not process enquiry." });
  }
};

// @desc    Get all academy enquiries
// @route   GET /api/academy/enquiry
// @access  Private (Admin)
export const getAcademyEnquiries = async (req, res) => {
  try {
    const enquiries = await AcademyEnquiry.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: enquiries });
  } catch (error) {
    console.error("Error fetching enquiries:", error);
    res.status(500).json({ message: "Server error. Could not fetch enquiries." });
  }
};
