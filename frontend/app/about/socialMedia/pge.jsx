"use client";

import Link from "next/link";
import { Play, Send } from "lucide-react";
import { useState } from "react";

export default function SocialMediaPage() {
 const [sent, setSent] = useState(false);
 return <main className="min-h-screen bg-[#071a32] text-white"><section className="relative overflow-hidden px-6 pb-16 pt-10 sm:px-10 lg:px-16 lg:pb-24"><div className="absolute -right-32 top-10 h-96 w-96 rounded-full bg-[#ff4f6d]/20 blur-3xl"/><div className="absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-cyan-400/15 blur-3xl"/><div className="relative mx-auto max-w-7xl"><Link href="/" className="font-bold text-cyan-300">← International Institute Of Languages & Study Abroad</Link><div className="mt-16 grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-center"><div><p className="font-bold uppercase tracking-[.22em] text-[#ff7189]">Contact Us</p><h1 className="mt-4 text-5xl font-black leading-none tracking-tight sm:text-7xl">Have a question?<br /><span className="text-cyan-300">Send us a hello.</span></h1><p className="mt-7 max-w-xl text-lg leading-8 text-slate-300">Our friendly team is only a message away. Reach out to us for any queries about our courses, visa services, or study abroad programs.</p></div></div></div></section>
 <section className="px-6 py-16 sm:px-10 lg:px-16"><div className="mx-auto grid max-w-7xl overflow-hidden rounded-[2rem] bg-[#ff4f6d] lg:grid-cols-[1fr_.9fr]"><div className="p-8 sm:p-12"><Play className="h-8 w-8"/><h2 className="mt-5 text-4xl font-black leading-tight">Get in touch</h2><p className="mt-4 text-rose-100">Fill out the form and we'll get back to you as soon as possible.</p></div><form onSubmit={(e) => {e.preventDefault(); setSent(true);}} className="m-5 rounded-[1.5rem] bg-white p-6 text-slate-900 sm:m-8"><label className="text-sm font-bold">Your email</label><input required type="email" placeholder="you@example.com" className="mt-2 w-full rounded-xl bg-slate-100 px-4 py-3 outline-none ring-[#ff4f6d] focus:ring-2"/><button className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#071a32] px-4 py-3 font-bold text-white"><Send className="h-4 w-4" />{sent ? "Thanks — we'll be in touch!" : "Send a message"}</button></form></div></section>
 </main>;
}
