"use client";

import { useState } from "react";
import axios from "axios";

export default function Contact() {
  const [data, setData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:5000/api/contact", data);
      setStatus("Thank you! Your message has been submitted.");
      setData({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus("Unable to submit right now. Please try again later.");
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-start">
          <section className="rounded-[36px] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.3em] text-red-300">Contact Center</p>
            <h1 className="mt-4 text-4xl font-bold text-white">Get in touch with International Institute Of Language</h1>
            <p className="mt-4 max-w-2xl text-slate-300">
              Send your details and our team will reach out to you with complete study abroad, visa, and language support.
            </p>

            <div className="mt-8 space-y-5">
              <div>
                <label className="text-sm text-slate-300">Name</label>
                <input
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-white outline-none transition focus:border-blue-400"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="text-sm text-slate-300">Email</label>
                <input
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-white outline-none transition focus:border-blue-400"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="text-sm text-slate-300">Message</label>
                <textarea
                  value={data.message}
                  onChange={(e) => setData({ ...data, message: e.target.value })}
                  className="mt-2 h-40 w-full rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-white outline-none transition focus:border-blue-400"
                  placeholder="Share your enquiry or preferred course"
                />
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="btn-glow mt-6 w-full disabled:cursor-not-allowed disabled:opacity-60"
            >
              Submit Enquiry
            </button>
            {status && <p className="mt-4 text-sm text-slate-300">{status}</p>}
          </section>

          <aside className="space-y-6 rounded-[36px] border border-white/10 bg-blue-950/85 p-8 shadow-xl shadow-slate-950/40">
            <div>
              <h2 className="text-2xl font-semibold text-white">Contact Details</h2>
              <p className="mt-3 text-slate-300">Near MIT College, Wave Cinema Road, Moradabad</p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-red-300">Phone</p>
              <p className="mt-2 text-lg font-semibold text-white">+91 8445955365</p>
                {/* <p className="mt-2 text-lg font-semibold text-white">+91 79007 65352</p> */}
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-red-300">Email</p>
              <p className="mt-2 text-lg font-semibold text-white">support@ILL.com</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-950/90 p-5 text-slate-300">
              <h3 className="font-semibold text-white">Office Hours</h3>
              <p className="mt-2">Mon - Sat: 09:00 AM - 07:00 PM</p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}