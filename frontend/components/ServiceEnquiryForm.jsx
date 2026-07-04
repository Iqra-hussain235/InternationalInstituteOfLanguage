"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Link from "next/link";
import { FaCheckCircle, FaArrowLeft } from "react-icons/fa";
import {
  getEnquiryDisplayTitle,
  getEnquiryCourseValue,
} from "@/utils/serviceEnquiry";

export default function ServiceEnquiryForm({ service, level, category }) {
  const displayTitle = getEnquiryDisplayTitle(service, level);
  const courseValue = getEnquiryCourseValue(service, level, category);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: courseValue,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      setErrorMsg("Please fill in your Name and Phone Number.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      const payload = {
        course: courseValue,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service,
        level: level || undefined,
        category: category || undefined,
      };

      const response = await axios.post(`http://localhost/academy`);
      if (response.data.success) {
        
        setIsSuccess(true);
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mx-auto max-w-lg text-center"
      >
        <motion.div
          initial={{ rotate: -90 }}
          animate={{ rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 12 }}
          className="mb-6 inline-block text-6xl text-green-500"
        >
          <FaCheckCircle />
        </motion.div>
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">
          Enquiry Submitted!
        </h2>
        <p className="mt-4 text-lg text-slate-300">
          Thank you for your interest in <strong>{displayTitle}</strong>. Our advisors will contact you shortly.
        </p>
        <Link
          href="/services"
          className="mt-8 inline-flex rounded-lg bg-slate-800 px-8 py-3 font-semibold text-slate-200 transition hover:bg-slate-700"
        >
          Back to Services
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-lg"
    >
      <div className="mb-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-400">
          Course Enquiry
        </p>
        <h1 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">
          Enquire About{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
            {displayTitle}
          </span>
        </h1>
        {category && (
          <p className="mt-2 text-sm text-slate-400">{category}</p>
        )}
      </div>

      <div className="rounded-2xl border border-slate-700/50 bg-[#1e293b] p-6 shadow-2xl sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-300">
              Selected Course
            </label>
            <input
              type="text"
              name="course"
              value={formData.course}
              readOnly
              className="w-full cursor-default rounded-lg border border-slate-600 bg-slate-800/80 px-4 py-3 text-slate-200 outline-none"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-300">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-red-500 focus:ring-1 focus:ring-red-500"
              placeholder="Your full name"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-300">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-red-500 focus:ring-1 focus:ring-red-500"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-300">
              Phone Number *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-red-500 focus:ring-1 focus:ring-red-500"
              placeholder="+91 XXXXX XXXXX"
            />
          </div>

          {errorMsg && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-sm text-red-400"
            >
              {errorMsg}
            </motion.p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-gradient-to-r from-red-600 to-orange-500 py-3.5 font-bold text-white shadow-[0_4px_20px_rgba(239,68,68,0.4)] transition hover:from-red-500 hover:to-orange-400 disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Submit Enquiry"}
          </button>
        </form>

        <Link
          href="/services"
          className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-400 transition hover:text-white"
        >
          <FaArrowLeft className="text-xs" /> Back to Services
        </Link>
      </div>
    </motion.div>
  );
}
