// manu will  handle event 

"use client";

import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { useState, useEffect, Suspense } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";


const events = [
  {
    id: 1,
    title: "Beyond the Ordinary",
    description:
      "An outing with the learner where learning is not limit but also a social engagement with each other by exploring more.",
    image: "/images/img7.jpeg",
  },
  {
    id: 2,
    title: "Events That Shape Futures",
    description:
      "A successful seminar with the future assistant of doctor to make their life more bright in Abroad As knowledge shouldn’t have to keep, it should have to aware who are not.",
    image: "/images/img2.jpeg",
  },
  {
    id: 3,
    title: "Where Memories Begin",
    description:
      "An outing where  student shared their enjoyable gesture with their trainer who always stand by them.",
    image: "/images/img3.jpeg",
  },
  {
    id: 4,
    title: "Learning Beyond Classrooms",
    description:
      "An event where kids had been welcomed and we always look after the creatives where it exists.",
    image: "/images/img4.jpeg",
  },
  {
    id: 5,
    title: "Experiences That Educate",
    description:
      "An event of Independence Day when we recall our duties and make our younger ones recalled to being united.",
    image: "/images/img5.jpeg",
  },
  {
    id: 6,
    title: "Travel, Learn, Grow",
    description:
      "An  exposure of the day where all spoke in an open area where we tried to give experience of real life challenges overcome.",
    image: "/images/img6.jpeg",
  },
];

export default function EventShowcasePage() {
  return (
    <div className="bg-[#020B1C] min-h-screen overflow-hidden text-white">
      {/* Hero Section */}
      <section className="relative py-28 px-6 md:px-16 text-center bg-gradient-to-b from-[#020B1C] to-[#04122E] overflow-hidden">
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 5 }}
          className="absolute top-10 left-10 w-40 h-40 rounded-full bg-blue-400/10 blur-3xl opacity-70"
        />

        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 6 }}
          className="absolute bottom-10 right-10 w-52 h-52 rounded-full bg-white/10 blur-3xl opacity-60"
        />

        <p className="uppercase tracking-[6px] text-sm text-gray-300 mb-4 font-medium">
          Explore Experiences
        </p>

        <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
          Events That Create
          <br />
          Beautiful Memories
        </h1>

        <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-300 leading-relaxed">
          From adventure trips to special celebrations, discover experiences
          crafted to make every moment unforgettable. Every event tells a story,
          and every journey becomes a memory worth keeping.
        </p>
      </section>

      {/* Large Alternating Event Sections */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 space-y-32">
        {events.map((event, index) => {
          const isEven = index % 2 === 0;

          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: isEven ? -250 : 250 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              {/* Image */}
              <div className={`${!isEven ? "md:order-2" : ""}`}>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.4 }}
                  className="rounded-[30px] overflow-hidden shadow-2xl border border-white/10"
                >
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-[500px] object-cover"
                  />
                </motion.div>
              </div>

              {/* Content */}
              <div className={`${!isEven ? "md:order-1" : ""}`}>
                <p className="text-sm uppercase tracking-[4px] text-gray-300 mb-3 font-medium">
                  Featured Event
                </p>

                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  {event.title}
                </h2>

                <p className="text-lg text-gray-300 leading-relaxed mb-8">
                  {event.description}
                </p>

                <p className="text-base font-medium text-white italic border-l-4 border-white pl-4">
                  {event.id === 1
                    ? "Every journey opens new doors to adventure, learning, and unforgettable memories."
                    : event.id === 2
                    ? "Beautiful celebrations are remembered for the emotions they leave behind."
                    : event.id === 3
                    ? "Adventure begins where comfort ends and the best stories are created outside."
                    : event.id === 4
                    ? "The quiet of nature and shared moments create the most peaceful memories."
                    : event.id === 5
                    ? "Campus life is filled with moments that turn into stories remembered forever."
                    : "Strong teams are built through shared challenges, laughter, and unforgettable moments."}
                </p>
              </div>
            </motion.div>
          );
        })}
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-10">
        <div className="max-w-7xl mx-auto px-6 md:px-16 py-14">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-3">
                International Institute Of Language
              </h3>
              <p className="text-gray-300 text-lg">
                Professional guidance for study abroad, visas, and language exams.
              </p>
            </div>

            <div className="flex gap-8 text-lg text-gray-300 font-medium">
              <a
                href="https://www.linkedin.com/company/iilstudyabroad"
                target="_blank"
                rel="noopener noreferrer"
                >
                LinkedIn
                </a>
                <a
                href="https://www.facebook.com/iiLstudyabroad"
                target="_blank"
                rel="noopener noreferrer"
                >
                Facebook
                </a>
                <a
                href="https://www.instagram.com/iil.studyabroad"
                target="_blank"
                rel="noopener noreferrer"
                >
                Instagram
                </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 py-8 text-center">
          <p className="text-gray-400 text-lg">
            © 2026 International Institute Of Language. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}