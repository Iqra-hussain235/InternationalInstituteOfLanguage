import Contact from "../models/Contact.js";
import { sendEnquiryEmail } from "../utils/sendEmail.js";
import { appendGeneralEnquiryCSV } from "../utils/saveToCSV.js";

export const createContact = async (req, res) => {
  try {
    const { name, email, phone, course, courses } = req.body;

    const normalizedCourses = Array.isArray(courses)
      ? courses.filter(Boolean).map((item) => String(item).trim()).filter(Boolean)
      : [];

    const resolvedCourse = typeof course === "string" && course.trim()
      ? course.trim()
      : normalizedCourses.join(", ");

    if (!name || !phone || !resolvedCourse) {
      return res.status(400).json({ message: "Name, phone, and course are required." });
    }

    const contact = await Contact.create({
      name,
      email,
      phone,
      course: resolvedCourse,
      courses: normalizedCourses,
    });

    appendGeneralEnquiryCSV(contact);
    
    // Send email asynchronously in the background so it doesn't block the HTTP response
    sendEnquiryEmail(contact, false)
      .then((emailSent) => {
        if (!emailSent) {
          console.warn("Contact enquiry saved but email could not be sent.");
        }
      })
      .catch((err) => {
        console.error("Background error sending contact email:", err);
      });

    res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully.",
      data: contact,
    });
  } catch (error) {
    console.error("Error creating contact:", error);
    res.status(500).json({ message: "Server error. Could not process enquiry." });
  }
};

export const getContacts = async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
};
