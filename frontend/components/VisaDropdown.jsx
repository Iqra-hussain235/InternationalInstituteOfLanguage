"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { 
  GraduationCap, 
  Plane, 
  Briefcase, 
  Users, 
  Heart, 
  Globe, 
  MapPin,
  ChevronRight
} from "lucide-react";

const visaTypes = [
  { name: "Study Visa",          icon: GraduationCap, key: "study", desc: "Study abroad programs" },
  { name: "Visitor Visa",        icon: Plane,         key: "visitor", desc: "Tourist & family visits" },
  { name: "Work Visa",           icon: Briefcase,     key: "work", desc: "Employment opportunities" },
  { name: "Dependent Visa",      icon: Users,         key: "dependent", desc: "Family reunification" },
  { name: "Spouse Visa",         icon: Heart,         key: "spouse", desc: "Partner migration" },
  { name: "Permanent Residency", icon: Globe,         key: "pr", desc: "Settle abroad permanently" },
  { name: "Tour Package",        icon: MapPin,        key: "packages", desc: "Curated travel experiences" },
];

export default function VisaDropdown({ onClose }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Small delay for smooth animation
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  // Close on click outside
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
    <div
      ref={dropdownRef}
      style={{
        position: "absolute",
        top: "calc(100% + 14px)",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 999,
        opacity: isVisible ? 1 : 0,
        translate: isVisible ? "0" : "0 -10px",
        transition: "opacity 0.25s ease, translate 0.25s ease",
      }}
    >
      {/* Arrow */}
      <div style={{
        position: "absolute",
        top: "-6px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "12px",
        height: "12px",
        background: "white",
        borderLeft: "1px solid #e2e8f0",
        borderTop: "1px solid #e2e8f0",
        transform: "translateX(-50%) rotate(45deg)",
        zIndex: 1,
      }} />

      <div style={{
        background: "white",
        borderRadius: "16px",
        boxShadow: "0 25px 60px rgba(0,0,0,0.15), 0 8px 20px rgba(0,0,0,0.08)",
        border: "1px solid #e2e8f0",
        overflow: "hidden",
        minWidth: "280px",
        maxWidth: "320px",
      }}>
        {/* Header */}
        <div style={{
          padding: "16px 20px 8px",
          borderBottom: "1px solid #f1f5f9",
        }}>
          <p style={{
            fontSize: "11px",
            fontWeight: 700,
            color: "#94a3b8",
            textTransform: "uppercase",
            letterSpacing: "0.14em",
            margin: 0,
          }}>
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
                  background: isActive ? "#f8fafc" : "transparent",
                  borderLeft: isActive ? "3px solid #0F4C81" : "3px solid transparent",
                  marginBottom: "2px",
                }}
              >
                {/* Icon Box */}
                <div style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  background: isActive ? "#0F4C81" : "#f1f5f9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  transition: "all 0.2s ease",
                }}>
                  <Icon 
                    size={18} 
                    color={isActive ? "white" : "#64748b"}
                    strokeWidth={2}
                  />
                </div>

                {/* Text */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "2px" }}>
                  <span style={{
                    fontSize: "14px",
                    fontWeight: 600,
                    color: isActive ? "#0F4C81" : "#1e293b",
                    transition: "color 0.2s ease",
                  }}>
                    {v.name}
                  </span>
                  <span style={{
                    fontSize: "12px",
                    color: "#94a3b8",
                    fontWeight: 400,
                  }}>
                    {v.desc}
                  </span>
                </div>

                {/* Arrow */}
                <ChevronRight 
                  size={16} 
                  color={isActive ? "#0F4C81" : "#cbd5e1"}
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
        <div style={{
          padding: "12px 20px",
          background: "#f8fafc",
          borderTop: "1px solid #f1f5f9",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "6px",
        }}>
          <Globe size={14} color="#94a3b8" />
          <span style={{
            fontSize: "12px",
            color: "#94a3b8",
            fontWeight: 500,
          }}>
            7 Visa Categories Available
          </span>
        </div>
      </div>
    </div>
  );
}