"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaUserTie,
  FaGlobeAmericas,
  FaPassport,
  FaBookOpen,
  FaUsers,
  FaHeadset,
} from "react-icons/fa";

const reasons = [
  {
    icon: FaUserTie,
    title: "Expert Guidance",
    desc: "Personalized support from experienced counselors.",
    color: "text-blue-400",
  },
  {
    icon: FaGlobeAmericas,
    title: "Global Destinations",
    desc: "Multiple countries, endless opportunities.",
    color: "text-purple-400",
  },
  {
    icon: FaPassport,
    title: "Visa Assistance",
    desc: "End-to-end visa support and guidance.",
    color: "text-red-400",
  },
  {
    icon: FaBookOpen,
    title: "Language Training",
    desc: "Learn from certified trainers with modern methods.",
    color: "text-yellow-400",
  },
  {
    icon: FaUsers,
    title: "High Success Rate",
    desc: "Proven track record with 95% visa success rate.",
    color: "text-emerald-400",
  },
  {
    icon: FaHeadset,
    title: "24/7 Support",
    desc: "We are always here to assist you at every step.",
    color: "text-cyan-400",
  },
];

export default function WhyChooseUs() {
  return (
    // NOTE: background is set explicitly to match globals.css's --background
    // value (#020617) so every section is guaranteed the exact same color,
    // instead of relying on transparency/inheritance which was inconsistent.
    <section className="relative overflow-hidden bg-[#020617] py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-[10%] top-[10%] h-[30%] w-[30%] rounded-full bg-blue-600/10 blur-[100px]" />
        <div className="absolute bottom-[5%] right-[10%] h-[30%] w-[30%] rounded-full bg-[#ff2f56]/5 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
            • Why Choose Us? •
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 lg:gap-5">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -6, scale: 1.03 }}
                className="flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/5">
                  <Icon className={`h-6 w-6 ${reason.color}`} />
                </div>
                <h3 className="mb-2 text-sm font-bold text-white sm:text-base">
                  {reason.title}
                </h3>
                <p className="text-xs leading-relaxed text-slate-400 sm:text-sm">
                  {reason.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}