"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, BookOpen, GraduationCap, HeartHandshake, Sparkles, Users } from "lucide-react";

const values = [
  { icon: HeartHandshake, title: "Student-first guidance", text: "Clear advice, honest support, and a team that stays with you at every step." },
  { icon: BookOpen, title: "Learning that travels", text: "Practical language programmes designed for confidence beyond the classroom." },
  { icon: Award, title: "Results with purpose", text: "Focused teaching and thoughtful preparation for each student’s next chapter." },
];

export default function AboutUsPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f8fafc] text-slate-900">
      <section className="relative isolate overflow-hidden bg-[#071a32] px-6 pb-20 pt-10 sm:px-10 lg:px-16 lg:pb-28">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_10%,rgba(41,174,225,.3),transparent_25%),radial-gradient(circle_at_85%_70%,rgba(255,95,117,.24),transparent_23%)]" />
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 text-lg font-extrabold tracking-tight text-white"><span className="grid h-10 w-10 place-items-center rounded-xl bg-[#ff4f6d] text-sm">II</span>Iqra Institute</Link>
            <Link href="/contact" className="rounded-full border border-white/20 px-5 py-2 text-sm font-semibold text-white transition hover:bg-white hover:text-[#071a32]">Talk to us</Link>
          </div>
          <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_.92fr]">
            <div>
              <p className="mb-5 flex items-center gap-2 text-sm font-bold uppercase tracking-[.2em] text-cyan-300"><Sparkles className="h-4 w-4" /> About Iqra</p>
              <h1 className="max-w-3xl text-5xl font-black leading-[.98] tracking-tight text-white sm:text-6xl">We help ambition find its <span className="text-[#ff7189]">voice.</span></h1>
              <p className="mt-7 max-w-xl text-lg leading-8 text-slate-300">Iqra Language Institute is a warm, modern place to build the communication skills that open doors—at university, at work, and around the world.</p>
              <div className="mt-9 flex flex-wrap gap-4"><Link href="/academy" className="inline-flex items-center gap-2 rounded-full bg-[#ff4f6d] px-6 py-3.5 font-bold text-white shadow-lg shadow-rose-950/30 transition hover:-translate-y-0.5">Explore programmes <ArrowRight className="h-4 w-4" /></Link><Link href="/contact" className="rounded-full border border-white/25 px-6 py-3.5 font-bold text-white transition hover:bg-white/10">Book a consultation</Link></div>
            </div>
            <div className="relative mx-auto w-full max-w-md">
              <div className="absolute -inset-4 rotate-6 rounded-[2rem] border border-white/10 bg-white/5" />
              <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-slate-800 shadow-2xl"><Image src="/class1.jpeg" alt="Students learning together" width={800} height={600} className="h-[370px] w-full object-cover" priority /><div className="absolute bottom-5 left-5 rounded-2xl bg-white p-4 shadow-xl"><p className="text-2xl font-black text-[#071a32]">Your future,</p><p className="font-semibold text-[#ff4f6d]">spoken with confidence.</p></div></div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-6 py-16 sm:px-10 lg:grid-cols-3 lg:px-16">
        {[['10+', 'Years of guidance'], ['1,000+', 'Students supported'], ['1', 'Big belief in you']].map(([number, label]) => <div key={label} className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm"><p className="text-4xl font-black text-[#0b4e80]">{number}</p><p className="mt-1 font-medium text-slate-500">{label}</p></div>)}
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-10 sm:px-10 lg:grid-cols-2 lg:px-16 lg:py-20">
        <div className="rounded-[2rem] bg-[#dff5fa] p-8 sm:p-12"><p className="text-sm font-bold uppercase tracking-[.18em] text-[#0b7295]">Our story</p><h2 className="mt-4 text-4xl font-black leading-tight text-[#071a32]">More than lessons. A launchpad.</h2><p className="mt-6 leading-8 text-slate-600">Every learner arrives with a different goal. We pair capable teachers with encouraging mentorship so that goal feels achievable, personal, and exciting.</p><div className="mt-8 flex items-center gap-3 font-bold text-[#0b4e80]"><GraduationCap className="h-7 w-7" /> Learn boldly. Go further.</div></div>
        <div className="grid gap-4">{values.map(({ icon: Icon, title, text }) => <article key={title} className="group flex gap-5 rounded-3xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60"><div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-rose-50 text-[#ff4f6d]"><Icon className="h-6 w-6" /></div><div><h3 className="text-lg font-extrabold">{title}</h3><p className="mt-1 text-sm leading-6 text-slate-500">{text}</p></div></article>)}</div>
      </section>

      <section className="mx-6 mb-16 rounded-[2rem] bg-[#ff4f6d] px-7 py-12 text-center text-white sm:mx-10 lg:mx-16"><Users className="mx-auto h-8 w-8" /><h2 className="mt-4 text-3xl font-black">Let’s make your next step feel possible.</h2><p className="mx-auto mt-3 max-w-xl text-rose-100">Meet the people who will listen, guide, and cheer you on.</p><Link href="/contact" className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-bold text-[#d93555] transition hover:scale-105">Start a conversation <ArrowRight className="h-4 w-4" /></Link></section>
    </main>
  );
}
