"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { 
  FaGlobe, FaCertificate, FaComments, FaCheckCircle, 
  FaArrowLeft, FaGraduationCap, FaPlane, FaFileSignature
} from "react-icons/fa";
import Link from "next/link";
import ServiceEnquiryForm from "@/components/ServiceEnquiryForm";

// ------------------------------
// DATA SCHEMA & FLOW PATTERNS
// ------------------------------
const CATEGORIES = [
  {
    title: "Languages",
    courses: [
      {
        id: "english",
        name: "English Proficiency",
        icon: <FaGlobe className="text-4xl" />,
        flow: [
          { id: "mode", title: "Select Mode", type: "single", options: ["Online", "Offline"] },
          { id: "type", title: "Select Type", type: "single", options: ["Group", "Solo"] },
          { id: "level", title: "Select Level", type: "multiple", options: ["Basic to Professional Advance", "Moderate to Professional", "Advance to Professional", "Basic to Advance"] }
        ]
      },
      {
        id: "french",
        name: "French",
        icon: <FaGlobe className="text-4xl" />,
        flow: [
          { id: "mode", title: "Select Mode", type: "single", options: ["Online", "Offline"] },
          { id: "level", title: "Select Level", type: "multiple", options: ["A1", "A2", "B1", "B2", "C1", "C2"] }
        ]
      },
      {
        id: "german",
        name: "German",
        icon: <FaGlobe className="text-4xl" />,
        flow: [
          { id: "mode", title: "Select Mode", type: "single", options: ["Online", "Offline"] },
          { id: "level", title: "Select Level", type: "multiple", options: ["A1", "A2", "B1", "B2", "C1", "C2"] }
        ]
      }
    ]
  },
  {
    title: "English Exam Abroad",
    courses: [
      {
        id: "ielts", name: "IELTS", icon: <FaFileSignature className="text-4xl" />,
        flow: [
          { id: "mode", title: "Select Mode", type: "single", options: ["Online", "Offline"] },
          { id: "modules", title: "Select Modules", type: "multiple", options: ["Reading", "Writing", "Listening", "Speaking"] }
        ]
      },
      {
        id: "pte", name: "PTE", icon: <FaFileSignature className="text-4xl" />,
        flow: [
          { id: "mode", title: "Select Mode", type: "single", options: ["Online", "Offline"] },
          { id: "modules", title: "Select Modules", type: "multiple", options: ["Reading", "Writing", "Listening", "Speaking"] }
        ]
      },
      {
        id: "oet", name: "OET", icon: <FaFileSignature className="text-4xl" />,
        flow: [
          { id: "mode", title: "Select Mode", type: "single", options: ["Online", "Offline"] },
          { id: "modules", title: "Select Modules", type: "multiple", options: ["Reading", "Writing", "Listening", "Speaking"] }
        ]
      },
      {
        id: "dl", name: "DL", icon: <FaFileSignature className="text-4xl" />,
        flow: [
          { id: "mode", title: "Select Mode", type: "single", options: ["Online", "Offline"] },
          { id: "modules", title: "Select Modules", type: "multiple", options: ["Reading", "Writing", "Listening", "Speaking"] }
        ]
      },
      {
        id: "celpip", name: "CELPIP", icon: <FaFileSignature className="text-4xl" />,
        flow: [
          { id: "mode", title: "Select Mode", type: "single", options: ["Online", "Offline"] },
          { id: "modules", title: "Select Modules", type: "multiple", options: ["Reading", "Writing", "Listening", "Speaking"] }
        ]
      }
    ]
  },
  {
    title: "Skills & Interview Prep",
    courses: [
      {
        id: "teacher-trainer", name: "Teacher's Trainer", icon: <FaGraduationCap className="text-4xl" />,
        flow: [
          { id: "mode", title: "Select Mode", type: "single", options: ["Online", "Offline"] },
          { id: "type", title: "Select Type", type: "single", options: ["Training Only", "Training + Job"] }
        ]
      },
      {
        id: "tesol-tefl", name: "TESOL / TEFL", icon: <FaGraduationCap className="text-4xl" />,
        flow: [
          { id: "mode", title: "Select Mode", type: "single", options: ["Online", "Offline"] },
          { id: "type", title: "Select Type", type: "single", options: ["Training Only", "Training + Job"] }
        ]
      },
      {
        id: "interview-prep", name: "Interview Preparation", icon: <FaComments className="text-4xl" />,
        flow: [
          { id: "purpose", title: "Select Purpose", type: "multiple", options: ["Government Job", "MNC", "Visa", "Immigration"] }
        ]
      }
    ]
  }
];

// ------------------------------
// COMPONENT
// ------------------------------
function CourseSelectionContent() {
  const searchParams = useSearchParams();
  const serviceParam = searchParams.get("service");
  const levelParam = searchParams.get("level");
  const categoryParam = searchParams.get("category");

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [currentStep, setCurrentStep] = useState(-1);
  const [selections, setSelections] = useState({});
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const resetFlow = () => {
    setSelectedCourse(null);
    setCurrentStep(-1);
    setSelections({});
    setFormData({ name: "", email: "", phone: "" });
    setIsSuccess(false);
    setErrorMsg("");
  };

  const handleStartCourse = (course) => {
    setSelectedCourse(course);
    setCurrentStep(0);
    setSelections({});
    setIsSuccess(false);
    setErrorMsg("");
  };

  const handleOptionSelect = (stepId, option, isMultiple) => {
    if (isMultiple) {
      setSelections((prev) => {
        const currentSelected = prev[stepId] || [];
        if (currentSelected.includes(option)) {
          return { ...prev, [stepId]: currentSelected.filter((item) => item !== option) };
        } else {
          return { ...prev, [stepId]: [...currentSelected, option] };
        }
      });
    } else {
      setSelections((prev) => ({ ...prev, [stepId]: option }));
    }
  };

  const isCurrentStepValid = () => {
    if (currentStep < 0 || !selectedCourse) return true;
    if (currentStep >= selectedCourse.flow.length) return true; // At form stage
    
    const currentValidationId = selectedCourse.flow[currentStep].id;
    const selectedData = selections[currentValidationId];
    return selectedData && (Array.isArray(selectedData) ? selectedData.length > 0 : selectedData !== "");
  };

  const handleNextStep = () => {
    if (isCurrentStepValid()) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    } else {
      resetFlow();
    }
  };

  const handleFormChange = (e) => {
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
      // Merge selected steps into the payload
      const payload = {
        course: selectedCourse.name,
        ...selections,
        ...formData
      };
      // Format multiple selections as comma-separated strings for existing backend models if needed
      for (const key in payload) {
        if (Array.isArray(payload[key])) {
          payload[key] = payload[key].join(", ");
        }
      }

      const response = await axios.post(`${BASE_URL}/academy/enquiry`, payload);
      if (response.data.success) {
        setIsSuccess(true);
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ------------------------------
  // RENDER HELPERS
  // ------------------------------
  const slideVariants = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, x: -40, transition: { duration: 0.3, ease: "easeIn" } },
  };

  const fadeVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white py-16 px-4 md:px-8 font-sans relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-red-600 rounded-full blur-[180px] opacity-20 pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-600 rounded-full blur-[180px] opacity-20 pointer-events-none"></div>

      <div className="max-w-5xl mx-auto z-10 relative">

        {/* Service enquiry from URL params */}
        {serviceParam ? (
          <ServiceEnquiryForm
            service={serviceParam}
            level={levelParam || ""}
            category={categoryParam || ""}
          />
        ) : (
        <>
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400"
          >
            {selectedCourse ? selectedCourse.name : "Explore Our World-Class Courses"}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-lg text-slate-400 max-w-2xl mx-auto mt-4"
          >
            {selectedCourse 
              ? "Customize your learning experience step-by-step."
              : "Find the perfect program to accelerate your career or broaden your horizons."}
          </motion.p>
        </div>

        <AnimatePresence mode="wait">
          {currentStep === -1 && !selectedCourse ? (
             
            // ==========================================
            // LANDING CATEGORY & COURSE SELECTION
            // ==========================================
            <motion.div
              key="landing"
              variants={fadeVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.3 } }}
              className="space-y-16"
            >
              {CATEGORIES.map((category, catIdx) => (
                <div key={catIdx} className="space-y-6">
                  <h2 className="text-3xl font-bold border-l-4 border-red-500 pl-4">{category.title}</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.courses.map((course) => (
                      <motion.div
                        key={course.id}
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleStartCourse(course)}
                        className="relative group cursor-pointer"
                      >
                        {/* Animated Glow Backdrop */}
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-blue-600 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-500"></div>
          
                        <div className="relative h-full bg-[#1e293b] p-8 rounded-2xl shadow-xl flex flex-col items-center text-center gap-4 border border-slate-700/50 hover:border-slate-500/50 transition-colors">
                          <div className="p-4 bg-gradient-to-br from-red-500/20 to-blue-500/20 rounded-xl text-red-500">
                            {course.icon}
                          </div>
                          <h3 className="text-xl font-bold text-slate-100 group-hover:text-red-400 transition-colors">
                            {course.name}
                          </h3>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>

          ) : (

            // ==========================================
            // DYNAMIC MULTI-STEP FLOW OR FINAL FORM
            // ==========================================
            <motion.div
              key="flow"
              variants={fadeVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: 20 }}
              className="max-w-3xl mx-auto"
            >
              <div className="bg-[#1e293b] rounded-2xl shadow-2xl p-6 md:p-10 border border-slate-700/50 relative min-h-[450px] flex flex-col justify-between">
                
                {/* ---------------- Progress Indicator ---------------- */}
                {!isSuccess && selectedCourse && (
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                       <span className="text-sm text-slate-400 font-medium">
                         Step {currentStep + 1} of {selectedCourse.flow.length + 1}
                       </span>
                       <span className="text-sm text-red-400 font-medium">
                         {currentStep < selectedCourse.flow.length ? selectedCourse.flow[currentStep].title : "Final Details"}
                       </span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-red-500 to-orange-500 transition-all duration-500 ease-out"
                        style={{ width: `${((currentStep + 1) / (selectedCourse.flow.length + 1)) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* ---------------- Step Content ---------------- */}
                <div className="flex-grow flex flex-col justify-center">
                  <AnimatePresence mode="wait">
                    
                    {isSuccess ? (
                      
                      // Success State
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center space-y-6"
                      >
                        <motion.div 
                          initial={{ rotate: -90 }}
                          animate={{ rotate: 0 }}
                          transition={{ type: "spring", stiffness: 200, damping: 10 }}
                          className="inline-block text-green-500 text-7xl drop-shadow-[0_0_20px_rgba(34,197,94,0.5)] bg-slate-900 rounded-full p-2"
                        >
                          <FaCheckCircle className="bg-[#1e293b]" />
                        </motion.div>
                        <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600">
                          Enquiry Submitted!
                        </h2>
                        <p className="text-slate-300 text-lg">
                          Thank you for choosing <strong>{selectedCourse?.name}</strong>. Our advisors will contact you shortly.
                        </p>
                        <button
                          onClick={resetFlow}
                          className="mt-6 px-8 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors font-semibold"
                        >
                          Explore More Courses
                        </button>
                      </motion.div>

                    ) : currentStep < selectedCourse.flow.length ? (
                      
                      // Dynamic Options Stage
                      <motion.div
                        key={selectedCourse.flow[currentStep].id}
                        variants={slideVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="w-full"
                      >
                        <h3 className="text-2xl font-semibold mb-6 text-center text-slate-200">
                           {selectedCourse.flow[currentStep].title}
                        </h3>
                        <div className="grid gap-4 sm:grid-cols-2">
                          {selectedCourse.flow[currentStep].options.map((opt) => {
                            const isMultiple = selectedCourse.flow[currentStep].type === "multiple";
                            const stepId = selectedCourse.flow[currentStep].id;
                            const currentSel = selections[stepId];
                            const isSelected = isMultiple ? currentSel?.includes(opt) : currentSel === opt;

                            return (
                              <button
                                key={opt}
                                onClick={() => handleOptionSelect(stepId, opt, isMultiple)}
                                className={`
                                  p-4 rounded-xl border-2 transition-all flex items-center justify-center text-md font-medium tracking-wide
                                  ${isSelected 
                                    ? "bg-red-500/10 border-red-500 text-red-100 shadow-[0_0_15px_rgba(239,68,68,0.2)] scale-[1.02]" 
                                    : "bg-slate-800/50 border-slate-700 text-slate-300 hover:border-slate-500 hover:bg-slate-700"}
                                `}
                              >
                                {opt} {isSelected && isMultiple && <span className="ml-2 text-red-500 font-bold">✓</span>}
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>

                    ) : (

                      // Final Enquiry Form Stage
                      <motion.div
                        key="form"
                        variants={slideVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="w-full max-w-sm mx-auto"
                      >
                        <h3 className="text-2xl font-semibold mb-6 text-center text-slate-200">
                           Student Details
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                          <div>
                            <input 
                              type="text" name="name" 
                              value={formData.name} onChange={handleFormChange}
                              className="w-full bg-slate-900 border border-slate-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                              placeholder="Full Name"
                            />
                          </div>
                          <div>
                            <input 
                              type="email" name="email" 
                              value={formData.email} onChange={handleFormChange}
                              className="w-full bg-slate-900 border border-slate-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                              placeholder="Email Address"
                            />
                          </div>
                          <div>
                            <input 
                              type="tel" name="phone" 
                              value={formData.phone} onChange={handleFormChange}
                              className="w-full bg-slate-900 border border-slate-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                              placeholder="Phone Number"
                            />
                          </div>
                          
                          {errorMsg && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-sm text-center">
                              {errorMsg}
                            </motion.div>
                          )}

                          <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="w-full mt-4 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400 text-white font-bold py-3 rounded-lg shadow-[0_4px_20px_rgba(239,68,68,0.4)] hover:shadow-[0_4px_25px_rgba(239,68,68,0.6)] transition-all disabled:opacity-50"
                          >
                            {isSubmitting ? "Submitting..." : "Complete Booking"}
                          </button>
                        </form>
                      </motion.div>

                    )}
                  </AnimatePresence>
                </div>

                {/* ---------------- Navigation Controls ---------------- */}
                {!isSuccess && (
                  <div className="flex justify-between items-center mt-10 pt-6 border-t border-slate-700/50">
                    <button
                      onClick={handlePrevStep}
                      className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors font-medium text-sm"
                    >
                      <FaArrowLeft /> {currentStep === 0 ? "Change Course" : "Back"}
                    </button>

                    {currentStep < selectedCourse.flow.length && (
                      <button
                        onClick={handleNextStep}
                        disabled={!isCurrentStepValid()}
                        className="px-6 py-2 bg-slate-100 text-slate-900 font-bold rounded-lg disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white transition-colors"
                      >
                        Next
                      </button>
                    )}
                  </div>
                )}
                
              </div>
            </motion.div>

          )}
        </AnimatePresence>

        </>
        )}

      </div>
    </div>
  );
}

export default function CourseSelection() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#0f172a] text-white">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-lg text-slate-400"
          >
            Loading...
          </motion.p>
        </div>
      }
    >
      <CourseSelectionContent />
    </Suspense>
  );
}
