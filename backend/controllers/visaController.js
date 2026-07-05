import VisaEnquiry from "../models/VisaEnquiry.js";
import { sendVisaEnquiryEmail } from "../utils/sendEmail.js";

const normalizeString = (value) => (typeof value === "string" ? value.trim() : "");

export const createVisaEnquiry = async (req, res) => {
  try {
    const {
      name,
      fullName,
      email,
      phone,
      preferredCountry,
      visaType,
      country,
      message,
      purpose,
      page,
      travelDate,
      qualification,
      metadata = {},
    } = req.body;

    const resolvedFullName = normalizeString(fullName || name);
    const resolvedEmail = normalizeString(email);
    const resolvedPhone = normalizeString(phone);
    const resolvedVisaType = normalizeString(visaType);
    const resolvedCountry = normalizeString(country);
    const resolvedPreferredCountry = normalizeString(preferredCountry);

    if (!resolvedFullName || !resolvedEmail || !resolvedPhone || !resolvedVisaType) {
      return res.status(400).json({
        success: false,
        message: "Please provide your full name, email, phone number, and visa type.",
      });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(resolvedEmail)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address.",
      });
    }

    const enquiry = await VisaEnquiry.create({
      fullName: resolvedFullName,
      email: resolvedEmail,
      phone: resolvedPhone,
      preferredCountry: resolvedPreferredCountry || resolvedCountry,
      visaType: resolvedVisaType,
      country: resolvedCountry,
      message: normalizeString(message),
      purpose: normalizeString(purpose),
      page: normalizeString(page),
      travelDate: normalizeString(travelDate),
      qualification: normalizeString(qualification),
      metadata,
    });

    const emailSent = await sendVisaEnquiryEmail({
      ...enquiry.toObject(),
      submittedAt: enquiry.createdAt,
    });

    if (!emailSent) {
      console.warn("Visa enquiry saved but email could not be sent.");
    }

    return res.status(201).json({
      success: true,
      message: "Visa enquiry submitted successfully.",
      data: enquiry,
    });
  } catch (error) {
    console.error("Error creating visa enquiry:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({ success: false, message: "Validation failed.", error: error.message });
    }

    if (error.name === "MongoServerError" || error.name === "MongoError") {
      return res.status(500).json({ success: false, message: "Database error while saving enquiry.", error: error.message });
    }

    return res.status(500).json({ success: false, message: "Server error. Could not process visa enquiry.", error: error.message });
  }
};

export const getVisaEnquiries = async (req, res) => {
  try {
    const enquiries = await VisaEnquiry.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: enquiries });
  } catch (error) {
    console.error("Error fetching visa enquiries:", error);
    return res.status(500).json({ success: false, message: "Server error. Could not fetch visa enquiries.", error: error.message });
  }
};
