import mongoose from "mongoose";

const visaEnquirySchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    preferredCountry: { type: String, trim: true },
    visaType: { type: String, required: true, trim: true },
    country: { type: String, trim: true },
    message: { type: String, trim: true },
    purpose: { type: String, trim: true },
    page: { type: String, trim: true },
    travelDate: { type: String, trim: true },
    qualification: { type: String, trim: true },
    metadata: { type: Object, default: {} },
  },
  { timestamps: true }
);

export default mongoose.model("VisaEnquiry", visaEnquirySchema);
