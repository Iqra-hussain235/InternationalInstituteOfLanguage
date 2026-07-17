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

const escapeHtml = (value) =>
  String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

/**
 * Send email using Resend API (HTTPS port 443) which is not blocked by Render free tier.
 */
const sendEmailViaResend = async (to, subject, html, replyTo) => {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM || "onboarding@resend.dev";

    console.log(`Attempting to send email via Resend API to: ${to}`);

    const body = {
      from: fromEmail,
      to: [to],
      subject: subject,
      html: html,
    };
    if (replyTo) {
      body.reply_to = replyTo;
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    if (!response.ok) {
      console.error("Resend API response error:", data);
      return false;
    }
    console.log("Email sent successfully via Resend API:", data.id || data);
    return true;
  } catch (error) {
    console.error("Error sending email via Resend API:", error);
    return false;
  }
};

export const sendEnquiryEmail = async (enquiryData, isAcademy = false) => {
  try {
    const toEmail = process.env.EMAIL_TO || process.env.EMAIL_USER || "iqratechnicl@gmail.com";

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

    if (process.env.RESEND_API_KEY) {
      return await sendEmailViaResend(toEmail, subject, htmlContent);
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

export const sendVisaEnquiryEmail = async (enquiryData) => {
  try {
    const toEmail = process.env.EMAIL_TO || process.env.EMAIL_USER || "iqratechnicl@gmail.com";
    const field = (value) => escapeHtml(value || "Not Provided");
    const subject = `New Visa Enquiry - ${enquiryData.visaType || "Visa"}`;
    const htmlContent = `
      <h2>New Visa Enquiry</h2>
      <p>You have received a new visa enquiry. Details are below:</p>
      <table border="1" cellpadding="10" style="border-collapse: collapse;">
        <tr><td><strong>Visa Type</strong></td><td>${field(enquiryData.visaType)}</td></tr>
        <tr><td><strong>Full Name</strong></td><td>${field(enquiryData.fullName)}</td></tr>
        <tr><td><strong>Email</strong></td><td>${field(enquiryData.email)}</td></tr>
        <tr><td><strong>Phone</strong></td><td>${field(enquiryData.phone)}</td></tr>
        <tr><td><strong>Preferred Country</strong></td><td>${field(enquiryData.preferredCountry || enquiryData.country)}</td></tr>
        <tr><td><strong>Planned Travel Date</strong></td><td>${field(enquiryData.travelDate)}</td></tr>
        <tr><td><strong>Message</strong></td><td>${field(enquiryData.message)}</td></tr>
        <tr><td><strong>Source Page</strong></td><td>${field(enquiryData.page)}</td></tr>
        <tr><td><strong>Submission Time</strong></td><td>${escapeHtml(new Date(enquiryData.submittedAt || enquiryData.createdAt || Date.now()).toLocaleString())}</td></tr>
      </table>
    `;

    if (process.env.RESEND_API_KEY) {
      return await sendEmailViaResend(toEmail, subject, htmlContent, enquiryData.email);
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: toEmail,
      replyTo: enquiryData.email,
      subject,
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Visa email sent successfully: " + info.response);
    return true;
  } catch (error) {
    console.error("Error sending visa enquiry email:", error);
    return false;
  }
};
