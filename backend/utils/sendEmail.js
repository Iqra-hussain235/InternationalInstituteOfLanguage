import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

/**
 * Configure the transporter using Gmail service.
 * NOTE: For Gmail, you MUST use an App Password if 2FA is enabled or if "Less secure app access" is disabled.
 */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEnquiryEmail = async (enquiryData, isAcademy = false) => {
  try {
    const toEmail = "iqratechnicl@gmail.com"; 

    let subject = "";
    let htmlContent = "";

    if (isAcademy) {
      subject = `New Academy Enrollment Enquiry - ${enquiryData.course}`;
      htmlContent = `
        <h2>New Academy Course Enquiry</h2>
        <p>You have received a new enquiry for an academy course. Details are below:</p>
        <table border="1" cellpadding="10" style="border-collapse: collapse;">
          <tr><td><strong>Name</strong></td><td>${enquiryData.name}</td></tr>
          <tr><td><strong>Phone</strong></td><td>${enquiryData.phone}</td></tr>
          <tr><td><strong>Email</strong></td><td>${enquiryData.email || "Not Provided"}</td></tr>
          <tr><td><strong>Course</strong></td><td>${enquiryData.course}</td></tr>
          ${enquiryData.mode ? `<tr><td><strong>Mode</strong></td><td>${enquiryData.mode}</td></tr>` : ""}
          ${enquiryData.type ? `<tr><td><strong>Session Type</strong></td><td>${enquiryData.type}</td></tr>` : ""}
          ${enquiryData.duration ? `<tr><td><strong>Duration</strong></td><td>${enquiryData.duration}</td></tr>` : ""}
          ${enquiryData.package ? `<tr><td><strong>Package</strong></td><td>${enquiryData.package}</td></tr>` : ""}
          ${enquiryData.modules ? `<tr><td><strong>Modules</strong></td><td>${enquiryData.modules}</td></tr>` : ""}
          ${enquiryData.level ? `<tr><td><strong>Level</strong></td><td>${enquiryData.level}</td></tr>` : ""}
          ${enquiryData.purpose ? `<tr><td><strong>Purpose</strong></td><td>${enquiryData.purpose}</td></tr>` : ""}
        </table>
      `;
    } else {
      subject = `New General Enquiry - ${enquiryData.course}`;
      htmlContent = `
        <h2>New General Enquiry</h2>
        <p>You have received a new general enquiry. Details are below:</p>
        <table border="1" cellpadding="10" style="border-collapse: collapse;">
          <tr><td><strong>Name</strong></td><td>${enquiryData.name}</td></tr>
          <tr><td><strong>Phone</strong></td><td>${enquiryData.phone}</td></tr>
          <tr><td><strong>Email</strong></td><td>${enquiryData.email || "Not Provided"}</td></tr>
          <tr><td><strong>Course of Interest</strong></td><td>${enquiryData.course}</td></tr>
        </table>
      `;
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: toEmail,
      subject: subject,
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully: " + info.response);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};
