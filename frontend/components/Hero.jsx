"use client";

import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const slideData = [
  {
    title: "Study & Immigration Services",
    subtitle: "Trusted global guidance for study abroad, visa, and language pathways.",
    description: "International Institute Of Language helps students secure admissions, visa approvals, and career-ready language training.",
    image: "/Studyabroad.png",
    buttonText: "Enquiry Now",
  },
  {
    title: "Free Live Master Class",
    subtitle: "IELTS, PTE, TOEFL, and spoken English preparation with industry experts.",
    description: "Fast-track your band score with dynamic coaching, live practice, and detailed feedback.",
    image: "/class1.jpeg",
    buttonText: "Explore Our Courses",
  },
  {
    title: "Visa & Admission Support",
    subtitle: "End-to-end student visa processing and documentation support.",
    description: "Applicants receive personalized consultation, SOP drafting, and embassy-ready application management.",
    image: "/class2.jpeg",
    buttonText: "Start Your Enquiry",
  },
];

export default function Hero() {
  return (
    <section className="relative w-full bg-[#0a0f1c] overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[50%] rounded-full bg-indigo-600/10 blur-[120px]" />
        <div className="absolute -bottom-[20%] left-[20%] w-[50%] h-[50%] rounded-full bg-violet-600/10 blur-[120px]" />
      </div>

      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={1000}
        navigation
        pagination={{ clickable: true, dynamicBullets: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        autoHeight={true}
        style={{
          "--swiper-navigation-color": "rgba(255, 255, 255, 0.7)",
          "--swiper-pagination-color": "#3b82f6",
          "--swiper-pagination-bullet-inactive-color": "#ffffff",
          "--swiper-pagination-bullet-inactive-opacity": "0.3",
          "--swiper-navigation-size": "24px",
        }}
        className="w-full"
      >
        {slideData.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full flex items-center justify-center px-6 py-20 sm:p-12 lg:px-24 min-h-[100vh] lg:min-h-[calc(100vh-4rem)] xl:min-h-[700px]">

              <div className="relative z-10 w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                {/* Text Content */}
                <div className="flex flex-col justify-center max-w-2xl text-center lg:text-left mx-auto lg:mx-0 order-2 lg:order-1 pt-6 lg:pt-0">


                  <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.15] drop-shadow-sm">
                    {slide.title}
                  </h1>

                  <p className="mt-6 text-lg sm:text-xl font-medium text-slate-200">
                    {slide.subtitle}
                  </p>

                  <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed font-light">
                    {slide.description}
                  </p>

                  <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <Link
                      href="/academy/course"
                      className="group inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-blue-600 rounded-full shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:bg-blue-500 hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] transition-all duration-300"
                    >
                      {slide.buttonText}
                      <svg className="w-5 h-5 ml-2 -mr-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Link>
                    {/* <Link
                      href="/contact"
                      className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm"
                    >
                      Contact Team
                    </Link> */}
                  </div>
                </div>

                {/* Image Content */}
                <div className="relative group mx-auto w-full max-w-md sm:max-w-lg lg:max-w-xl order-1 lg:order-2 mt-8 lg:mt-0">
                  {/* Decorative glow behind image */}
                  <div className="absolute -inset-4 bg-gradient-to-tr from-blue-500/30 via-transparent to-indigo-500/30 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition duration-700" />

                  <div className="relative aspect-[4/3] sm:aspect-[4/3] lg:aspect-[4/3] w-full rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-slate-900/50 backdrop-blur-sm">
                    {/* Dark gradient overlay on bottom for depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1c] via-[#0a0f1c]/20 to-transparent z-10 pointer-events-none opacity-90" />
                    {/* Subtle colored overlay for consistent blending */}
                    <div className="absolute inset-0 bg-blue-900/20 mix-blend-overlay z-10 pointer-events-none" />

                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      priority={true}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-center transform transition-transform duration-[2000ms] ease-out group-hover:scale-110 will-change-transform"
                    />
                  </div>
                </div>

              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
