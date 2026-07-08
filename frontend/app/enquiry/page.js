"use client";

import { useState, Suspense } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  getEnquiryDisplayTitle,
  getEnquiryCourseValue,
} from "@/utils/serviceEnquiry";

const COURSE_OPTIONS = [
  "IELTS",
  "PTE",
  "TOEFL",
  "Spoken English",
  "Study Abroad",
  "German Language",
  "French Language",
  "English Basic",
  "English Moderate",
  "English Advanced",
  "Visa Assistance",
];

function EnquiryForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const serviceParam = searchParams.get("service") || "";
  const levelParam = searchParams.get("level") || "";
  const categoryParam = searchParams.get("category") || "";

  const hasServiceParams = Boolean(serviceParam);
  const displayTitle = hasServiceParams
    ? getEnquiryDisplayTitle(serviceParam, levelParam)
    : "";
  const prefillCourse = hasServiceParams
    ? getEnquiryCourseValue(serviceParam, levelParam, categoryParam)
    : "IELTS";

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    course: prefillCourse,
  });
  const [selectedCourses, setSelectedCourses] = useState(
    hasServiceParams ? [prefillCourse] : []
  );
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (field) => (event) => {
    setForm({ ...form, [field]: event.target.value });
  };

  const handleCourseToggle = (course) => {
    setSelectedCourses((prev) => {
      if (prev.includes(course)) {
        return prev.filter((item) => item !== course);
      }
      return [...prev, course];
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback("");

    const resolvedCourses = hasServiceParams
      ? [prefillCourse]
      : selectedCourses.filter(Boolean);

    if (!resolvedCourses.length) {
      setFeedback("Please select at least one course interest.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("/api/contact", {
        name: form.name,
        email: form.email,
        phone: form.phone,
        course: resolvedCourses.join(", "),
        courses: resolvedCourses,
        service: serviceParam || undefined,
        level: levelParam || undefined,
        category: categoryParam || undefined,
      });

      if (response.data?.success !== false) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/");
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      setFeedback(
        error.response?.data?.message ||
          "Unable to submit enquiry. Please check your connection and try again."
      );
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="relative mx-auto flex max-w-7xl flex-col gap-10 px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        {/* Success toast */}
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              className="fixed left-1/2 top-24 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-2xl border border-green-500/30 bg-green-950/90 px-5 py-4 shadow-2xl backdrop-blur-xl"
              role="alert"
            >
              <p className="text-center text-sm font-semibold text-green-300 sm:text-base">
                Enquiry submitted successfully! Redirecting to courses...
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-slate-950/30 backdrop-blur-xl sm:rounded-[40px] sm:p-8">
          <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="inline-flex rounded-full border border-blue-500/20 bg-blue-600/10 px-4 py-2 text-xs uppercase tracking-[0.25em] text-blue-300 sm:text-sm sm:tracking-[0.3em]">
                Start Your Journey
              </p>
              <h1 className="mt-5 text-3xl font-bold tracking-tight text-white sm:mt-6 sm:text-4xl lg:text-5xl">
                {hasServiceParams ? (
                  <>
                    Enquire About{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                      {displayTitle}
                    </span>
                  </>
                ) : (
                  "Ready to take the next step?"
                )}
              </h1>
              <p className="mt-4 max-w-2xl text-sm text-slate-300 sm:text-base">
                Submit your details below. Our team will contact you shortly and you&apos;ll be
                redirected to explore courses.
              </p>
              {categoryParam && (
                <p className="mt-2 text-sm text-slate-400">{categoryParam}</p>
              )}
            </div>

            <div className="rounded-[28px] border border-white/10 bg-slate-900/80 p-5 shadow-[0_30px_90px_-40px_rgba(15,76,129,0.5)] sm:rounded-[32px] sm:p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-200">
                    Full Name *
                  </label>
                  <input
                    required
                    value={form.name}
                    onChange={handleChange("name")}
                    disabled={success}
                    className="w-full rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-white outline-none transition focus:border-blue-400 disabled:opacity-60"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-200">
                    Email Address (Optional)
                  </label>
                  <input
                    value={form.email}
                    onChange={handleChange("email")}
                    disabled={success}
                    className="w-full rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-white outline-none transition focus:border-blue-400 disabled:opacity-60"
                    placeholder="you@example.com"
                    type="email"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-200">
                    Phone Number *
                  </label>
                  <input
                    required
                    value={form.phone}
                    onChange={handleChange("phone")}
                    disabled={success}
                    className="w-full rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-white outline-none transition focus:border-blue-400 disabled:opacity-60"
                    placeholder="+91 90000 00000"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-200">
                    Course Interest {hasServiceParams ? "" : "(Select one or more)"}
                  </label>
                  {hasServiceParams ? (
                    <input
                      type="text"
                      value={form.course}
                      readOnly
                      className="w-full cursor-default rounded-3xl border border-white/10 bg-slate-800/80 px-4 py-3 text-slate-200 outline-none"
                    />
                  ) : (
                    <div className="grid gap-2 sm:grid-cols-2">
                      {COURSE_OPTIONS.map((course) => {
                        const isChecked = selectedCourses.includes(course);
                        return (
                          <label
                            key={course}
                            className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-3 py-2 text-sm transition ${
                              isChecked
                                ? "border-blue-500/50 bg-blue-600/10 text-blue-200"
                                : "border-white/10 bg-slate-950/70 text-slate-200"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => handleCourseToggle(course)}
                              disabled={success}
                              className="h-4 w-4 rounded border-white/20 bg-transparent text-blue-500 focus:ring-blue-400"
                            />
                            <span>{course}</span>
                          </label>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full rounded-3xl border bg-blue-600 px-5 py-3.5 text-base font-semibold text-white shadow-[0_0_20px_rgba(37,99,235,0.3)] transition hover:bg-blue-500 hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] disabled:cursor-not-allowed disabled:opacity-60"
                    disabled={loading || success || !form.name || !form.phone || (!hasServiceParams && selectedCourses.length === 0)}
                  >
                    {loading
                      ? "Submitting..."
                      : success
                        ? "Redirecting..."
                        : "Submit Enquiry & View Courses"}
                  </button>
                </div>

                {feedback && (
                  <p className="mt-2 text-center text-sm text-red-400">{feedback}</p>
                )}
              </form>
            </div>
          </div>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-blue-950/80 p-6 shadow-xl shadow-slate-950/40 sm:rounded-[32px] sm:p-8">
          <h2 className="text-xl font-semibold text-white sm:text-2xl">
            Why International Institute Of Language?
          </h2>
          <ul className="mt-5 space-y-4 text-sm text-slate-200 sm:mt-6 sm:text-base">
            <li className="flex gap-3">
              <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600/20 text-sm text-blue-300">
                1
              </span>
              Personalized course guidance for immigration, IELTS, PTE, and spoken English.
            </li>
            <li className="flex gap-3">
              <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600/20 text-sm text-blue-300">
                2
              </span>
              Instant access to our extensive course catalogue right after your enquiry.
            </li>
            <li className="flex gap-3">
              <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600/20 text-sm text-blue-300">
                3
              </span>
              Our expert team will follow up quickly to answer any of your questions.
            </li>
          </ul>
          <div className="mt-6 rounded-3xl bg-white/5 p-5 text-slate-300 sm:mt-8 sm:p-6">
            <h3 className="font-semibold text-white">Need a different connection?</h3>
            <p className="mt-2 text-sm leading-relaxed">
              If you prefer communicating over direct chat or call, please reach out to us at our
              main contact portal.
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-flex rounded-full border border-white/20 bg-white/10 px-6 py-2 text-sm text-white transition hover:bg-white/20"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function Enquiry() {
  return (
    <>
      <Navbar />
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-400">
            Loading enquiry form...
          </div>
        }
      >
        <EnquiryForm />
      </Suspense>
      <Footer />
    </>
  );
}
