"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaGraduationCap, FaChalkboardTeacher, FaCheckSquare, FaGlobe } from "react-icons/fa";

export default function Academy() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-sans overflow-hidden">
      
      {/* 🔥 HERO SECTION */}
      <div className="relative py-24 px-6 text-center flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-b from-[#1e293b] to-[#0f172a]">
        <div className="absolute top-[-20%] left-1/4 w-[500px] h-[500px] bg-red-600 rounded-full blur-[200px] opacity-20 pointer-events-none"></div>
        <div className="absolute top-[-10%] right-1/4 w-[400px] h-[400px] bg-blue-600 rounded-full blur-[150px] opacity-20 pointer-events-none"></div>
        
        <motion.div
           initial={{ opacity: 0, scale: 0.8 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="relative z-10"
        >
          <div className="mb-6 inline-flex p-4 rounded-full bg-slate-800 border border-slate-700 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
            <FaGraduationCap className="text-5xl text-red-500" />
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-400">
            Shape Your Future
          </h1>
          <p className="mt-6 text-xl text-slate-300 max-w-2xl mx-auto">
            Learn languages, prepare for critical exams, and build your professional career with our elite academy programs.
          </p>

          <Link href="/academy/course">
            <motion.div 
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               className="inline-block mt-10 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-orange-500 px-8 py-4 rounded-full text-white font-bold text-lg shadow-[0_0_20px_rgba(239,68,68,0.5)] transition-all"
            >
              Explore Academy Courses
            </motion.div>
          </Link>
        </motion.div>
      </div>

      {/* 📚 COURSE CATEGORIES */}
      <div className="px-6 py-20 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400 mb-12">
          Academic Tracks
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          
          <motion.div 
            whileHover={{ y: -10 }}
            className="p-8 bg-slate-800 border border-slate-700 rounded-2xl shadow-lg hover:shadow-[0_10px_30px_rgba(239,68,68,0.15)] transition-all"
          >
            <div className="bg-slate-900 w-14 h-14 rounded-full flex items-center justify-center mb-6">
              <FaGlobe className="text-2xl text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Language Mastery</h3>
            <p className="text-slate-400">English, German, and French courses crafted for fluency and cultural understanding.</p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -10 }}
            className="p-8 bg-slate-800 border border-slate-700 rounded-2xl shadow-lg hover:shadow-[0_10px_30px_rgba(59,130,246,0.15)] transition-all"
          >
             <div className="bg-slate-900 w-14 h-14 rounded-full flex items-center justify-center mb-6">
              <FaCheckSquare className="text-2xl text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Exam Preparation</h3>
            <p className="text-slate-400">Rigorous training for international certifications: IELTS, PTE, OET, and more.</p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -10 }}
            className="p-8 bg-slate-800 border border-slate-700 rounded-2xl shadow-lg hover:shadow-[0_10px_30px_rgba(245,158,11,0.15)] transition-all"
          >
            <div className="bg-slate-900 w-14 h-14 rounded-full flex items-center justify-center mb-6">
              <FaChalkboardTeacher className="text-2xl text-amber-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Skill Development</h3>
            <p className="text-slate-400">Communication, interview preparation, and corporate readiness programs.</p>
          </motion.div>

        </div>
      </div>

    </div>
  );
}