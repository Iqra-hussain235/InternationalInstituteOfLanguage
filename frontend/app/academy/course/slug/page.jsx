"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

export default function CourseDetail() {
  const { slug } = useParams();

  const [mode, setMode] = useState("");
  const [type, setType] = useState("");
  const [duration, setDuration] = useState("");

  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold text-[#1F3A8A]">
        {slug.toUpperCase()} Course
      </h1>

      {/* MODE */}
      <div className="mt-6">
        <h2>Select Mode</h2>
        <button onClick={() => setMode("online")} className="mr-3">Online</button>
        <button onClick={() => setMode("offline")}>Offline</button>
      </div>

      {/* TYPE */}
      {mode && (
        <div className="mt-6">
          <h2>Select Type</h2>
          <button onClick={() => setType("solo")} className="mr-3">Solo</button>
          <button onClick={() => setType("group")}>Group</button>
        </div>
      )}

      {/* DURATION */}
      {type && (
        <div className="mt-6">
          <h2>Select Duration</h2>
          <button onClick={() => setDuration("1hr")} className="mr-3">1 Hour</button>
          <button onClick={() => setDuration("2hr")}>2 Hour</button>
        </div>
      )}

      {/* PACKAGES */}
      {duration && (
        <div className="mt-6 grid grid-cols-2 gap-4">
          {["A1", "A1-A2", "A2-B1", "B1", "B2", "C1", "C2"].map((pkg) => (
            <div className="border p-4 rounded shadow">
              <h3>{pkg}</h3>
              <button className="bg-[#E41E26] text-white px-4 py-2 mt-2">
                Enquiry Now
              </button>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}