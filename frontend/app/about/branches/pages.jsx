"use client";

import Link from "next/link";
import { ArrowRight, Clock3, MapPin, Navigation, Phone, Search, Share2, MessageCircle, AtSign, Globe } from "lucide-react";
import { useMemo, useState } from "react";

const branches = [
  { city: "Ludhiana", area: "Model Town", address: "Near the city centre, Model Town", phone: "+91 98765 43210", tag: "Main campus", color: "bg-[#0b4e80]" },
  { city: "Jalandhar", area: "Urban Estate", address: "A welcoming space in Urban Estate", phone: "+91 98765 43210", tag: "Language hub", color: "bg-[#ff4f6d]" },
  { city: "Moga", area: "GT Road", address: "Conveniently located on GT Road", phone: "+91 98765 43210", tag: "Student centre", color: "bg-[#0b8393]" },
];

const socialLinks = [
  { name: "Facebook", icon: Share2, url: "https://www.facebook.com/iiLstudyabroad", color: "hover:bg-[#1877f2]", handle: "@iiLstudyabroad" },
  { name: "Instagram", icon: MessageCircle, url: "https://www.instagram.com/iil.studyabroad", color: "hover:bg-[#e4405f]", handle: "@iil.studyabroad" },
  { name: "YouTube", icon: Globe, url: "https://youtube.com/@iil.studyabroad", color: "hover:bg-[#ff0000]", handle: "@iil.studyabroad" },
  { name: "LinkedIn", icon: Globe, url: "https://www.linkedin.com/company/iilstudyabroad/", color: "hover:bg-[#0077b5]", handle: "iilstudyabroad" },
];

export default function BranchesPage() {
  const [query, setQuery] = useState("");
  const results = useMemo(() => branches.filter((b) => `${b.city} ${b.area}`.toLowerCase().includes(query.toLowerCase())), [query]);
  
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#071a32] to-[#0a2d4d] px-6 py-20 sm:px-10 lg:px-16 lg:py-24">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5"></div>
        <div className="relative mx-auto max-w-7xl">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-cyan-300 transition hover:text-cyan-200">
            <ArrowRight className="h-4 w-4 rotate-180" /> International Institute Of Languages & Study Abroad
          </Link>
          <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="font-bold uppercase tracking-[.18em] text-[#ff7189]">Visit us</p>
              <h1 className="mt-4 text-5xl font-black tracking-tight text-white sm:text-7xl">
                Find your nearest<br />
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">International Institute campus.</span>
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-slate-300">
                Step into a space made for focused learning, friendly questions, and bigger plans.
              </p>
            </div>
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search a city..."
                className="w-full rounded-2xl border-2 border-white/20 bg-white/10 px-12 py-4 font-medium text-white placeholder-slate-400 backdrop-blur-sm outline-none transition focus:border-[#ff4f6d] focus:ring-2 focus:ring-[#ff4f6d]/50"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="mx-auto max-w-7xl px-6 py-12 sm:px-10 lg:px-16">
        <div className="rounded-3xl bg-white p-8 shadow-lg sm:p-12">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900">Connect with us</h2>
            <p className="mt-2 text-slate-600">Follow us on social media for updates and language learning tips</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className={`group flex items-center gap-4 rounded-2xl border-2 border-slate-200 p-6 transition-all hover:scale-105 ${social.color} hover:border-transparent hover:text-white`}
              >
                <social.icon className="h-8 w-8 text-slate-600 transition group-hover:text-white" />
                <div>
                  <p className="font-bold text-slate-900 transition group-hover:text-white">{social.name}</p>
                  <p className="text-sm text-slate-500 transition group-hover:text-white/80">{social.handle}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Branches Section */}
      <section className="mx-auto max-w-7xl px-6 py-14 sm:px-10 lg:px-16">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-bold text-slate-500">{results.length} campuses ready to welcome you</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">Our Locations</h2>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-[#0b4e80] px-6 py-3 font-bold text-white transition hover:bg-[#083b61]"
          >
            Need help choosing? <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {results.map((branch, index) => (
            <article
              key={branch.city}
              className="group overflow-hidden rounded-3xl border-2 border-slate-200 bg-white shadow-lg transition-all hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className={`${branch.color} relative h-40 p-8 text-white`}>
                <span className="inline-block rounded-full bg-white/20 px-4 py-2 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                  {branch.tag}
                </span>
                <span className="absolute bottom-6 right-8 text-8xl font-black text-white/10 transition group-hover:scale-110">
                  0{index + 1}
                </span>
              </div>
              <div className="p-8">
                <h2 className="text-3xl font-black text-slate-900">{branch.city}</h2>
                <p className="mt-2 font-bold text-[#ff4f6d]">{branch.area}</p>
                <div className="mt-6 space-y-4 text-sm text-slate-600">
                  <p className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 shrink-0 mt-0.5 text-[#0b4e80]" />
                    {branch.address}
                  </p>
                  <p className="flex items-center gap-3">
                    <Clock3 className="h-5 w-5 shrink-0 text-[#0b4e80]" />
                    Mon–Sat · 9:00 AM–6:00 PM
                  </p>
                  <p className="flex items-center gap-3">
                    <Phone className="h-5 w-5 shrink-0 text-[#0b4e80]" />
                    {branch.phone}
                  </p>
                </div>
                <div className="mt-8 flex gap-3">
                  <a
                    href={`tel:${branch.phone.replace(/\s/g, "")}`}
                    className="flex-1 rounded-xl bg-slate-100 px-4 py-4 text-center font-bold text-slate-800 transition hover:bg-slate-200"
                  >
                    Call campus
                  </a>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noreferrer"
                    className="grid w-14 place-items-center rounded-xl bg-[#0b4e80] text-white transition hover:bg-[#083b61]"
                    aria-label={`Get directions to ${branch.city}`}
                  >
                    <Navigation className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {!results.length && (
          <div className="rounded-3xl border-2 border-dashed border-slate-300 p-16 text-center">
            <Search className="mx-auto h-16 w-16 text-slate-300" />
            <p className="mt-4 text-xl font-bold text-slate-600">No campuses found</p>
            <p className="mt-2 text-slate-500">Try searching for a different city</p>
          </div>
        )}
      </section>
    </main>
  );
}
