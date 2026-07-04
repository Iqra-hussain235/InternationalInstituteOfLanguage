"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FaGraduationCap, FaLaptop, FaPassport } from "react-icons/fa";
import { ServiceDetailPanel } from "@/components/ServicesAccordion";

const ICONS = {
  graduation: FaGraduationCap,
  laptop: FaLaptop,
  passport: FaPassport,
};

const containerVariant = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

export default function ServiceCategoryCards({
  categories,
  selectedId,
  onSelect,
  animateOnView = true,
}) {
  const motionProps = animateOnView
    ? {
        variants: containerVariant,
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, margin: "-80px" },
      }
    : {
        variants: containerVariant,
        initial: "hidden",
        animate: "visible",
      };

  const selectedCategory = categories.find((c) => c.id === selectedId);

  return (
    <div className="space-y-6 sm:space-y-8">
      <motion.div
        {...motionProps}
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
      >
        {categories.map((category) => {
          const Icon = ICONS[category.icon] || FaGraduationCap;
          const isSelected = selectedId === category.id;

          return (
            <motion.button
              key={category.id}
              type="button"
              layout
              variants={cardVariant}
              whileHover={!isSelected ? { y: -8, scale: 1.02 } : {}}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(isSelected ? null : category.id)}
              aria-expanded={isSelected}
              className={`group relative flex w-full flex-col overflow-hidden rounded-3xl text-left transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0f1c] ${
                isSelected
                  ? "ring-2 ring-white/40 shadow-[0_24px_70px_-12px_var(--card-glow)] lg:col-span-1"
                  : "ring-1 ring-white/10 hover:ring-white/20 shadow-[0_12px_40px_-16px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_50px_-12px_var(--card-glow)]"
              }`}
              style={{ "--card-glow": category.glow }}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${category.gradient} transition-opacity duration-500 ${
                  isSelected ? "opacity-100" : "opacity-90 group-hover:opacity-100"
                }`}
              />
              <div className={`absolute inset-0 backdrop-blur-[2px] transition-colors duration-500 ${isSelected ? "bg-[#0a0f1c]/30" : "bg-[#0a0f1c]/40"}`} />

              <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-white/10 blur-2xl transition-transform duration-700 group-hover:scale-125" />
              <div className="absolute -bottom-8 -left-4 h-24 w-24 rounded-full bg-white/5 blur-xl" />

              <div className={`relative z-10 flex flex-col p-6 sm:p-7 transition-all duration-500 ${isSelected ? "min-h-[200px]" : "min-h-[220px] sm:min-h-[240px]"}`}>
                <div
                  className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/10 shadow-lg backdrop-blur-md transition-all duration-500 group-hover:scale-110"
                  style={{ boxShadow: `0 8px 32px -8px ${category.glow}` }}
                >
                  <Icon className="h-6 w-6 text-white" />
                </div>

                <h3 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                  {category.title}
                </h3>
                <p className="mt-2 flex-grow text-sm leading-relaxed text-slate-300/90 sm:text-[15px]">
                  {category.shortDesc}
                </p>

                <div className="mt-5 flex items-center justify-between">
                  <span
                    className="text-xs font-semibold uppercase tracking-widest"
                    style={{ color: category.accent }}
                  >
                    {isSelected ? "Expanded" : "Click to explore"}
                  </span>
                  <motion.span
                    animate={{ rotate: isSelected ? 180 : 0 }}
                    transition={{ duration: 0.35 }}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </motion.span>
                </div>
              </div>

              <div
                className="absolute bottom-0 left-0 right-0 h-1 transition-opacity"
                style={{
                  opacity: isSelected ? 1 : 0.6,
                  background: `linear-gradient(90deg, transparent, ${category.accent}, transparent)`,
                }}
              />
            </motion.button>
          );
        })}
      </motion.div>

      {/* Inline expanded panel below cards */}
      <AnimatePresence mode="wait">
        {selectedCategory && (
          <motion.div
            key={selectedCategory.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.4 }}
          >
            <ServiceDetailPanel category={selectedCategory} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
