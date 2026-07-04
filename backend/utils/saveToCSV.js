import fs from "fs";
import path from "path";

// Utility to escape quotes and handle commas in CSV values
const escapeCsvValue = (val) => {
  if (val === null || val === undefined) return "";
  const str = String(val);
  // If string contains comma, quote, or newline, escape it
  if (str.includes(",") || str.includes('"') || str.includes("\\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
};

// Check and establish data directory
const ensureDataDirectory = () => {
  const dirPath = path.join(process.cwd(), "data");
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  return dirPath;
};

export const appendAcademyEnquiryCSV = (enquiryData) => {
  try {
    const dirPath = ensureDataDirectory();
    const filePath = path.join(dirPath, "academy_enquiries.csv");

    const headers = ["Date", "Name", "Phone", "Email", "Course", "Mode", "Session Type", "Duration", "Package", "Modules", "Level", "Purpose"];
    
    // Check if file exists, if not write headers
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, headers.join(",") + "\n", "utf8");
    }

    const rowData = [
      new Date().toLocaleString(),
      escapeCsvValue(enquiryData.name),
      escapeCsvValue(enquiryData.phone),
      escapeCsvValue(enquiryData.email),
      escapeCsvValue(enquiryData.course),
      escapeCsvValue(enquiryData.mode),
      escapeCsvValue(enquiryData.type),
      escapeCsvValue(enquiryData.duration),
      escapeCsvValue(enquiryData.package),
      escapeCsvValue(enquiryData.modules),
      escapeCsvValue(enquiryData.level),
      escapeCsvValue(enquiryData.purpose)
    ];

    fs.appendFileSync(filePath, rowData.join(",") + "\n", "utf8");
    console.log("Academy Enquiry saved to CSV.");
  } catch (err) {
    console.error("Error writing to Academy CSV", err);
  }
};

export const appendGeneralEnquiryCSV = (enquiryData) => {
  try {
    const dirPath = ensureDataDirectory();
    const filePath = path.join(dirPath, "general_enquiries.csv");

    const headers = ["Date", "Name", "Phone", "Email", "Course Interest"];
    
    // Check if file exists, if not write headers
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, headers.join(",") + "\n", "utf8");
    }

    const rowData = [
      new Date().toLocaleString(),
      escapeCsvValue(enquiryData.name),
      escapeCsvValue(enquiryData.phone),
      escapeCsvValue(enquiryData.email),
      escapeCsvValue(enquiryData.course)
    ];

    fs.appendFileSync(filePath, rowData.join(",") + "\n", "utf8");
    console.log("General Enquiry saved to CSV.");
  } catch (err) {
    console.error("Error writing to General CSV", err);
  }
};
