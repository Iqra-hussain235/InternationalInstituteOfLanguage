import mongoose from "mongoose";

const academyEnquirySchema = new mongoose.Schema({
  course: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  // Dynamic fields depending on course:
  mode: { type: String },
  type: { type: String },
  duration: { type: String },
  package: { type: String },
  modules: { type: String },
  level: { type: String },
  purpose: { type: String }
}, { timestamps: true });

export default mongoose.model("AcademyEnquiry", academyEnquirySchema);
