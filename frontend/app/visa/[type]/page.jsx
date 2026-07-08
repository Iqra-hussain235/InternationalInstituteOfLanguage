"use client";
import { useParams } from "next/navigation";
import Link from "next/link";

const visaData = {
  study: {
    title: "Study Visa", bgColor: "#c0392b",
    subtitle: "Start Your Academic Journey Abroad",
    description: "Get expert guidance for your student visa. We help you with applications, documents & admissions for top countries worldwide.",
    countries: ["Canada","Australia","United Kingdom","United States","New Zealand","Ireland","France","Denmark","Netherlands","Czech Republic","Latvia","Lithuania","Poland"],
  },
  visitor: {
    title: "Visitor Visa", bgColor: "#1a5276",
    subtitle: "Explore the World With Ease",
    description: "Visit Canada, Australia, USA, New Zealand, UK, and Europe as a tourist. We make it hassle-free.",
    countries: ["Canada","Australia","United Kingdom","United States","New Zealand","Germany","Dubai","Thailand"],
  },
  work: {
    title: "Work Visa", bgColor: "#1e8449",
    subtitle: "Build Your Career Internationally",
    description: "Explore work visa opportunities across the globe. We guide you through employer sponsorships and documentation.",
    countries: ["Australia","Canada","Germany","United Kingdom","Dubai","Greece","Saudi Arabia"],
  },
  dependent: {
    title: "Dependent Visa", bgColor: "#6c3483",
    subtitle: "Keep Your Family Together",
    description: "We support in getting dependent visas for joining all family members together abroad.",
    countries: ["Canada","Australia","United Kingdom","United States","New Zealand"],
  },
  spouse: {
    title: "Spouse Visa", bgColor: "#784212",
    subtitle: "Live With Your Partner Abroad",
    description: "A spouse visa allows you to live with your partner. We help with eligibility check and complete application process.",
    countries: ["Canada","Australia","United Kingdom","United States","New Zealand"],
  },
  pr: {
    title: "Permanent Residency", bgColor: "#1a252f",
    subtitle: "Make Your Dream Country Your Home",
    description: "Our experts guide you through every step of the PR journey for your chosen country.",
    countries: ["Australia","Canada"],
  },
  tour: {
    title: "Tour Package", bgColor: "#d35400",
    subtitle: "Discover Your Dream Destinations",
    description: "We help you travel smart with hassle-free planning, expert guidance, and memorable experiences.",
    countries: [],
  },
};

export default function VisaTypePage() {
  const params = useParams();
  const type = params?.type;
  const data = visaData[type] || { title: type, bgColor: "#c0392b", subtitle: "", description: "", countries: [] };

  return (
    <div style={{ minHeight: "100vh", background: "white" }}>

      {/* HERO */}
      <section style={{ background: data.bgColor, color: "white", padding: "64px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", alignItems: "center" }}>
          <div>
            <p style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.2em", opacity: 0.7, marginBottom: "8px" }}>International Institute Of Language</p>
            <h1 style={{ fontSize: "48px", fontWeight: "800" }}>{data.title}</h1>
            <p style={{ marginTop: "12px", fontSize: "20px", opacity: 0.85 }}>{data.subtitle}</p>
            <p style={{ marginTop: "12px", fontSize: "15px", opacity: 0.75, maxWidth: "460px" }}>{data.description}</p>
            <div style={{ marginTop: "32px", display: "flex", gap: "8px", maxWidth: "420px" }}>
              <div style={{ flex: 1, display: "flex", border: "1px solid rgba(255,255,255,0.3)", borderRadius: "8px", overflow: "hidden", background: "rgba(255,255,255,0.1)" }}>
                <span style={{ padding: "12px", borderRight: "1px solid rgba(255,255,255,0.3)", fontSize: "13px" }}>+91 - IN</span>
                <input type="tel" placeholder="Enter Phone Number" style={{ flex: 1, background: "transparent", border: "none", padding: "12px", color: "white", outline: "none", fontSize: "13px" }} />
              </div>
              <button style={{ background: "white", color: "#333", fontWeight: "700", padding: "12px 20px", borderRadius: "8px", border: "none", cursor: "pointer" }}>→</button>
            </div>
            <label style={{ marginTop: "12px", display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", opacity: 0.6 }}>
              <input type="checkbox" /> I agree to receive promotional SMS, Email, WhatsApp & RCS messages.
            </label>
          </div>
          <div style={{ borderRadius: "16px", border: "4px solid rgba(255,255,255,0.2)", aspectRatio: "4/3", background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.4)", fontSize: "14px" }}>
            [ Visa Banner Image ]
          </div>
        </div>
      </section>

      {/* COUNTRIES */}
      {data.countries.length > 0 && (
        <section style={{ padding: "56px 24px", background: "#f9fafb" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <p style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.2em", color: data.bgColor, textAlign: "center", marginBottom: "8px" }}>Choose Destination</p>
            <h2 style={{ fontSize: "32px", fontWeight: "700", color: "#1f2937", textAlign: "center", marginBottom: "40px" }}>Top Countries for {data.title}</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
              {data.countries.map((country) => (
                <Link key={country} href={`/visa/${type}/${country.toLowerCase().replace(/\s+/g, "-")}`}
                  style={{ display: "flex", alignItems: "center", gap: "12px", background: "white", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "16px 20px", textDecoration: "none", color: "#374151", fontWeight: "600", fontSize: "14px", transition: "all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = data.bgColor; e.currentTarget.style.color = data.bgColor; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.color = "#374151"; }}
                >
                  🌍 {country}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* WHY CHOOSE US */}
      <section style={{ padding: "56px 24px", background: "white" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.2em", color: data.bgColor, marginBottom: "8px" }}>Why Us</p>
          <h2 style={{ fontSize: "32px", fontWeight: "700", color: "#1f2937", marginBottom: "40px" }}>Why Choose IIL for {data.title}?</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
            {[
              { icon: "🎯", title: "Expert Guidance", desc: "Dedicated counselors with years of visa processing experience." },
              { icon: "📄", title: "Documentation Support", desc: "Complete help with SOP, financial docs, and application filing." },
              { icon: "✅", title: "High Success Rate", desc: "Thousands of successful visa approvals across all countries." },
            ].map((item) => (
              <div key={item.title} style={{ background: "#f9fafb", borderRadius: "16px", padding: "28px", border: "1px solid #e5e7eb" }}>
                <div style={{ fontSize: "36px", marginBottom: "16px" }}>{item.icon}</div>
                <h3 style={{ fontWeight: "700", color: "#1f2937", marginBottom: "8px" }}>{item.title}</h3>
                <p style={{ fontSize: "13px", color: "#6b7280", lineHeight: "1.7" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: data.bgColor, color: "white", padding: "56px 24px", textAlign: "center" }}>
        <h2 style={{ fontSize: "32px", fontWeight: "700", marginBottom: "16px" }}>Ready to Apply for {data.title}?</h2>
        <p style={{ opacity: 0.8, marginBottom: "32px" }}>Talk to our experts today and start your journey with confidence.</p>
        <Link href="/enquiry" style={{ background: "white", color: data.bgColor, fontWeight: "700", padding: "16px 32px", borderRadius: "50px", textDecoration: "none" }}>
          Enquire Now →
        </Link>
      </section>

    </div>
  );
}