import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String, required: true },
  course: { type: String, required: true },
  courses: [{ type: String }]
}, { timestamps: true });

export default mongoose.model("Contact", contactSchema);