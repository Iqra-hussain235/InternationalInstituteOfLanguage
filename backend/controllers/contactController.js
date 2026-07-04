import Contact from "../models/Contact.js";

export const createContact = async (req, res) => {
  try {
    const { name, email, phone, course } = req.body;
    
    if (!name || !phone || !course) {
      return res.status(400).json({ message: "Name, phone, and course are required." });
    }

    const contact = await Contact.create({ name, email, phone, course });

    // Try sending email Notification and CSV export
    import("../utils/sendEmail.js").then(({ sendEnquiryEmail }) => {
      sendEnquiryEmail(contact, false);
    });

    import("../utils/saveToCSV.js").then(({ appendGeneralEnquiryCSV }) => {
      appendGeneralEnquiryCSV(contact);
    });

    res.status(201).json(contact);
  } catch (error) {
    console.error("Error creating contact:", error);
    res.status(500).json({ message: "Server error. Could not process enquiry." });
  }
};

export const getContacts = async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
};