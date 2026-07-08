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
    const emailSent = await sendEnquiryEmail(contact, false);

    res.status(201).json({
      success: true,
      message: emailSent
        ? "Enquiry submitted and email notification sent."
        : "Enquiry saved, but the email notification could not be sent.",
      emailSent,
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
