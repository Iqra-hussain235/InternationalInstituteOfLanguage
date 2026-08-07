"use client";

import { GraduationCap, Globe, Users, Award, BookOpen, MapPin, Phone, Mail, Star, CheckCircle, TrendingUp } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="w-full bg-gradient-to-b from-slate-50 to-white">

      {/* Hero Section with Image */}
      <div className="relative w-full h-[350px] md:h-[450px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1600&h=800&fit=crop"
          alt="About Banner"
          className="w-full h-full object-cover animate-fade-in"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071a32]/95 to-[#0a2d4d]/80" />
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <div className="text-center max-w-4xl animate-slide-up">
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4">
              About <span className="text-[#ff7189]">International Institute Of Languages & Study Abroad</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-200">
              Your Gateway to Global Education & Language Excellence
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 md:px-16 py-6 max-w-7xl mx-auto">

        {/* Introduction Section */}
        <div className="grid md:grid-cols-2 gap-6 items-center mb-8">
          <div className="animate-fade-in-left">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Best Immigration And Visa Consultants
            </h2>
            <p className="text-gray-600 leading-7 mb-4">
              There are lots of students in India who dream of studying, working or living abroad. 
              But it is not as easy as it seems. It requires hard work and proper guidance. 
              At International Institute of Languages, we provide trusted study visa consultancy 
              and help students achieve their dreams.
            </p>
            <p className="text-gray-600 leading-7">
              We guide students in every step of the visa process — from counselling to pre-departure. 
              Our experienced team ensures a smooth journey for studying abroad in countries like 
              UK, Canada, Australia, USA and more.
            </p>
          </div>
          <div className="relative animate-fade-in-right">
            <img
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=600&fit=crop"
              alt="Students"
              className="rounded-2xl shadow-xl w-full h-[280px] object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-5 shadow-lg text-center border-2 border-slate-100 hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-fade-in">
            <GraduationCap className="h-10 w-10 text-[#0b4e80] mx-auto mb-3" />
            <h3 className="text-3xl font-bold text-slate-900">5000+</h3>
            <p className="text-gray-600 text-sm">Students Placed</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-lg text-center border-2 border-slate-100 hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <Globe className="h-10 w-10 text-[#ff4f6d] mx-auto mb-3" />
            <h3 className="text-3xl font-bold text-slate-900">15+</h3>
            <p className="text-gray-600 text-sm">Countries</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-lg text-center border-2 border-slate-100 hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Users className="h-10 w-10 text-[#0b8393] mx-auto mb-3" />
            <h3 className="text-3xl font-bold text-slate-900">50+</h3>
            <p className="text-gray-600 text-sm">Expert Trainers</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-lg text-center border-2 border-slate-100 hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Award className="h-10 w-10 text-[#ff7189] mx-auto mb-3" />
            <h3 className="text-3xl font-bold text-slate-900">98%</h3>
            <p className="text-gray-600 text-sm">Success Rate</p>
          </div>
        </div>

        {/* Certificate Section */}
        <div className="relative rounded-3xl p-6 md:p-10 mb-8 animate-fade-in-up overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/certificate.jpeg"
              alt="Certificate Background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0b4e80]/95 to-[#0a2d4d]/90" />
          </div>
          <div className="relative grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 flex items-center gap-3">
                <Award className="h-8 w-8 text-[#ff7189]" />
                Certified Excellence
              </h2>
              <p className="text-slate-200 leading-7 mb-4">
                We are a certified institute with recognized accreditations. Our commitment to quality education 
                and student success has earned us numerous certifications and partnerships with international universities.
              </p>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-white text-sm">
                  <CheckCircle className="h-4 w-4" />
                  ISO Certified
                </div>
                <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-white text-sm">
                  <Star className="h-4 w-4" />
                  British Council Partner
                </div>
                <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-white text-sm">
                  <TrendingUp className="h-4 w-4" />
                  IDP Authorized
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="/certificate.jpeg"
                alt="Certificate"
                className="rounded-2xl shadow-xl w-full h-[250px] object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>

        {/* IELTS Coaching Section */}
        <div className="bg-gradient-to-r from-[#071a32] to-[#0a2d4d] rounded-3xl p-6 md:p-10 mb-8 animate-fade-in-up">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                IELTS, PTE, TOEFL & Spoken English
              </h2>
              <p className="text-slate-200 leading-7 mb-4">
                We provide top-quality coaching for IELTS, PTE, TOEFL and Spoken English. 
                Our expert trainers help students improve reading, writing, listening, and speaking skills. 
                We offer both online and offline classes with regular mock tests and updated study material.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-white/30 transition">IELTS</span>
                <span className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-white/30 transition">PTE</span>
                <span className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-white/30 transition">TOEFL</span>
                <span className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-white/30 transition">Spoken English</span>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=600&fit=crop"
                alt="Classroom"
                className="rounded-2xl shadow-xl w-full h-[220px] object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 text-center animate-fade-in">
            Our Services
          </h2>
          <div className="grid md:grid-cols-3 gap-5">
            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-slate-100 hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-fade-in">
              <BookOpen className="h-12 w-12 text-[#0b4e80] mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Study Visa Consultation</h3>
              <p className="text-gray-600 text-sm">Expert guidance for study visa applications to top universities worldwide.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-slate-100 hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <GraduationCap className="h-12 w-12 text-[#ff4f6d] mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Language Training</h3>
              <p className="text-gray-600 text-sm">Comprehensive coaching for IELTS, PTE, TOEFL and Spoken English.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-slate-100 hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <Globe className="h-12 w-12 text-[#0b8393] mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Immigration Services</h3>
              <p className="text-gray-600 text-sm">Complete immigration support for work permits and permanent residency.</p>
            </div>
          </div>
        </div>

        {/* Offices Section */}
        <div className="text-center mb-6 animate-fade-in">
          <h2 className="text-3xl font-bold text-[#0b4e80] mb-2">
            Our Offices
          </h2>
          <p className="text-gray-500">
            We are expanding across multiple cities to serve you better.
          </p>
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
