"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import {
  Trash2, Download, RefreshCw, Users, FileSpreadsheet,
  AlertTriangle, CheckCircle, X, Search, Filter,
  LayoutDashboard, Mail, Phone, Globe, Calendar,
  BarChart3, Settings, ChevronDown, Bell, Moon, Sun,
  Eye, Edit3, MoreHorizontal, TrendingUp, TrendingDown,
  GraduationCap, Briefcase, Heart, Plane, Menu,
  ChevronLeft, ChevronRight, XCircle, Clock,
  MessageSquare, MapPin, ArrowUpRight, ArrowDownRight,
  Sparkles, Layers, PieChart, Activity, Home,
  Inbox, Archive, FileText, User, Shield,
  ChevronRight as ChevronRightIcon, Plane as PlaneIcon,
  Globe as GlobeIcon, Zap, Award, BookOpen, Compass,
  Star, Target, Cpu, Rocket, Diamond, Crown
} from "lucide-react";

export default function AdminDashboard() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterVisaType, setFilterVisaType] = useState("all");
  const [stats, setStats] = useState({ total: 0, new: 0, contacted: 0, closed: 0 });
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [dateRange, setDateRange] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [sortField, setSortField] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [refreshing, setRefreshing] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // 3D Animation states
  const [planePos, setPlanePos] = useState(0);
  const [globeRotation, setGlobeRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlanePos((prev) => (prev + 1) % 360);
      setGlobeRotation((prev) => (prev + 2) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Demo data generator (so the preview has something to show).
  // In your real app this stays as the fetch() call to /api/enquiry.
  const generateDemoData = () => {
    const names = ["Aarav Sharma", "Priya Patel", "Rohan Mehta", "Sneha Iyer", "Vikram Singh", "Ananya Gupta", "Karan Malhotra", "Divya Reddy"];
    const countries = ["USA", "UK", "Canada", "Australia", "Germany", "New Zealand", "UAE", "Singapore"];
    const visaTypes = ["Spouse Visa", "Student Visa", "Work Visa", "Visitor Visa", "PR Visa", "Study Visa"];
    const statuses = ["New", "Contacted", "Closed"];
    const purposes = ["Higher studies", "Job offer", "Family reunion", "Tourism", "Permanent residency", "Business visit"];
    return Array.from({ length: 27 }, (_, i) => ({
      id: i + 1,
      name: names[i % names.length],
      email: `${names[i % names.length].toLowerCase().replace(" ", ".")}@example.com`,
      phone: `+91 9${String(800000000 + i * 1234).slice(0, 9)}`,
      country: countries[i % countries.length],
      visaType: visaTypes[i % visaTypes.length],
      purpose: purposes[i % purposes.length],
      status: statuses[i % statuses.length],
      message: "Looking forward to your guidance on the next steps for my application.",
      date: new Date(Date.now() - i * 1000 * 60 * 60 * 11).toISOString(),
    }));
  };

  const fetchEnquiries = useCallback(async () => {
    setRefreshing(true);
    try {
      const res = await fetch("/api/enquiry");
      const data = await res.json();
      const list = data.enquiries || [];
      setEnquiries(list);
      setStats({
        total: list.length,
        new: list.filter((e) => e.status === "New").length,
        contacted: list.filter((e) => e.status === "Contacted").length,
        closed: list.filter((e) => e.status === "Closed").length,
      });
    } catch (error) {
      console.error("Error fetching, falling back to demo data:", error);
      // Preview-only fallback so the dashboard isn't empty when there's no backend.
      const list = generateDemoData();
      setEnquiries(list);
      setStats({
        total: list.length,
        new: list.filter((e) => e.status === "New").length,
        contacted: list.filter((e) => e.status === "Contacted").length,
        closed: list.filter((e) => e.status === "Closed").length,
      });
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEnquiries();
    const interval = setInterval(fetchEnquiries, 30000);
    return () => clearInterval(interval);
  }, [fetchEnquiries]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        document.getElementById("search-input")?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const exportToExcel = async () => {
    try {
      const res = await fetch("/api/enquiry?format=xlsx");
      if (!res.ok) {
        const err = await res.json();
        alert(err.message || "Export failed");
        return;
      }
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `IIL_Enquiries_${new Date().toISOString().split("T")[0]}.xlsx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Export error:", error);
      alert("Failed to export Excel");
    }
  };

  const deleteAll = async () => {
    if (deleteConfirm !== "DELETE") {
      alert('Please type "DELETE" to confirm');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/enquiry?confirm=true", { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        alert(`Success: ${data.message}`);
        setEnquiries([]);
        setStats({ total: 0, new: 0, contacted: 0, closed: 0 });
        setShowDeleteModal(false);
        setDeleteConfirm("");
      } else {
        alert(data.message || "Delete failed");
      }
    } catch (error) {
      console.error("Delete error:", error);
      // Preview-only fallback (no backend available in this environment).
      setEnquiries([]);
      setStats({ total: 0, new: 0, contacted: 0, closed: 0 });
      setShowDeleteModal(false);
      setDeleteConfirm("");
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  // Real-time search/filter/sort with useMemo
  const filtered = useMemo(() => {
    let result = [...enquiries];

    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase().trim();
      result = result.filter((e) =>
        (e.name && e.name.toLowerCase().includes(term)) ||
        (e.email && e.email.toLowerCase().includes(term)) ||
        (e.phone && e.phone.includes(term)) ||
        (e.country && e.country.toLowerCase().includes(term)) ||
        (e.visaType && e.visaType.toLowerCase().includes(term)) ||
        (e.purpose && e.purpose.toLowerCase().includes(term)) ||
        (e.message && e.message.toLowerCase().includes(term))
      );
    }

    if (filterStatus !== "all") {
      result = result.filter((e) => e.status === filterStatus);
    }

    if (filterVisaType !== "all") {
      result = result.filter((e) => e.visaType === filterVisaType);
    }

    if (dateRange !== "all") {
      const now = new Date();
      const days = dateRange === "today" ? 1 : dateRange === "week" ? 7 : dateRange === "month" ? 30 : 365;
      const cutoff = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
      result = result.filter((e) => e.date && new Date(e.date) >= cutoff);
    }

    result.sort((a, b) => {
      let valA = a[sortField] || "";
      let valB = b[sortField] || "";
      if (sortField === "date") {
        valA = new Date(valA || 0).getTime();
        valB = new Date(valB || 0).getTime();
      } else {
        valA = String(valA).toLowerCase();
        valB = String(valB).toLowerCase();
      }
      if (sortOrder === "asc") {
        return valA > valB ? 1 : -1;
      } else {
        return valA < valB ? 1 : -1;
      }
    });

    return result;
  }, [enquiries, searchTerm, filterStatus, filterVisaType, dateRange, sortField, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const paginatedData = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const visaTypeStats = useMemo(() => {
    return enquiries.reduce((acc, e) => {
      const type = e.visaType || "Other";
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});
  }, [enquiries]);

  const visaTypeColors = {
    "Spouse Visa": "#3B82F6",
    "Student Visa": "#F59E0B",
    "Work Visa": "#10B981",
    "Visitor Visa": "#EF4444",
    "PR Visa": "#8B5CF6",
    "Study Visa": "#EC4899",
    "Other": "#6B7280"
  };

  const getCountryFlag = (country) => {
    const flags = {
      "USA": "🇺🇸", "United States": "🇺🇸",
      "UK": "🇬🇧", "United Kingdom": "🇬🇧", "Britain": "🇬🇧",
      "Canada": "🇨🇦", "Australia": "🇦🇺", "Thailand": "🇹🇭",
      "Dubai": "🇦🇪", "UAE": "🇦🇪", "Germany": "🇩🇪",
      "New Zealand": "🇳🇿", "France": "🇫🇷", "Italy": "🇮🇹",
      "Spain": "🇪🇸", "Ireland": "🇮🇪", "Finland": "🇫🇮",
      "Sweden": "🇸🇪", "Norway": "🇳🇴", "Denmark": "🇩🇰",
      "Netherlands": "🇳🇱", "Switzerland": "🇨🇭", "Austria": "🇦🇹",
      "Belgium": "🇧🇪", "Poland": "🇵🇱", "Czech Republic": "🇨🇿",
      "Hungary": "🇭🇺", "Portugal": "🇵🇹", "Greece": "🇬🇷",
      "Malta": "🇲🇹", "Cyprus": "🇨🇾", "Singapore": "🇸🇬",
      "Malaysia": "🇲🇾", "Japan": "🇯🇵", "South Korea": "🇰🇷",
      "China": "🇨🇳", "India": "🇮🇳"
    };
    return flags[country] || "🌍";
  };

  // Sidebar click handler - properly sets filters
  const handleSidebarClick = (id) => {
    setActiveTab(id);
    setCurrentPage(1);

    if (id === "new") {
      setFilterStatus("New");
      setFilterVisaType("all");
    } else if (id === "contacted") {
      setFilterStatus("Contacted");
      setFilterVisaType("all");
    } else if (id === "closed") {
      setFilterStatus("Closed");
      setFilterVisaType("all");
    } else if (id === "dashboard") {
      setFilterStatus("all");
      setFilterVisaType("all");
      setSearchTerm("");
    } else if (id === "enquiries") {
      setFilterStatus("all");
      setFilterVisaType("all");
    } else if (id === "student") {
      setFilterVisaType("Student Visa");
      setFilterStatus("all");
    } else if (id === "work") {
      setFilterVisaType("Work Visa");
      setFilterStatus("all");
    } else if (id === "visitor") {
      setFilterVisaType("Visitor Visa");
      setFilterStatus("all");
    } else if (id === "spouse") {
      setFilterVisaType("Spouse Visa");
      setFilterStatus("all");
    } else if (id === "pr") {
      setFilterVisaType("PR Visa");
      setFilterStatus("all");
    } else {
      setFilterStatus("all");
      setFilterVisaType("all");
    }
  };

  const MiniChart = ({ color, data }) => (
    <svg viewBox="0 0 200 40" className="w-full h-10" preserveAspectRatio="none">
      <defs>
        <linearGradient id={`grad-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d={`M 0 ${40 - data[0]} ${data.map((d, i) => `L ${(i / (data.length - 1)) * 200} ${40 - d}`).join(" ")} L 200 40 L 0 40 Z`}
        fill={`url(#grad-${color})`}
      />
      <path
        d={`M 0 ${40 - data[0]} ${data.map((d, i) => `L ${(i / (data.length - 1)) * 200} ${40 - d}`).join(" ")}`}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {data.map((d, i) => (
        <circle key={i} cx={(i / (data.length - 1)) * 200} cy={40 - d} r="3" fill={color} />
      ))}
    </svg>
  );

  // 3D Rotating Globe Component
  const RotatingGlobe = () => (
    <div className="relative w-24 h-24" style={{ perspective: "800px" }}>
      <div
        className="w-full h-full rounded-full relative"
        style={{
          transform: `rotateY(${globeRotation}deg)`,
          transformStyle: "preserve-3d",
          background: "radial-gradient(circle at 30% 30%, #4facfe 0%, #00f2fe 40%, #0061ff 100%)",
          boxShadow: "inset -10px -10px 20px rgba(0,0,0,0.3), 0 0 30px rgba(79,172,254,0.4), 0 0 60px rgba(0,242,254,0.2)"
        }}
      >
        <div className="absolute inset-0 rounded-full border-2 border-white/20" style={{ transform: "rotateX(70deg)" }}></div>
        <div className="absolute inset-0 rounded-full border-2 border-white/20" style={{ transform: "rotateY(70deg)" }}></div>
        <div className="absolute inset-2 rounded-full border border-white/10" style={{ transform: "rotateX(45deg)" }}></div>
        <div className="absolute inset-2 rounded-full border border-white/10" style={{ transform: "rotateY(45deg)" }}></div>
        <div className="absolute top-4 left-6 w-4 h-3 bg-green-400/60 rounded-full"></div>
        <div className="absolute top-8 right-5 w-5 h-4 bg-green-400/60 rounded-full"></div>
        <div className="absolute bottom-6 left-8 w-3 h-3 bg-green-400/60 rounded-full"></div>
        <div className="absolute top-6 left-12 w-2 h-2 bg-green-400/60 rounded-full"></div>
        <div className="absolute top-2 left-4 w-6 h-6 bg-white/30 rounded-full blur-sm"></div>
      </div>
      <div
        className="absolute inset-[-8px] rounded-full border-2 border-dashed border-blue-400/30"
        style={{
          transform: `rotateX(75deg) rotateZ(${globeRotation * 0.5}deg)`,
          animation: "orbitSpin 8s linear infinite"
        }}
      ></div>
    </div>
  );

  // 3D Flying Plane Component
  const FlyingPlane = () => {
    const x = 50 + 40 * Math.cos((planePos * Math.PI) / 180);
    const y = 50 + 30 * Math.sin((planePos * Math.PI) / 180);
    const rotation = planePos + 90;

    return (
      <div className="relative w-32 h-24 overflow-hidden rounded-xl" style={{ perspective: "600px" }}>
        <div
          className="absolute transition-all duration-75"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            transform: `translate(-50%, -50%) rotateZ(${rotation}deg) rotateX(20deg)`,
            filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))"
          }}
        >
          <PlaneIcon className="w-6 h-6 text-white" style={{ filter: "drop-shadow(0 0 8px rgba(255,255,255,0.8))" }} />
        </div>
        <svg className="absolute inset-0 w-full h-full">
          <path
            d={`M ${50 + 40 * Math.cos(((planePos - 20) * Math.PI) / 180)}% ${50 + 30 * Math.sin(((planePos - 20) * Math.PI) / 180)}% 
                Q 50% 50% ${50 + 40 * Math.cos((planePos * Math.PI) / 180)}% ${50 + 30 * Math.sin((planePos * Math.PI) / 180)}%`}
            fill="none"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="2"
            strokeDasharray="4 4"
          />
        </svg>
        <div className="absolute top-2 left-4 w-8 h-3 bg-white/20 rounded-full blur-sm"></div>
        <div className="absolute bottom-3 right-6 w-10 h-4 bg-white/15 rounded-full blur-sm"></div>
        <div className="absolute top-8 right-2 w-6 h-2 bg-white/10 rounded-full blur-sm"></div>
      </div>
    );
  };

  // 3D Card with hover effect
  const Card3D = ({ children, className = "" }) => (
    <div className={`relative group ${className}`} style={{ perspective: "1000px" }}>
      <div
        className="relative transition-all duration-500"
        style={{ transformStyle: "preserve-3d", transform: "rotateX(0deg) rotateY(0deg)" }}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;
          e.currentTarget.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateZ(10px)`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "rotateY(0deg) rotateX(0deg) translateZ(0px)";
        }}
      >
        {children}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-[#f0f2f5]">
      <style jsx global>{`
        @keyframes modalSlideIn {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotateX(0deg); }
          50% { transform: translateY(-10px) rotateX(5deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59,130,246,0.3); }
          50% { box-shadow: 0 0 40px rgba(59,130,246,0.6), 0 0 60px rgba(59,130,246,0.2); }
        }
        @keyframes rotate3d {
          from { transform: rotateY(0deg); }
          to { transform: rotateY(360deg); }
        }
        @keyframes orbitSpin {
          from { transform: rotateX(75deg) rotateZ(0deg); }
          to { transform: rotateX(75deg) rotateZ(360deg); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes flyAcross {
          0% { transform: translateX(-100%) translateY(0) rotate(5deg); }
          25% { transform: translateX(-25%) translateY(-20px) rotate(-2deg); }
          50% { transform: translateX(50%) translateY(0) rotate(3deg); }
          75% { transform: translateX(125%) translateY(15px) rotate(-3deg); }
          100% { transform: translateX(200%) translateY(0) rotate(0deg); }
        }
        .shimmer-bg {
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%);
          background-size: 200% 100%;
          animation: shimmer 3s infinite;
        }
        .glass-3d {
          background: rgba(255,255,255,0.7);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.3);
          box-shadow: 0 8px 32px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.5);
        }
        .card-3d-hover {
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .card-3d-hover:hover {
          transform: translateY(-8px) rotateX(5deg) scale(1.02);
          box-shadow: 0 25px 50px rgba(0,0,0,0.15), 0 10px 20px rgba(0,0,0,0.1);
        }
        .sidebar-item-3d {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          transform-style: preserve-3d;
        }
        .sidebar-item-3d:hover {
          transform: translateX(5px) scale(1.02);
        }
        .sidebar-item-3d.active {
          transform: translateX(8px) scale(1.03);
          box-shadow: 0 4px 15px rgba(59,130,246,0.3);
        }
        .search-glow:focus {
          box-shadow: 0 0 0 3px rgba(59,130,246,0.2), 0 0 20px rgba(59,130,246,0.1);
        }
        .btn-3d {
          transition: all 0.2s;
          transform: translateZ(0);
        }
        .btn-3d:hover {
          transform: translateY(-2px) translateZ(10px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        }
        .btn-3d:active {
          transform: translateY(0) translateZ(0);
        }
        .stat-icon-3d {
          transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        .stat-icon-3d:hover {
          transform: rotateY(360deg) scale(1.1);
        }
        .table-row-3d {
          transition: all 0.3s;
        }
        .table-row-3d:hover {
          transform: scale(1.005) translateX(4px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          z-index: 10;
        }
      `}</style>

      {/* Sidebar */}
      <aside className="w-[260px] bg-[#1a1f2e] text-white flex-shrink-0 flex flex-col fixed h-full z-40" style={{ boxShadow: "4px 0 24px rgba(0,0,0,0.15)" }}>
        <div className="p-4">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-white/10 rounded-lg transition-colors btn-3d">
            <Menu className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="px-5 pb-4">
          <div className="flex items-center gap-3">
            <div className="relative w-11 h-11 shrink-0" style={{ perspective: "200px" }}>
              <div
                className="absolute inset-[-2px] bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl"
                style={{ animation: "rotate3d 8s linear infinite", transformStyle: "preserve-3d", boxShadow: "0 0 20px rgba(59,130,246,0.5)" }}
              ></div>
              <div className="absolute inset-[2px] bg-white rounded-xl flex items-center justify-center overflow-hidden">
                <img
                  src="/IIL-logo.png"
                  alt="International Institute of Languages & Study Abroad"
                  className="w-full h-full object-contain p-1"
                  onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
                />
                <div className="hidden absolute inset-0 items-center justify-center bg-[#1a1f2e]">
                  <GraduationCap className="w-5 h-5 text-blue-400" />
                </div>
              </div>
            </div>
            <div className="min-w-0">
              <h2 className="text-sm font-bold text-white leading-tight">International Institute</h2>
              <p className="text-[10px] text-gray-500">of Languages & Study Abroad</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 py-2 px-3 space-y-0.5 overflow-y-auto">
          <button
            onClick={() => handleSidebarClick("dashboard")}
            className={`sidebar-item-3d w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
              activeTab === "dashboard"
                ? "active bg-blue-600 text-white shadow-lg shadow-blue-900/50"
                : "text-gray-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-sm font-medium flex-1 text-left">Dashboard</span>
            <ChevronRightIcon className="w-4 h-4 opacity-60" />
          </button>

          <div className="px-3 pt-6 pb-2 text-[10px] font-semibold text-gray-600 uppercase tracking-wider">ENQUIRY MANAGEMENT</div>

          <button onClick={() => handleSidebarClick("enquiries")}
            className={`sidebar-item-3d w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
              activeTab === "enquiries" ? "active bg-white/10 text-white" : "text-gray-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            <Inbox className="w-5 h-5" />
            <span className="text-sm font-medium flex-1 text-left">All Enquiries</span>
            <span className="bg-gray-700 text-gray-300 text-[10px] px-2 py-0.5 rounded-full font-bold">{stats.total}</span>
          </button>

          <button onClick={() => handleSidebarClick("new")}
            className={`sidebar-item-3d w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
              activeTab === "new" ? "active bg-white/10 text-white" : "text-gray-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            <Phone className="w-5 h-5" />
            <span className="text-sm font-medium flex-1 text-left">New Enquiries</span>
            <span className="bg-blue-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">{stats.new}</span>
          </button>

          <button onClick={() => handleSidebarClick("contacted")}
            className={`sidebar-item-3d w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
              activeTab === "contacted" ? "active bg-white/10 text-white" : "text-gray-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            <CheckCircle className="w-5 h-5" />
            <span className="text-sm font-medium flex-1 text-left">Contacted</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${stats.contacted > 0 ? "bg-amber-500 text-white" : "bg-gray-700 text-gray-400"}`}>
              {stats.contacted}
            </span>
          </button>

          <button onClick={() => handleSidebarClick("closed")}
            className={`sidebar-item-3d w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
              activeTab === "closed" ? "active bg-white/10 text-white" : "text-gray-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            <Archive className="w-5 h-5" />
            <span className="text-sm font-medium flex-1 text-left">Closed</span>
            <span className="bg-gray-700 text-gray-300 text-[10px] px-2 py-0.5 rounded-full font-bold">{stats.closed}</span>
          </button>

          <div className="px-3 pt-6 pb-2 text-[10px] font-semibold text-gray-600 uppercase tracking-wider">VISA MANAGEMENT</div>

          <button onClick={() => handleSidebarClick("student")}
            className={`sidebar-item-3d w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
              activeTab === "student" ? "active bg-white/10 text-white" : "text-gray-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            <GraduationCap className="w-5 h-5" />
            <span className="text-sm font-medium flex-1 text-left">Student Visa</span>
          </button>

          <button onClick={() => handleSidebarClick("work")}
            className={`sidebar-item-3d w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
              activeTab === "work" ? "active bg-white/10 text-white" : "text-gray-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            <Briefcase className="w-5 h-5" />
            <span className="text-sm font-medium flex-1 text-left">Work Visa</span>
          </button>

          <button onClick={() => handleSidebarClick("visitor")}
            className={`sidebar-item-3d w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
              activeTab === "visitor" ? "active bg-white/10 text-white" : "text-gray-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            <Plane className="w-5 h-5" />
            <span className="text-sm font-medium flex-1 text-left">Visitor Visa</span>
          </button>

          <button onClick={() => handleSidebarClick("spouse")}
            className={`sidebar-item-3d w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
              activeTab === "spouse" ? "active bg-white/10 text-white" : "text-gray-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            <Heart className="w-5 h-5" />
            <span className="text-sm font-medium flex-1 text-left">Spouse Visa</span>
          </button>

          <button onClick={() => handleSidebarClick("pr")}
            className={`sidebar-item-3d w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
              activeTab === "pr" ? "active bg-white/10 text-white" : "text-gray-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            <Crown className="w-5 h-5" />
            <span className="text-sm font-medium flex-1 text-left">PR Visa</span>
          </button>

          <div className="px-3 pt-6 pb-2 text-[10px] font-semibold text-gray-600 uppercase tracking-wider">REPORTS & ANALYTICS</div>

          <button className="sidebar-item-3d w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-all duration-200">
            <BarChart3 className="w-5 h-5" />
            <span className="text-sm font-medium flex-1 text-left">Analytics</span>
          </button>

          <button className="sidebar-item-3d w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-all duration-200">
            <FileSpreadsheet className="w-5 h-5" />
            <span className="text-sm font-medium flex-1 text-left">Reports</span>
          </button>

          <button className="sidebar-item-3d w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-all duration-200">
            <Clock className="w-5 h-5" />
            <span className="text-sm font-medium flex-1 text-left">Export History</span>
          </button>

          <div className="px-3 pt-6 pb-2 text-[10px] font-semibold text-gray-600 uppercase tracking-wider">MASTER DATA</div>

          <button className="sidebar-item-3d w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-all duration-200">
            <User className="w-5 h-5" />
            <span className="text-sm font-medium flex-1 text-left">Users</span>
          </button>

          <button className="sidebar-item-3d w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-all duration-200">
            <Settings className="w-5 h-5" />
            <span className="text-sm font-medium flex-1 text-left">Settings</span>
          </button>
        </nav>

        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold stat-icon-3d">
              A
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">Admin</p>
              <p className="text-[10px] text-gray-500">Super Admin</p>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </div>
          <div className="flex items-center gap-3 px-3 py-2">
            <Moon className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-400">Dark Mode</span>
            <button onClick={() => setDarkMode(!darkMode)} className={`ml-auto w-10 h-5 rounded-full transition-all duration-300 relative ${darkMode ? "bg-blue-600" : "bg-gray-700"}`}>
              <div className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-all duration-300 ${darkMode ? "left-5" : "left-0.5"}`}></div>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen ml-[260px]">
        <header className="relative bg-gradient-to-r from-[#1e3a5f] via-[#2d1b69] to-[#4a1d6a] text-white px-6 py-3 flex items-center justify-between sticky top-0 z-30 overflow-hidden" style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.2)" }}>
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-2 left-[10%] w-1 h-1 bg-white/30 rounded-full" style={{ animation: "float 4s ease-in-out infinite" }}></div>
            <div className="absolute top-6 left-[30%] w-1.5 h-1.5 bg-white/20 rounded-full" style={{ animation: "float 5s ease-in-out infinite 1s" }}></div>
            <div className="absolute top-3 left-[60%] w-1 h-1 bg-white/25 rounded-full" style={{ animation: "float 3.5s ease-in-out infinite 0.5s" }}></div>
            <div className="absolute top-5 left-[80%] w-0.5 h-0.5 bg-white/20 rounded-full" style={{ animation: "float 6s ease-in-out infinite 2s" }}></div>
            <div className="absolute top-1 left-[45%] w-1 h-1 bg-white/15 rounded-full" style={{ animation: "float 4.5s ease-in-out infinite 1.5s" }}></div>
          </div>

          <div className="flex items-center gap-4 flex-1 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm overflow-hidden" style={{ boxShadow: "0 0 20px rgba(255,255,255,0.1)" }}>
                <img
                  src="/IIL-logo.png"
                  alt="International Institute of Languages & Study Abroad"
                  className="w-full h-full object-contain p-1"
                  onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
                />
                <div className="hidden items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-lg font-bold">International Institute of Languages</h1>
                <p className="text-xs text-white/60">& Study Abroad — Enquiry Management</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 relative z-10">
            <div className="hidden lg:block">
              <RotatingGlobe />
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
              <input
                id="search-input"
                type="text"
                placeholder="Search enquiries, name, email, phone..."
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                className="w-80 pl-10 pr-16 py-2 rounded-xl text-sm bg-white/10 border border-white/20 text-white placeholder-white/40 outline-none focus:bg-white/20 transition-all search-glow"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] px-2 py-1 rounded bg-white/20 text-white/70 font-mono">Ctrl K</span>
            </div>

            <button className="relative p-2.5 hover:bg-white/10 rounded-xl transition-all btn-3d">
              <Bell className="w-5 h-5 text-white/80" />
              {stats.new > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold" style={{ animation: "pulse-glow 2s infinite" }}>{stats.new > 9 ? "9+" : stats.new}</span>
              )}
            </button>

            <div className="flex items-center gap-2.5 pl-4 border-l border-white/20">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold stat-icon-3d">
                N
              </div>
              <div>
                <p className="text-sm font-medium">Admin</p>
                <p className="text-[10px] text-white/60">Super Admin</p>
              </div>
              <ChevronDown className="w-4 h-4 text-white/60" />
            </div>
          </div>
        </header>

        <main className="flex-1 p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
            <Card3D>
              <div className="bg-white rounded-2xl p-5 border border-gray-100 card-3d-hover" style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)" }}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-sm font-semibold text-blue-600 mb-1">Total Enquiries</p>
                    <p className="text-4xl font-bold text-gray-900">{stats.total}</p>
                    <p className="text-xs text-gray-400 mt-1">All time enquiries</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center stat-icon-3d" style={{ boxShadow: "0 4px 12px rgba(59,130,246,0.15)" }}>
                    <Users className="w-6 h-6 text-blue-500" />
                  </div>
                </div>
                <MiniChart color="#3B82F6" data={[15, 25, 20, 30, 25, 35, 30, 38]} />
              </div>
            </Card3D>

            <Card3D>
              <div className="bg-white rounded-2xl p-5 border border-gray-100 card-3d-hover" style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)" }}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-sm font-semibold text-green-600 mb-1">New Enquiries</p>
                    <p className="text-4xl font-bold text-gray-900">{stats.new}</p>
                    <p className="text-xs text-gray-400 mt-1">Awaiting response</p>
                  </div>
                  <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center stat-icon-3d" style={{ boxShadow: "0 4px 12px rgba(34,197,94,0.15)" }}>
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  </div>
                </div>
                <MiniChart color="#22C55E" data={[10, 20, 15, 25, 20, 30, 25, 32]} />
              </div>
            </Card3D>

            <Card3D>
              <div className="bg-white rounded-2xl p-5 border border-gray-100 card-3d-hover" style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)" }}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-sm font-semibold text-amber-600 mb-1">Contacted</p>
                    <p className="text-4xl font-bold text-gray-900">{stats.contacted}</p>
                    <p className="text-xs text-gray-400 mt-1">Already contacted</p>
                  </div>
                  <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center stat-icon-3d" style={{ boxShadow: "0 4px 12px rgba(245,158,11,0.15)" }}>
                    <Phone className="w-6 h-6 text-amber-500" />
                  </div>
                </div>
                <MiniChart color="#F59E0B" data={[5, 10, 8, 12, 10, 15, 12, 15]} />
              </div>
            </Card3D>

            <Card3D>
              <div className="bg-white rounded-2xl p-5 border border-gray-100 card-3d-hover" style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)" }}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-sm font-semibold text-purple-600 mb-1">Conversion Rate</p>
                    <p className="text-4xl font-bold text-gray-900">{stats.total > 0 ? Math.round((stats.contacted / stats.total) * 100) : 0}%</p>
                    <p className="text-xs text-gray-400 mt-1">From contacted</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center stat-icon-3d" style={{ boxShadow: "0 4px 12px rgba(139,92,246,0.15)" }}>
                    <TrendingUp className="w-6 h-6 text-purple-500" />
                  </div>
                </div>
                <MiniChart color="#8B5CF6" data={[8, 15, 12, 18, 15, 22, 18, 25]} />
              </div>
            </Card3D>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
            <Card3D className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-6 border border-gray-100 card-3d-hover" style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-blue-500" />
                    <h3 className="font-semibold text-gray-900">Enquiry Overview</h3>
                  </div>
                  <select className="text-sm px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-gray-700 outline-none">
                    <option>This Week</option>
                    <option>This Month</option>
                    <option>This Year</option>
                  </select>
                </div>
                <div className="flex items-center gap-6 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-500">New Enquiries</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-500">Contacted</span>
                  </div>
                </div>
                <div className="h-56 relative">
                  <svg viewBox="0 0 600 200" className="w-full h-full" preserveAspectRatio="none">
                    {[0, 50, 100, 150, 200].map((y) => (
                      <line key={y} x1="0" y1={y} x2="600" y2={y} stroke="#f0f0f0" strokeWidth="1" />
                    ))}
                    <text x="5" y="15" className="text-[10px] fill-gray-400">40</text>
                    <text x="5" y="65" className="text-[10px] fill-gray-400">30</text>
                    <text x="5" y="115" className="text-[10px] fill-gray-400">20</text>
                    <text x="5" y="165" className="text-[10px] fill-gray-400">10</text>
                    <text x="5" y="195" className="text-[10px] fill-gray-400">0</text>

                    <path d="M 50 180 L 140 140 L 230 165 L 320 160 L 410 155 L 500 80 L 590 50" fill="none" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M 50 180 L 140 140 L 230 165 L 320 160 L 410 155 L 500 80 L 590 50 L 590 200 L 50 200 Z" fill="url(#blueGrad)" opacity="0.1" />
                    <defs>
                      <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3B82F6" />
                        <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    {[[50, 180], [140, 140], [230, 165], [320, 160], [410, 155], [500, 80], [590, 50]].map(([x, y], i) => (
                      <circle key={i} cx={x} cy={y} r="5" fill="#3B82F6" stroke="white" strokeWidth="2" />
                    ))}

                    <path d="M 50 195 L 140 192 L 230 194 L 320 193 L 410 192 L 500 190 L 590 188" fill="none" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    {[[50, 195], [140, 192], [230, 194], [320, 193], [410, 192], [500, 190], [590, 188]].map(([x, y], i) => (
                      <circle key={i} cx={x} cy={y} r="5" fill="#22C55E" stroke="white" strokeWidth="2" />
                    ))}

                    {["21 Jun", "22 Jun", "23 Jun", "24 Jun", "25 Jun", "26 Jun", "27 Jun"].map((label, i) => (
                      <text key={i} x={50 + i * 90} y="220" textAnchor="middle" className="text-[10px] fill-gray-400">{label}</text>
                    ))}
                  </svg>
                </div>
              </div>
            </Card3D>

            <Card3D>
              <div className="bg-white rounded-2xl p-6 border border-gray-100 card-3d-hover" style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <PieChart className="w-5 h-5 text-blue-500" />
                    <h3 className="font-semibold text-gray-900">Enquiries by Visa Type</h3>
                  </div>
                  <button className="text-sm text-blue-500 hover:text-blue-600 font-medium btn-3d">View All</button>
                </div>

                <div className="flex items-center justify-center mb-6">
                  <div className="relative w-40 h-40" style={{ perspective: "400px" }}>
                    <svg viewBox="0 0 100 100" className="w-full h-full" style={{ filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.15))", transform: "rotateX(20deg)" }}>
                      <ellipse cx="50" cy="55" rx="35" ry="30" fill="rgba(0,0,0,0.1)" />
                      {Object.entries(visaTypeStats).length > 0 ? (
                        (() => {
                          let currentAngle = 0;
                          const total = Object.values(visaTypeStats).reduce((a, b) => a + b, 0);
                          return Object.entries(visaTypeStats).map(([type, count]) => {
                            const percentage = (count / total) * 100;
                            const angle = (percentage / 100) * 360;
                            const color = visaTypeColors[type] || "#6B7280";
                            const startAngle = currentAngle;
                            currentAngle += angle;
                            const endAngle = currentAngle;
                            const x1 = 50 + 32 * Math.cos((startAngle * Math.PI) / 180);
                            const y1 = 50 + 28 * Math.sin((startAngle * Math.PI) / 180);
                            const x2 = 50 + 32 * Math.cos((endAngle * Math.PI) / 180);
                            const y2 = 50 + 28 * Math.sin((endAngle * Math.PI) / 180);
                            const largeArc = angle > 180 ? 1 : 0;
                            return (
                              <path key={type} d={`M 50 50 L ${x1} ${y1} A 32 28 0 ${largeArc} 1 ${x2} ${y2} Z`}
                                fill={color} stroke="white" strokeWidth="3" className="transition-all duration-300 hover:opacity-80 cursor-pointer" />
                            );
                          });
                        })()
                      ) : (<circle cx="50" cy="50" r="32" fill="#E5E7EB" />)}
                      <circle cx="50" cy="50" r="20" fill="white" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-bold text-gray-900">{stats.total}</span>
                      <span className="text-[10px] text-gray-400">Total</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  {Object.entries(visaTypeStats).length > 0 ? (
                    Object.entries(visaTypeStats).map(([type, count]) => {
                      const total = Object.values(visaTypeStats).reduce((a, b) => a + b, 0);
                      const percentage = ((count / total) * 100).toFixed(1);
                      return (
                        <div key={type} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: visaTypeColors[type] || "#6B7280" }}></div>
                            <span className="text-sm text-gray-600">{type}</span>
                          </div>
                          <span className="text-sm font-semibold text-gray-900">{count} ({percentage}%)</span>
                        </div>
                      );
                    })
                  ) : (<div className="text-center text-sm text-gray-400 py-4">No data yet</div>)}
                </div>
              </div>
            </Card3D>
          </div>

          {/* Flying Plane Banner */}
          <div className="mb-6 relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-6" style={{ boxShadow: "0 10px 40px rgba(59,130,246,0.3)" }}>
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute" style={{ animation: "flyAcross 12s linear infinite" }}>
                <PlaneIcon className="w-8 h-8 text-white/40" />
              </div>
              <div className="absolute" style={{ animation: "flyAcross 15s linear infinite 3s" }}>
                <PlaneIcon className="w-6 h-6 text-white/20" />
              </div>
            </div>
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="hidden md:block">
                  <FlyingPlane />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Rocket className="w-6 h-6" />
                    Welcome to IIL Admin Dashboard
                  </h3>
                  <p className="text-white/70 mt-1">Manage all your visa enquiries in one place with powerful analytics</p>
                </div>
              </div>
              <div className="hidden lg:flex items-center gap-3">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center" style={{ boxShadow: "0 4px 15px rgba(0,0,0,0.1)" }}>
                  <Zap className="w-6 h-6 text-yellow-300 mx-auto mb-1" />
                  <p className="text-xs text-white/80">Fast</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center" style={{ boxShadow: "0 4px 15px rgba(0,0,0,0.1)" }}>
                  <Shield className="w-6 h-6 text-green-300 mx-auto mb-1" />
                  <p className="text-xs text-white/80">Secure</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center" style={{ boxShadow: "0 4px 15px rgba(0,0,0,0.1)" }}>
                  <Target className="w-6 h-6 text-pink-300 mx-auto mb-1" />
                  <p className="text-xs text-white/80">Accurate</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-5 card-3d-hover" style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex-1 min-w-[280px] relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, email, phone, country..."
                  value={searchTerm}
                  onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all search-glow"
                />
              </div>

              <button onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all btn-3d ${showFilters ? "bg-blue-50 border-blue-300 text-blue-600" : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"}`}
              >
                <Filter className="w-4 h-4" />Filters
              </button>

              <select value={filterStatus} onChange={(e) => { setFilterStatus(e.target.value); setCurrentPage(1); }}
                className="px-4 py-2.5 rounded-xl text-sm bg-white border border-gray-200 text-gray-700 outline-none focus:border-blue-500 transition-all"
              >
                <option value="all">All Status</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Closed">Closed</option>
              </select>

              <select value={dateRange} onChange={(e) => { setDateRange(e.target.value); setCurrentPage(1); }}
                className="px-4 py-2.5 rounded-xl text-sm bg-white border border-gray-200 text-gray-700 outline-none focus:border-blue-500 transition-all"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>

              <button onClick={exportToExcel} disabled={enquiries.length === 0}
                className="flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white rounded-xl font-semibold transition-all text-sm shadow-lg shadow-green-600/20 btn-3d"
              >
                <FileSpreadsheet className="w-4 h-4" />Export Excel
              </button>

              <button onClick={() => setShowDeleteModal(true)} disabled={enquiries.length === 0}
                className="flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 disabled:bg-gray-300 text-white rounded-xl font-semibold transition-all text-sm shadow-lg shadow-red-600/20 btn-3d"
              >
                <Trash2 className="w-4 h-4" />Clear All
              </button>
            </div>

            {/* Active filters display */}
            {(searchTerm || filterStatus !== "all" || filterVisaType !== "all" || dateRange !== "all") && (
              <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-gray-100">
                <span className="text-xs text-gray-500 font-medium">Active filters:</span>
                {searchTerm && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-lg border border-blue-100">
                    Search: {searchTerm}
                    <button onClick={() => setSearchTerm("")} className="hover:text-blue-900"><X className="w-3 h-3" /></button>
                  </span>
                )}
                {filterStatus !== "all" && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 text-xs rounded-lg border border-green-100">
                    Status: {filterStatus}
                    <button onClick={() => setFilterStatus("all")} className="hover:text-green-900"><X className="w-3 h-3" /></button>
                  </span>
                )}
                {filterVisaType !== "all" && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded-lg border border-purple-100">
                    Visa: {filterVisaType}
                    <button onClick={() => setFilterVisaType("all")} className="hover:text-purple-900"><X className="w-3 h-3" /></button>
                  </span>
                )}
                {dateRange !== "all" && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-50 text-amber-700 text-xs rounded-lg border border-amber-100">
                    Date: {dateRange}
                    <button onClick={() => setDateRange("all")} className="hover:text-amber-900"><X className="w-3 h-3" /></button>
                  </span>
                )}
                <button onClick={() => { setSearchTerm(""); setFilterStatus("all"); setFilterVisaType("all"); setDateRange("all"); }}
                  className="text-xs text-red-500 hover:text-red-700 font-medium ml-auto"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden" style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50/80 border-b border-gray-100">
                  <tr>
                    {[{ key: "index", label: "S.NO", sortable: false }, { key: "name", label: "NAME", sortable: true }, { key: "email", label: "EMAIL", sortable: true },
                      { key: "phone", label: "PHONE", sortable: true }, { key: "country", label: "COUNTRY", sortable: true }, { key: "visaType", label: "VISA TYPE", sortable: true },
                      { key: "purpose", label: "PURPOSE", sortable: false }, { key: "date", label: "DATE", sortable: true },
                      { key: "status", label: "STATUS", sortable: false }, { key: "actions", label: "ACTIONS", sortable: false }].map((col) => (
                      <th key={col.key} onClick={() => col.sortable && handleSort(col.key)}
                        className={`px-4 py-3 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider ${col.sortable ? "cursor-pointer hover:text-blue-500" : ""}`}>
                        <div className="flex items-center gap-1">
                          {col.label}
                          {col.sortable && sortField === col.key && (sortOrder === "asc" ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />)}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {paginatedData.length === 0 ? (
                    <tr>
                      <td colSpan={10} className="px-4 py-16 text-center">
                        {enquiries.length === 0 ? (
                          <div>
                            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                              <Users className="w-8 h-8 text-gray-300" />
                            </div>
                            <p className="text-lg font-semibold text-gray-500">No enquiries yet</p>
                            <p className="text-sm text-gray-400 mt-1">Submit a form to see data here</p>
                          </div>
                        ) : (
                          <div>
                            <Search className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                            <p className="text-gray-400">No matching results</p>
                          </div>
                        )}
                      </td>
                    </tr>
                  ) : (
                    paginatedData.map((enquiry, index) => (
                      <tr key={enquiry.id || index}
                        className="table-row-3d hover:bg-blue-50/40 cursor-pointer"
                        onClick={() => { setSelectedEnquiry(enquiry); setShowDetailModal(true); }}>
                        <td className="px-4 py-3.5 text-sm text-gray-500 font-medium">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                        <td className="px-4 py-3.5">
                          <p className="font-semibold text-sm text-gray-900">{enquiry.name || "N/A"}</p>
                        </td>
                        <td className="px-4 py-3.5 text-sm text-gray-600">{enquiry.email || "N/A"}</td>
                        <td className="px-4 py-3.5 text-sm text-gray-600">{enquiry.phone || "N/A"}</td>
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-1.5">
                            <span className="text-base">{getCountryFlag(enquiry.country)}</span>
                            <span className="text-sm text-gray-600">{enquiry.country || "N/A"}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                            enquiry.visaType === "Spouse Visa" ? "bg-blue-50 text-blue-700 border border-blue-100" :
                            enquiry.visaType === "Student Visa" ? "bg-amber-50 text-amber-700 border border-amber-100" :
                            enquiry.visaType === "Study Visa" ? "bg-pink-50 text-pink-700 border border-pink-100" :
                            enquiry.visaType === "Work Visa" ? "bg-green-50 text-green-700 border border-green-100" :
                            enquiry.visaType === "Visitor Visa" ? "bg-red-50 text-red-700 border border-red-100" :
                            enquiry.visaType === "PR Visa" ? "bg-purple-50 text-purple-700 border border-purple-100" :
                            "bg-gray-50 text-gray-700 border border-gray-100"
                          }`}>{enquiry.visaType || "N/A"}</span>
                        </td>
                        <td className="px-4 py-3.5 text-sm text-gray-600 max-w-[160px] truncate">{enquiry.purpose || "N/A"}</td>
                        <td className="px-4 py-3.5 text-sm text-gray-500">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            {enquiry.date ? new Date(enquiry.date).toLocaleDateString("en-GB") : "N/A"}
                          </div>
                          <p className="text-[10px] text-gray-400 mt-0.5">{enquiry.date ? new Date(enquiry.date).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }) : ""}</p>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full border ${
                            enquiry.status === "New" ? "bg-blue-50 text-blue-700 border-blue-200" :
                            enquiry.status === "Contacted" ? "bg-amber-50 text-amber-700 border-amber-200" :
                            enquiry.status === "Closed" ? "bg-green-50 text-green-700 border-green-200" :
                            "bg-gray-50 text-gray-600 border-gray-200"
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              enquiry.status === "New" ? "bg-blue-500" :
                              enquiry.status === "Contacted" ? "bg-amber-500" :
                              enquiry.status === "Closed" ? "bg-green-500" :
                              "bg-gray-400"
                            }`}></span>
                            {enquiry.status || "New"}
                          </span>
                        </td>
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={(e) => { e.stopPropagation(); setSelectedEnquiry(enquiry); setShowDetailModal(true); }}
                              className="p-2 hover:bg-blue-50 text-blue-500 rounded-lg transition-colors"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              className="p-2 hover:bg-gray-100 text-gray-500 rounded-lg transition-colors"
                              title="Edit"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {filtered.length > 0 && (
              <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">
                    Showing <span className="font-semibold text-gray-900">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-semibold text-gray-900">{Math.min(currentPage * itemsPerPage, filtered.length)}</span> of <span className="font-semibold text-gray-900">{filtered.length}</span> results
                  </span>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                    className="ml-2 text-sm px-2 py-1 rounded-lg border border-gray-200 bg-white text-gray-700 outline-none"
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                  <span className="text-sm text-gray-500">per page</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-9 h-9 rounded-lg text-sm font-semibold transition-all ${
                          currentPage === pageNum
                            ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                            : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronRightIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" style={{ animation: "modalSlideIn 0.3s ease-out" }}>
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" style={{ boxShadow: "0 25px 50px rgba(0,0,0,0.25)" }}>
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Enquiry Details</h3>
                  <p className="text-xs text-gray-500">ID: {selectedEnquiry.id || "N/A"}</p>
                </div>
              </div>
              <button
                onClick={() => setShowDetailModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Personal Info */}
              <div>
                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <User className="w-4 h-4 text-blue-500" /> Personal Information
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs text-gray-500 mb-1">Full Name</p>
                    <p className="text-sm font-semibold text-gray-900">{selectedEnquiry.name || "N/A"}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs text-gray-500 mb-1">Email Address</p>
                    <p className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-gray-400" />
                      {selectedEnquiry.email || "N/A"}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs text-gray-500 mb-1">Phone Number</p>
                    <p className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-gray-400" />
                      {selectedEnquiry.phone || "N/A"}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs text-gray-500 mb-1">Country</p>
                    <p className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                      <span className="text-lg">{getCountryFlag(selectedEnquiry.country)}</span>
                      {selectedEnquiry.country || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Visa Info */}
              <div>
                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-blue-500" /> Visa Information
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs text-gray-500 mb-1">Visa Type</p>
                    <span className={`inline-flex px-3 py-1 text-xs font-bold rounded-full ${
                      selectedEnquiry.visaType === "Spouse Visa" ? "bg-blue-50 text-blue-700 border border-blue-100" :
                      selectedEnquiry.visaType === "Student Visa" ? "bg-amber-50 text-amber-700 border border-amber-100" :
                      selectedEnquiry.visaType === "Study Visa" ? "bg-pink-50 text-pink-700 border border-pink-100" :
                      selectedEnquiry.visaType === "Work Visa" ? "bg-green-50 text-green-700 border border-green-100" :
                      selectedEnquiry.visaType === "Visitor Visa" ? "bg-red-50 text-red-700 border border-red-100" :
                      selectedEnquiry.visaType === "PR Visa" ? "bg-purple-50 text-purple-700 border border-purple-100" :
                      "bg-gray-50 text-gray-700 border border-gray-100"
                    }`}>{selectedEnquiry.visaType || "N/A"}</span>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs text-gray-500 mb-1">Status</p>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full border ${
                      selectedEnquiry.status === "New" ? "bg-blue-50 text-blue-700 border-blue-200" :
                      selectedEnquiry.status === "Contacted" ? "bg-amber-50 text-amber-700 border-amber-200" :
                      selectedEnquiry.status === "Closed" ? "bg-green-50 text-green-700 border-green-200" :
                      "bg-gray-50 text-gray-600 border-gray-200"
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        selectedEnquiry.status === "New" ? "bg-blue-500" :
                        selectedEnquiry.status === "Contacted" ? "bg-amber-500" :
                        selectedEnquiry.status === "Closed" ? "bg-green-500" :
                        "bg-gray-400"
                      }`}></span>
                      {selectedEnquiry.status || "New"}
                    </span>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 col-span-2">
                    <p className="text-xs text-gray-500 mb-1">Purpose</p>
                    <p className="text-sm font-semibold text-gray-900">{selectedEnquiry.purpose || "N/A"}</p>
                  </div>
                </div>
              </div>

              {/* Message */}
              {selectedEnquiry.message && (
                <div>
                  <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-blue-500" /> Message
                  </h4>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm text-gray-700 leading-relaxed">{selectedEnquiry.message}</p>
                  </div>
                </div>
              )}

              {/* Date Info */}
              <div>
                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-500" /> Submission Info
                </h4>
                <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-700">
                      {selectedEnquiry.date ? new Date(selectedEnquiry.date).toLocaleDateString("en-GB", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                      }) : "N/A"}
                    </span>
                  </div>
                  <div className="w-px h-6 bg-gray-200"></div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-700">
                      {selectedEnquiry.date ? new Date(selectedEnquiry.date).toLocaleTimeString("en-GB", {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit"
                      }) : "N/A"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <a
                  href={`mailto:${selectedEnquiry.email}`}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all btn-3d"
                >
                  <Mail className="w-4 h-4" /> Send Email
                </a>
                <a
                  href={`tel:${selectedEnquiry.phone}`}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-all btn-3d"
                >
                  <Phone className="w-4 h-4" /> Call Now
                </a>
                <a
                  href={`https://wa.me/${selectedEnquiry.phone?.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold transition-all btn-3d"
                >
                  <MessageSquare className="w-4 h-4" /> WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" style={{ animation: "modalSlideIn 0.3s ease-out" }}>
          <div className="bg-white rounded-2xl w-full max-w-md p-6" style={{ boxShadow: "0 25px 50px rgba(0,0,0,0.25)" }}>
            <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-xl font-bold text-center text-gray-900 mb-2">Delete All Enquiries?</h3>
            <p className="text-sm text-gray-500 text-center mb-6">
              This action cannot be undone. All <span className="font-bold text-gray-900">{stats.total}</span> enquiries will be permanently deleted.
            </p>

            <div className="bg-red-50 border border-red-100 rounded-xl p-4 mb-6">
              <p className="text-sm text-red-700 mb-2">Type <span className="font-bold">DELETE</span> to confirm:</p>
              <input
                type="text"
                value={deleteConfirm}
                onChange={(e) => setDeleteConfirm(e.target.value)}
                placeholder="Type DELETE here..."
                className="w-full px-4 py-3 rounded-xl border border-red-200 bg-white text-gray-900 placeholder-gray-400 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all text-center font-mono text-sm"
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => { setShowDeleteModal(false); setDeleteConfirm(""); }}
                className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={deleteAll}
                disabled={deleteConfirm !== "DELETE" || loading}
                className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-300 text-white rounded-xl font-semibold transition-all btn-3d flex items-center justify-center gap-2"
              >
                {loading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Trash2 className="w-4 h-4" />
                )}
                {loading ? "Deleting..." : "Delete All"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}