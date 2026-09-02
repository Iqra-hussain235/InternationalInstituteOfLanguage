"use client";

import { motion } from "framer-motion";
import { FaStar, FaGoogle, FaHeart } from "react-icons/fa";

const reviews = [
  {
    name: "Mohammad Anas",
    initial: "M",
    color: "from-blue-500 to-indigo-600",
    time: "5 months ago",
    text: "The best IELTS coaching in all over Moradabad for serious students. The trainers provide excellent guidance for listening, reading, writing and speaking. The study material and personal attention helped me improve my band score and confidence. Thank you IILSTUDYABROAD.",
  },
  {
    name: "Anonymous",
    initial: "A",
    color: "from-purple-500 to-pink-600",
    time: "3 months ago",
    text: "I am really thankful to this institute for helping me improve my English and confidence. Maaz Sir's PTE classes are very structured and easy to understand. Bushra Ma'am is very supportive and teaches in a simple, practical way.",
  },
  {
    name: "Kaif Khan",
    initial: "K",
    color: "from-emerald-500 to-teal-600",
    time: "6 months ago",
    text: "I had an amazing experience at IIL Moradabad — truly the best IELTS institute here. The trainers are highly professional and focus on each student individually. The infrastructure is modern and the environment is very positive.",
  },
  {
    name: "Mohd Ali Saifi",
    initial: "M",
    color: "from-amber-500 to-orange-600",
    time: "8 months ago",
    text: "Best study abroad consultancy in Moradabad. Best English language institute in Moradabad.",
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function GoogleReviews() {
  return (
    <section className="relative overflow-hidden bg-[#020617] py-20 sm:py-24">
      {/* Ambient glows */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <motion.div
          className="absolute left-[8%] top-[15%] h-[28%] w-[28%] rounded-full bg-blue-500/10 blur-[110px]"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[10%] right-[8%] h-[28%] w-[28%] rounded-full bg-amber-500/10 blur-[110px]"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-10 max-w-2xl text-center"
        >
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
            • Trusted By Our Students •
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            What Google Says About Us
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Real reviews from real students, verified on Google.
          </p>
        </motion.div>

        {/* Rating badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-14 flex w-fit items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 backdrop-blur-sm shadow-[0_0_40px_rgba(59,130,246,0.15)]"
        >
          <FaGoogle className="h-8 w-8 text-white" />
          <div className="h-10 w-px bg-white/15" />
          <div className="flex items-center gap-2">
            <span className="text-3xl font-extrabold text-white">4.8</span>
            <div className="flex flex-col">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="h-3.5 w-3.5 text-yellow-400" />
                ))}
              </div>
              <span className="text-xs text-slate-400 mt-0.5">327 Google Reviews</span>
            </div>
          </div>
        </motion.div>

        {/* Review cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={container}
        >
          {reviews.map((review) => (
            <motion.div
              key={review.name}
              variants={cardVariant}
              whileHover={{ y: -8, transition: { duration: 0.3, ease: "easeOut" } }}
              className="group relative flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10"
            >
              {/* Glow on hover */}
              <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-blue-500/0 via-transparent to-purple-500/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:from-blue-500/10 group-hover:to-purple-500/10" />

              <div className="relative z-10 flex items-center gap-3 mb-4">
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${review.color} text-white font-bold text-lg shadow-lg`}
                >
                  {review.initial}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{review.name}</p>
                  <p className="text-slate-500 text-xs">{review.time}</p>
                </div>
                <FaGoogle className="ml-auto h-4 w-4 text-slate-500" />
              </div>

              <div className="relative z-10 flex gap-0.5 mb-3">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="h-3.5 w-3.5 text-yellow-400" />
                ))}
              </div>

              <p className="relative z-10 text-slate-300 text-sm leading-relaxed line-clamp-6">
                {review.text}
              </p>

              <div className="relative z-10 mt-4 flex items-center gap-1.5 text-slate-500">
                <FaHeart className="h-3 w-3 text-pink-500" />
                <span className="text-xs">Verified Google Review</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <a
            href="https://www.google.com/search?q=iil+moradabad"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10 hover:border-white/25"
          >
            <FaGoogle className="h-4 w-4" />
            See All Reviews on Google
          </a>
        </motion.div>
      </div>
    </section>
  );
}