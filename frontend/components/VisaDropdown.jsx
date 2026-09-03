"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Plane,
  Briefcase,
  Users,
  Heart,
  Globe,
  MapPin,
  ChevronRight,
} from "lucide-react";

const visaTypes = [
  { name: "Study Visa", icon: GraduationCap, key: "study", desc: "Study abroad programs" },
  { name: "Visitor Visa", icon: Plane, key: "visitor", desc: "Tourist & family visits" },
  { name: "Work Visa", icon: Briefcase, key: "work", desc: "Employment opportunities" },
  { name: "Dependent Visa", icon: Users, key: "dependent", desc: "Family reunification" },
  { name: "Spouse Visa", icon: Heart, key: "spouse", desc: "Partner migration" },
  { name: "Permanent Residency", icon: Globe, key: "pr", desc: "Settle abroad permanently" },
  { name: "Tour Package", icon: MapPin, key: "packages", desc: "Curated travel experiences" },
];

export default function VisaDropdown({ onClose }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <motion.div
      ref={dropdownRef}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      style={{
        position: "absolute",
        top: "calc(100% + 14px)",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 999,
      }}
    >
      {/* Arrow */}
      <div
        style={{
          position: "absolute",
          top: "-6px",
          left: "50%",
          width: "12px",
          height: "12px",
          background: "#0F4C81",
          borderLeft: "1px solid rgba(255,255,255,0.1)",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          transform: "translateX(-50%) rotate(45deg)",
          zIndex: 1,
        }}
      />

      <div
        style={{
          background: "#0F4C81",
          borderRadius: "16px",
          boxShadow: "0 25px 60px rgba(0,0,0,0.5), 0 8px 20px rgba(0,0,0,0.3)",
          border: "1px solid rgba(255,255,255,0.1)",
          overflow: "hidden",
          minWidth: "280px",
          maxWidth: "320px",
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "16px 20px 8px",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <p
            style={{
              fontSize: "11px",
              fontWeight: 700,
              color: "rgba(255,255,255,0.5)",
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              margin: 0,
            }}
          >
            Visa Services
          </p>
        </div>

        {/* Visa Types List */}
        <div style={{ padding: "8px" }}>
          {visaTypes.map((v, index) => {
            const Icon = v.icon;
            const isActive = activeIndex === index;

            return (
              <Link
                key={v.key}
                href={`/visa/${v.key}`}
                onClick={onClose}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  padding: "12px 14px",
                  borderRadius: "12px",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                  background: isActive ? "rgba(255,255,255,0.08)" : "transparent",
                  borderLeft: isActive ? "3px solid #ff2f56" : "3px solid transparent",
                  marginBottom: "2px",
                }}
              >
                {/* Icon Box */}
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "10px",
                    background: isActive ? "#ff2f56" : "rgba(255,255,255,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    transition: "all 0.2s ease",
                  }}
                >
                  <Icon
                    size={18}
                    color={isActive ? "white" : "rgba(255,255,255,0.7)"}
                    strokeWidth={2}
                  />
                </div>

                {/* Text */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "2px" }}>
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: isActive ? "#ff9fae" : "white",
                      transition: "color 0.2s ease",
                    }}
                  >
                    {v.name}
                  </span>
                  <span
                    style={{
                      fontSize: "12px",
                      color: "rgba(255,255,255,0.5)",
                      fontWeight: 400,
                    }}
                  >
                    {v.desc}
                  </span>
                </div>

                {/* Arrow */}
                <ChevronRight
                  size={16}
                  color={isActive ? "#ff9fae" : "rgba(255,255,255,0.3)"}
                  style={{
                    transition: "all 0.2s ease",
                    transform: isActive ? "translateX(3px)" : "translateX(0)",
                  }}
                />
              </Link>
            );
          })}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: "12px 20px",
            background: "rgba(0,0,0,0.2)",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
          }}
        >
          <Globe size={14} color="rgba(255,255,255,0.5)" />
          <span
            style={{
              fontSize: "12px",
              color: "rgba(255,255,255,0.5)",
              fontWeight: 500,
            }}
          >
            7 Visa Categories Available
          </span>
        </div>
      </div>
    </motion.div>
  );
}