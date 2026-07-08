"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicesSection from "@/components/ServicesSection";

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <ServicesSection
        id="services-page"
        showCta={false}
        animateOnView={false}
        className="pt-8"
      />
      <Footer />
    </>
  );
}
