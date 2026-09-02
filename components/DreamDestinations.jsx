"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const destinations = [
  { name: "Canada", tagline: "Study in Canada", image: "/canada.png" },
  { name: "UK", tagline: "Study in UK", image: "/uk.image.png" },
  { name: "Germany", tagline: "Study in Germany", image: "/germany.png" },
  { name: "Australia", tagline: "Study in Australia", image: "/australia.png" },
  { name: "USA", tagline: "Study in USA", image: "/usa.png" },
  { name: "France", tagline: "Study in France", image: "/franceimage.png" },
];

// Coordinated animation variants — same easing/timing style used across the home page
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 50, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function DreamDestinations() {
  return (
    // NOTE: background is set explicitly to match globals.css's --background
    // value (#020617) so every section is guaranteed the exact same color,
    // instead of relying on transparency/inheritance which was inconsistent.
    <section className="relative py-20 px-6 md:px-12 overflow-hidden bg-[#020617]">
      <div className="max-w-7xl mx-auto">
        {/* Top row: text + video */}
        <div className="grid md:grid-cols-2 gap-10 items-center mb-12">
          {/* Left: heading */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={container}
          >
            <motion.div
              className="flex items-center gap-2 mb-4"
              variants={fadeUp}
              custom={0}
            >
              <motion.span
                className="w-2 h-2 rounded-full bg-purple-500 inline-block"
                animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="text-purple-400 text-sm font-semibold tracking-widest uppercase">
                Explore Top Destinations
              </span>
            </motion.div>

            <motion.h2
              className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6"
              variants={fadeUp}
              custom={1}
            >
              Where Will Your <br /> Dreams Take You?
            </motion.h2>

            <motion.p
              className="text-gray-300 text-lg mb-8 max-w-md"
              variants={fadeUp}
              custom={2}
            >
              Choose your dream destination and we&apos;ll guide you at every step.
            </motion.p>
          </motion.div>

          {/* Right: YouTube video, replacing the world map graphic */}
          <motion.div
            className="relative w-full aspect-video flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="absolute -inset-3 rounded-[1.8rem] bg-gradient-to-tr from-purple-500/30 via-blue-500/20 to-cyan-400/30 blur-2xl" />
            <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(168,85,247,0.25)]">
              <iframe
                className="absolute inset-0 w-full h-full scale-150"
                src="https://www.youtube.com/embed/31s-kuyS5eM?start=3&autoplay=1&mute=1&loop=1&playlist=31s-kuyS5eM&controls=0&modestbranding=1&playsinline=1&rel=0"
                title="Study Abroad Destinations"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </motion.div>
        </div>

        {/* Destination cards — compact, single line */}
        <motion.div
          className="grid grid-cols-3 sm:grid-cols-6 gap-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={container}
        >
          {destinations.map((dest) => (
            <motion.div
              key={dest.name}
              variants={cardVariant}
              whileHover={{ y: -4, transition: { duration: 0.3, ease: "easeOut" } }}
              className="relative rounded-xl overflow-hidden h-[90px] group cursor-pointer border border-white/10"
            >
              <Image
                src={dest.image}
                alt={dest.name}
                fill
                sizes="(max-width: 768px) 33vw, 16vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}