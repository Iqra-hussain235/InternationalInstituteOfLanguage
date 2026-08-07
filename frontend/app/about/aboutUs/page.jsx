"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Globe, GraduationCap, Award, Users, CheckCircle, Star, Clock } from "lucide-react";

export default function AboutUsPage() {
  const [activeOffice, setActiveOffice] = useState("MORADABAD");

  const offices = [
    {
      id: "MORADABAD",
      name: "Moradabad",
      address: "Main Office, Civil Lines, Moradabad, Uttar Pradesh",
      email: "info@iilmoradabad.com",
      phone: "+91-XXXXXXXXXX",
      phone2: "+91-XXXXXXXXXX",
      whatsapp: "+91-XXXXXXXXXX",
      hours: "Mon-Sat: 9:00 AM - 6:00 PM"
    }
  ];

  const activeOfficeData = offices.find(o => o.id === activeOffice);

  return (
    <div className="w-full bg-gradient-to-b from-slate-50 to-white min-h-screen">

      {/* Hero Section */}
      <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1600&h=800&fit=crop"
          alt="About Us Banner"
          className="w-full h-full object-cover animate-fade-in"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071a32]/95 to-[#0a2d4d]/80" />
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <div className="text-center max-w-4xl animate-slide-up">
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4">
              About <span className="text-[#ff7189]">Us</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-200">
              Your Trusted Partner for Global Education & Immigration
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* About Section */}
        <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
          <div className="animate-fade-in-left">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Best Immigration And Visa Consultants
            </h2>
            <p className="text-gray-600 leading-7 mb-4">
              There are lots of students in India who dream of studying, working or living abroad. But it is not as easy as it seems.
              It requires hard work and proper guidance. Today, it is a challenge for students to search for a trustworthy study visa consultant.
              Most students are unsure whether their visa consultants are genuine or not.
            </p>
            <p className="text-gray-600 leading-7 mb-4">
              Here at International Institute of Languages (IIL), we promise to provide accurate advice about study visas, work permits,
              visitor visas, and PR related to your profile. IIL is a registered and certified immigration consultancy established in Moradabad.
            </p>
            <p className="text-[#0b4e80] font-semibold leading-7">
              We have tie-ups with highly reputed professionals, colleges, and universities in Canada, Australia, New Zealand,
              the USA/UK, Portugal, Ireland, Poland, Singapore, Cyprus, Sweden, Germany, France, and many more countries.
            </p>
          </div>
          <div className="relative animate-fade-in-right">
            <img
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=600&fit=crop"
              alt="Students"
              className="rounded-2xl shadow-xl w-full h-[350px] object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-gradient-to-r from-[#0b4e80] to-[#0a2d4d] rounded-3xl p-8 md:p-12 mb-12 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
            Why Choose IIL?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition">
              <CheckCircle className="h-12 w-12 text-[#ff7189] mx-auto mb-4" />
              <h3 className="text-white font-bold text-lg mb-2">Certified Consultants</h3>
              <p className="text-slate-200 text-sm">Registered and certified immigration consultancy with proven track record</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition">
              <Globe className="h-12 w-12 text-[#ff7189] mx-auto mb-4" />
              <h3 className="text-white font-bold text-lg mb-2">Global Network</h3>
              <p className="text-slate-200 text-sm">Partnerships with top universities across 20+ countries worldwide</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition">
              <Users className="h-12 w-12 text-[#ff7189] mx-auto mb-4" />
              <h3 className="text-white font-bold text-lg mb-2">Expert Team</h3>
              <p className="text-slate-200 text-sm">Dedicated counsellors with years of field experience</p>
            </div>
          </div>
        </div>

        {/* Coaching Section */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 text-center animate-fade-in">
            Our Language Coaching Programs
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="animate-fade-in-left">
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="bg-[#0b4e80] text-white px-4 py-2 rounded-full text-sm font-semibold">IELTS</span>
                <span className="bg-[#ff4f6d] text-white px-4 py-2 rounded-full text-sm font-semibold">PTE</span>
                <span className="bg-[#0b8393] text-white px-4 py-2 rounded-full text-sm font-semibold">TOEFL</span>
                <span className="bg-[#ff7189] text-white px-4 py-2 rounded-full text-sm font-semibold">Spoken English</span>
              </div>
              <p className="text-gray-600 leading-7 mb-4">
                IIL has centres in Moradabad to prepare you for the language ability tests. Our IELTS, PTE, and spoken English trainers
                possess incomparable expertise and teaching skills. We have a team of IDP and British Council-certified faculty.
              </p>
              <p className="text-gray-600 leading-7 mb-4">
                We have designed the curriculum and followed the teaching techniques that are suitable for every student.
                We offer online and offline coaching, allowing them to get the desired band score.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Star className="h-5 w-5 text-[#ff7189]" />
                  <span className="text-gray-700">Extra grammar improvement classes</span>
                </div>
                <div className="flex items-center gap-3">
                  <Star className="h-5 w-5 text-[#ff7189]" />
                  <span className="text-gray-700">Multimedia classes with modern facilities</span>
                </div>
                <div className="flex items-center gap-3">
                  <Star className="h-5 w-5 text-[#ff7189]" />
                  <span className="text-gray-700">Up-to-date library of study material</span>
                </div>
                <div className="flex items-center gap-3">
                  <Star className="h-5 w-5 text-[#ff7189]" />
                  <span className="text-gray-700">Weekly mock tests for practice analysis</span>
                </div>
              </div>
            </div>
            <div className="relative animate-fade-in-right">
              <img
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=600&fit=crop"
                alt="Classroom"
                className="rounded-2xl shadow-xl w-full h-[350px] object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center border-2 border-slate-100 hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-fade-in">
            <GraduationCap className="h-10 w-10 text-[#0b4e80] mx-auto mb-3" />
            <h3 className="text-3xl font-bold text-slate-900">5000+</h3>
            <p className="text-gray-600 text-sm">Students Placed</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center border-2 border-slate-100 hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <Globe className="h-10 w-10 text-[#ff4f6d] mx-auto mb-3" />
            <h3 className="text-3xl font-bold text-slate-900">20+</h3>
            <p className="text-gray-600 text-sm">Countries</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center border-2 border-slate-100 hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Users className="h-10 w-10 text-[#0b8393] mx-auto mb-3" />
            <h3 className="text-3xl font-bold text-slate-900">50+</h3>
            <p className="text-gray-600 text-sm">Expert Trainers</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center border-2 border-slate-100 hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Award className="h-10 w-10 text-[#ff7189] mx-auto mb-3" />
            <h3 className="text-3xl font-bold text-slate-900">98%</h3>
            <p className="text-gray-600 text-sm">Success Rate</p>
          </div>
        </div>

        {/* Offices Section */}
        <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl p-8 md:p-12 animate-fade-in-up">
          <div className="text-center mb-10">
            <p className="text-[#0b4e80] font-semibold text-lg mb-2">
              We are Professional Experts in Immigration Visa
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Our Offices
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Office Selector */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-[#0b4e80] text-white px-6 py-4 font-bold">
                Select Office
              </div>
              <div className="p-4">
                {offices.map((office) => (
                  <button
                    key={office.id}
                    onClick={() => setActiveOffice(office.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl mb-2 font-semibold transition-all ${
                      activeOffice === office.id
                        ? "bg-[#0b4e80] text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {office.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Office Details */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:col-span-2">
              {activeOfficeData && (
                <>
                  <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                    <MapPin className="h-6 w-6 text-[#ff7189]" />
                    {activeOfficeData.name} Office
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-[#0b4e80] mt-1 shrink-0" />
                        <span className="text-gray-700">{activeOfficeData.address}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-[#0b4e80]" />
                        <span className="text-gray-700">{activeOfficeData.hours}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-[#0b4e80]" />
                        <a href={`mailto:${activeOfficeData.email}`} className="text-[#0b4e80] hover:underline">
                          {activeOfficeData.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-[#0b4e80]" />
                        <a href={`tel:${activeOfficeData.phone}`} className="text-gray-700">
                          {activeOfficeData.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-3">
                        <Globe className="h-5 w-5 text-green-500" />
                        <a href={`https://wa.me/${activeOfficeData.whatsapp.replace(/[^0-9]/g, '')}`} className="text-green-600 hover:underline">
                          WhatsApp: {activeOfficeData.whatsapp}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Map */}
                  <div className="mt-6 rounded-2xl overflow-hidden shadow-lg">
                    <iframe
                      src="https://www.google.com/maps?q=Moradabad&output=embed"
                      width="100%"
                      height="250"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-left {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fade-in-right {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }
        .animate-fade-in-left {
          animation: fade-in-left 0.8s ease-out;
        }
        .animate-fade-in-right {
          animation: fade-in-right 0.8s ease-out;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
      `}</style>

    </div>
  );
}