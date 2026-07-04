"use client";
import { useParams } from "next/navigation";
import Link from "next/link";

const countryData = {
  canada: {
    title: "Study In Canada", bgColor: "#c0392b",
    subtitle: "Grab the best Canadian study options to reach the pinnacle of your career. Let us take care of your dreams.",
    intro: "According to a recent report, Indian students ranked second based on the number of students that migrate yearly to study in Canada for high-quality education. Canada is well-known for its finest education system and actively strives to attract international students. The Canadian government wants to double the number of international students in Canada in the coming years.",
    images: ["/canada-banner.jpg", "/canada-university.jpg", "/canada-visa.jpg"],
    facts: [
      { label: "Total Area", value: "9.98 Million km²" },
      { label: "Capital", value: "Ottawa" },
      { label: "Population", value: "3.82 Crores" },
      { label: "Currency", value: "Canadian Dollar" },
      { label: "Languages", value: "English & French" },
      { label: "Annual Fee", value: "CA$18,000–20,000" },
    ],
    whyStudy: [
      { title: "Top Universities & Colleges", desc: "University of Toronto, UBC, and University of Alberta rank globally. Students with Canadian degrees get job opportunities worldwide." },
      { title: "Low Cost of Studying", desc: "Canada is less expensive than UK, Australia, and USA. Average study costs range from CA$18,000 to CA$20,000 per year." },
      { title: "Scholarships Available", desc: "Canada Graduate Scholarships, IDRC Research Awards, Banting Postdoctoral Fellowships, NSERC Postgraduate Scholarships and more." },
      { title: "Work While Studying", desc: "IRCC permits international students to work on-campus and off-campus during the course without any work permit." },
      { title: "Post-Graduation Work Permit", desc: "PGWP allows students to work in Canada for up to three years after graduation without any restrictions." },
      { title: "PR & Immigration Benefits", desc: "Express Entry is a fast-processing PR program. Spouse and dependent VISA schemes also allow students to unite with families." },
    ],
    requirements: [
      "Valid Passport (6+ months validity)",
      "Letter of Acceptance from DLI",
      "Proof of Funds — GIC (CAD $20,635)",
      "IELTS 6.0 / PTE 60 / TOEFL 80-90",
      "Statement of Purpose (SOP)",
      "Letter of Recommendation (LOR)",
      "Medical Certificate",
      "Provincial Attestation Letter (PAL)",
    ],
    process: [
      { step: "01", title: "Get Letter of Acceptance", desc: "Apply to a Designated Learning Institution (DLI). Apply to at least 2-3 colleges simultaneously." },
      { step: "02", title: "Arrange Documents", desc: "Gather GIC, SOP, LOR, financial proof, and language test scores." },
      { step: "03", title: "Apply Online on IRCC", desc: "Create account on IRCC website and fill the application carefully." },
      { step: "04", title: "Pay Fees", desc: "Application fee: CA$150 + Biometrics fee: CA$85." },
      { step: "05", title: "Biometrics Appointment", desc: "Visit biometric collection office within 30 days of receiving the letter." },
      { step: "06", title: "Receive Visa Decision", desc: "Processing takes up to 14 weeks. Get Letter of Introduction and eTA." },
    ],
    universities: [
      { name: "Sault College", province: "Ontario", city: "Sault Marie" },
      { name: "Conestoga College", province: "Ontario", city: "Kitchener" },
      { name: "Seneca College", province: "Ontario", city: "Toronto" },
      { name: "Sheridan College", province: "Ontario", city: "Oakville" },
      { name: "Cape Breton University", province: "Nova Scotia", city: "Nova Scotia" },
      { name: "Vancouver Community College", province: "British Columbia", city: "Vancouver" },
      { name: "Kwantlen Polytechnic University", province: "British Columbia", city: "Surrey" },
      { name: "University of Lethbridge", province: "Alberta", city: "Lethbridge" },
    ],
  },
  australia: {
    title: "Study In Australia", bgColor: "#1a5276",
    subtitle: "Discover new opportunities for education in Australia and fly beyond your expectations. Let us help you!",
    intro: "Australia has fascinated the third largest number of international students to visit and get educated in Australia. Around 400,000 overseas students each year study in Australia at the most prominent universities, colleges, and institutes. Australia incorporates 41 government-recognized Universities and many TAFE Institutions. Canberra is the Capital of Australia.",
    images: ["/australia-banner.jpg", "/australia-university.jpg", "/australia-visa.jpg"],
    facts: [
      { label: "Capital", value: "Canberra" },
      { label: "Universities", value: "41 Govt. Recognized" },
      { label: "Courses", value: "22,000+" },
      { label: "Work Hours", value: "48hrs/Fortnight" },
      { label: "Living Cost", value: "AUD 29,710/yr" },
      { label: "Visa Fee", value: "AUD 2,000" },
    ],
    whyStudy: [
      { title: "Legal Protection (ESOS Act)", desc: "The Australian Government ensures international students receive quality education and are protected under law through the ESOS Act." },
      { title: "World-Class Universities", desc: "Australian universities are renowned for technology-based education and research. Professors are industry veterans from around the world." },
      { title: "Work While Studying", desc: "Students can work 48 hours per fortnight during studies. During vocational breaks and holidays, unlimited working hours are permitted." },
      { title: "Affordable Costs", desc: "Living expenses and tuition fees in Australia are relatively cost-effective compared to UK or USA. Bachelor degree costs AUD 20,000–45,000/year." },
      { title: "Post-Study Work Rights", desc: "Apply for Temporary Graduate Visa (subclass 485) after completing bachelor's, master's, or doctorate — work 18 months to 4 years." },
      { title: "Scholarships Available", desc: "Australia Awards, Destination Australia (up to $15,000/year), RTP scholarships, and many provider scholarships available." },
    ],
    requirements: [
      "Valid Passport",
      "Electronic Confirmation of Enrolment (eCoE)",
      "IELTS 6.0 / PTE 50 / TOEFL 64",
      "Proof of Funds — AUD 29,710/year",
      "Overseas Student Health Cover (OSHC) — AUD 1,400/year",
      "Genuine Student (GS) Requirement",
      "Statement of Purpose (SOP)",
      "Medical Examination via HAP ID",
    ],
    process: [
      { step: "01", title: "Enroll in University", desc: "Apply online to preferred Australian university. Submit academic certificates, IELTS/PTE scores, SOP, and passport copy." },
      { step: "02", title: "Get Conditional Offer Letter", desc: "University reviews your application. Meet Genuine Student (GS) requirement. Interview lasts 2-5 minutes." },
      { step: "03", title: "Pay Fees & Get COE", desc: "Pay 6-month tuition fees + OSHC (AUD 1,400). Receive Confirmation of Enrolment (COE) by email." },
      { step: "04", title: "Lodge Visa Application", desc: "Apply online via ImmiAccount. Upload all documents and pay AUD 2,000 visa fee by credit card only." },
      { step: "05", title: "Medical Examination", desc: "Complete medical exam via HAP ID with Immigration-approved doctor. Costs approx. INR 6,000–10,000." },
      { step: "06", title: "Final Visa Decision", desc: "Processing takes 3-5 months. Visa valid for entire study duration including holiday periods." },
    ],
    universities: [
      { name: "Australian National University", province: "ACT", city: "Canberra" },
      { name: "University of Sydney", province: "New South Wales", city: "Sydney" },
      { name: "University of New South Wales", province: "New South Wales", city: "Sydney" },
      { name: "University of Melbourne", province: "Victoria", city: "Melbourne" },
      { name: "Monash University", province: "Victoria", city: "Melbourne" },
      { name: "University of Queensland", province: "Queensland", city: "Brisbane" },
      { name: "University of Western Australia", province: "Western Australia", city: "Perth" },
      { name: "University of Adelaide", province: "South Australia", city: "Adelaide" },
      { name: "Flinders University", province: "South Australia", city: "Adelaide" },
      { name: "University of Tasmania", province: "Tasmania", city: "Hobart" },
      { name: "Charles Darwin University", province: "Northern Territory", city: "Darwin" },
      { name: "Curtin University", province: "Western Australia", city: "Perth" },
    ],
  },
  "united-kingdom": {
    title: "Study In United Kingdom", bgColor: "#1a252f",
    subtitle: "It's high time to turn your dreams into reality. Firm your decision to pursue education in the UK. We are ready to serve you!",
    intro: "The UK is one of the most promising countries in the world, known for its extraordinary academic excellence and broad career scope. The UK is known for its vast culture, heritage, and superior education system. There are more than 150 Universities in the UK having world-level recognition. UK ranked the World's sixth-largest economy and is considered the most globalized country in the world.",
    images: ["/uk-banner.jpg", "/uk-university.jpg", "/uk-visa.jpg"],
    facts: [
      { label: "Capital", value: "London" },
      { label: "Population", value: "6.87 Crores" },
      { label: "Total Area", value: "243,610 km²" },
      { label: "Visa Fee", value: "GBP 363" },
      { label: "IHS Cost", value: "£1,035/year" },
      { label: "Universities", value: "150+" },
    ],
    whyStudy: [
      { title: "World's 6th Largest Economy", desc: "UK ranked the World's sixth-largest economy (nominal GDP) and is considered the most globalized country in the world." },
      { title: "Worldwide Degree Recognition", desc: "Degrees approved by Quality Assurance Agencies like QAA, RAE, EQUIS, AMBA, OFSTED, SQA — recognized globally." },
      { title: "Short Duration Courses", desc: "Undergraduate courses: 3 years. Postgraduate Degree including MBA: just 1 year — making education affordable." },
      { title: "Gateway to Europe", desc: "The UK is the perfect gateway to get entry into Europe with vast career opportunities in every sector." },
      { title: "Scholarships Available", desc: "British universities offer many scholarships to cover course fees and living expenses based on course type and university." },
      { title: "Multicultural Nation", desc: "The UK is a multicultural nation that gives equality to every religion with creative, innovative, and skills-oriented teaching." },
    ],
    requirements: [
      "Valid Passport",
      "Confirmation of Acceptance for Studies (CAS)",
      "IELTS / English Proficiency (CEFR B2 level)",
      "Proof of Funds — London: £13,347 / Outside: £10,224",
      "Funds must be 28 days old",
      "Immigration Healthcare Surcharge (IHS) — £1,035/year",
      "TB Test Certificate — approx. INR 2,500",
      "Guardian Permission (if below 18)",
    ],
    process: [
      { step: "01", title: "Get Admission & CAS", desc: "Apply to UK university. On paying tuition fees after unconditional offer letter, get CAS (Confirmation of Acceptance for Studies)." },
      { step: "02", title: "Arrange Funds", desc: "Show course fees + living expenses. London: £13,347/year. Outside London: £10,224/year. Funds must be 28 days old." },
      { step: "03", title: "Pay IHS & TB Test", desc: "Pay Immigration Healthcare Surcharge (£1,035/year) online. Complete TB test — costs approx. INR 2,500." },
      { step: "04", title: "Apply Online", desc: "Apply for UK Student Visa online at official website. Visa fee: GBP 363 from outside UK." },
      { step: "05", title: "Submit Documents", desc: "Upload passport, CAS letter, financial proof, IELTS score, and all supporting documents." },
      { step: "06", title: "Visa Decision", desc: "From outside UK: decision in 3 weeks. From inside UK: decision in 8 weeks." },
    ],
    universities: [
      { name: "University of Oxford", province: "England", city: "Oxford" },
      { name: "University of Cambridge", province: "England", city: "Cambridge" },
      { name: "Imperial College London", province: "England", city: "London" },
      { name: "King's College London", province: "England", city: "London" },
      { name: "University of Edinburgh", province: "Scotland", city: "Edinburgh" },
      { name: "Coventry University", province: "England", city: "Coventry" },
      { name: "Middlesex University", province: "England", city: "London" },
      { name: "Anglia Ruskin University", province: "England", city: "Cambridge" },
      { name: "University of Northampton", province: "England", city: "Northampton" },
      { name: "Bath Spa University", province: "England", city: "Bath" },
      { name: "Newcastle University", province: "England", city: "Newcastle" },
      { name: "Queen's University Belfast", province: "Northern Ireland", city: "Belfast" },
    ],
  },
  "united-states": {
    title: "Study In United States", bgColor: "#154360",
    subtitle: "The ultra-modern education system of the United States catches the huge attention of international students. Quality education, latest trend curriculum, and endless career opportunities await you.",
    intro: "The USA is considered to be the hub of the world's largest universities and colleges. There are around 4,000 universities and colleges, many of which rank in the top 100 universities globally. Harvard University, Massachusetts Institute of Technology (MIT), University of Chicago, and California Institute of Technology are a few of them. US degrees carry a huge value all over the world.",
    images: ["/usa-banner.jpg", "/usa-university.jpg", "/usa-visa.jpg"],
    facts: [
      { label: "Universities", value: "4,000+" },
      { label: "SEVIS Fee", value: "USD 350" },
      { label: "Visa Fee", value: "USD 185" },
      { label: "Fall Intake", value: "Aug/Sep" },
      { label: "Spring Intake", value: "January" },
      { label: "Summer Intake", value: "May" },
    ],
    whyStudy: [
      { title: "Academic Brilliance", desc: "USA has 4,000+ universities and colleges, many ranking in the top 100 globally. Harvard, MIT, University of Chicago are among the best." },
      { title: "Diversity of Programs", desc: "Numerous study programs available — students can choose any course per their interest and pursue different methods simultaneously." },
      { title: "Practical Skills Education", desc: "USA study programs offer students practical knowledge and skills mandatory to survive in the workplace with huge job opportunities." },
      { title: "Scholarship Opportunities", desc: "Students are offered up to 100% scholarships in the USA. UEFA and AAUW International Fellowships are popular scholarship options." },
      { title: "CPT & OPT Work Rights", desc: "CPT (internship) and OPT (post-study work) programs assist students with work rights — on-campus and off-campus during/after studies." },
      { title: "Globally Accepted Degrees", desc: "US degrees carry huge value worldwide. Global employers prefer candidates with certifications from US universities or colleges." },
    ],
    requirements: [
      "Valid Passport (6+ months beyond stay)",
      "I-20 Letter from SEVP-certified university",
      "SEVIS I-901 Fee Receipt — USD 350",
      "DS-160 Form Confirmation",
      "IELTS 6.0-6.5 / TOEFL 71-80 / GRE/GMAT",
      "Proof of Funds (bank statement/scholarship)",
      "SOP + 2-3 LOR + Resume",
      "Visa Application Fee — USD 185",
    ],
    process: [
      { step: "01", title: "Apply to SEVP-Certified University", desc: "Apply to 3-4 universities with proper documentation. Application fees range between USD 100-200. Receive confirmed enrolment letter." },
      { step: "02", title: "Receive I-20 from University", desc: "After acceptance, receive I-20 form — the most crucial document for USA visa process. Takes around 40-45 business days." },
      { step: "03", title: "Pay SEVIS I-901 Fee", desc: "Pay non-refundable SEVIS fee of USD 350 online at Fmjfee.com using your SEVIS ID from I-20 letter." },
      { step: "04", title: "Fill DS-160 Form", desc: "Fill DS-160 online non-immigrant visa application at Ceac.state.gov carefully. Print confirmation with barcode." },
      { step: "05", title: "Book Interview & Pay Visa Fee", desc: "Visit Ustraveldocs.com, pay USD 185 visa fee, and book interview slot at nearest US Embassy (Delhi, Mumbai, Chennai, Kolkata)." },
      { step: "06", title: "Attend Biometrics & Interview", desc: "Visit Embassy for biometrics one day before interview. Attend visa interview confidently — approval depends on your performance." },
    ],
    universities: [
      { name: "Harvard University", province: "Massachusetts", city: "Cambridge" },
      { name: "Massachusetts Institute of Technology", province: "Massachusetts", city: "Cambridge" },
      { name: "University of Chicago", province: "Illinois", city: "Chicago" },
      { name: "California Institute of Technology", province: "California", city: "Pasadena" },
      { name: "Stanford University", province: "California", city: "Stanford" },
      { name: "Columbia University", province: "New York", city: "New York" },
      { name: "University of Pennsylvania", province: "Pennsylvania", city: "Philadelphia" },
      { name: "Yale University", province: "Connecticut", city: "New Haven" },
      { name: "Princeton University", province: "New Jersey", city: "Princeton" },
      { name: "University of California", province: "California", city: "Berkeley" },
    ],
  },
  "new-zealand": {
    title: "Study In New Zealand", bgColor: "#006B54",
    subtitle: "New Zealand: The best study abroad destination. Don't miss the opportunity to enroll in the upcoming intake. Inquiry today!",
    intro: "New Zealand is one of the most preferred study destinations for Indian students. Nature blesses New Zealand with the first touch of the Sun rays and the beginning of the day. It is one of the most vibrant places in the world, where you'll enjoy ancient forests, mind-blowing landscapes, and stunning coastlines. Every student who wants to experience life beyond classroom walls may enjoy enduring experiences by living and studying in New Zealand.",
    images: ["/nz-banner.jpg", "/nz-university.jpg", "/nz-visa.jpg"],
    facts: [
      { label: "Capital", value: "Wellington" },
      { label: "Total Area", value: "2,68,021 km²" },
      { label: "Population", value: "4.72 Million" },
      { label: "Currency", value: "NZD" },
      { label: "Languages", value: "English, Maori" },
      { label: "Work Rights", value: "25 hrs/week" },
    ],
    whyStudy: [
      { title: "High-Quality Education", desc: "New Zealand is famous for some of the best universities in the world, with substantial prestige for high-quality studies and cutting-edge services." },
      { title: "Low Tuition Fees", desc: "Compared to other popular study destinations, the cost of tuition in New Zealand is relatively inexpensive, making it a good option for students." },
      { title: "Safe & Welcoming", desc: "New Zealand is famous for its friendly and warm culture. The country is consistently ranked as one of the safest in the world." },
      { title: "Nature-Blessed Country", desc: "New Zealand is renowned for its spectacular natural landscapes, including mountains, beaches, and forests — perfect for outdoor lovers." },
      { title: "Work Opportunities", desc: "Indian students in New Zealand can work up to 25 hours per week during term time and full-time during weekends to offset living costs." },
      { title: "Cultural Diversity", desc: "New Zealand is a multicultural country with a rich history. Studying here presents an opportunity to learn about different cultures worldwide." },
    ],
    requirements: [
      "Valid Passport (3+ months beyond departure)",
      "Offer Letter from recognized NZ university",
      "IELTS 5.5–7.0 (as per program level)",
      "Proof of Funds (Tuition + Living expenses)",
      "Medical Certificate & Chest X-ray",
      "Police Clearance Certificate (PCC)",
      "SOP + LOR + Resume",
      "Visa Application Fee — DD Rs. 14,300",
    ],
    process: [
      { step: "01", title: "Choose Course & University", desc: "Select an appropriate course and trusted education provider. Apply for admission with necessary documents and IELTS score." },
      { step: "02", title: "Arrange Funds", desc: "Arrange funds to support education, living expenses, and study costs. Prepare funds proof for embassy submission." },
      { step: "03", title: "Medical Test & PCC", desc: "Get medical examination from Immigration NZ approved doctor. Collect Police Clearance Certificate from Regional Passport office." },
      { step: "04", title: "Lodge Visa Application", desc: "Submit visa application online 8 weeks before course start. Attach academic qualifications, funds proof, and supporting documents." },
      { step: "05", title: "Fund Transfer Scheme (FTS)", desc: "Pay 1-year living expenses to ANZ Bank NZ and 1-year tuition fee directly to institution under the FTS scheme." },
      { step: "06", title: "Visa Outcome", desc: "Processing takes around 8 weeks. You'll be notified via email and receive E-Visa. Ready to fly to New Zealand!" },
    ],
    universities: [
      { name: "University of Auckland", province: "Auckland", city: "Auckland" },
      { name: "University of Otago", province: "Otago", city: "Dunedin" },
      { name: "Auckland University of Technology", province: "Auckland", city: "Auckland" },
      { name: "University of Canterbury", province: "Canterbury", city: "Christchurch" },
      { name: "University of Waikato", province: "Waikato", city: "Hamilton" },
      { name: "Victoria University of Wellington", province: "Wellington", city: "Wellington" },
      { name: "Lincoln University Canterbury", province: "Canterbury", city: "Lincoln" },
      { name: "Massey University", province: "Manawatu", city: "Palmerston North" },
    ],
  },
};

export default function CountryPage() {
  const params = useParams();
  const type = params?.type;
  const countrySlug = params?.country;
  const data = countryData[countrySlug];
  const countryName = countrySlug?.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());

  if (!data) {
    return (
      <div style={{ minHeight: "100vh" }}>
        <section style={{ background: "#c0392b", padding: "64px 24px", color: "white" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", alignItems: "center" }}>
            <div>
              <h1 style={{ fontSize: "48px", fontWeight: "800" }}>Study In {countryName}</h1>
              <p style={{ marginTop: "16px", opacity: 0.85 }}>Expert visa guidance for {countryName}.</p>
              <div style={{ marginTop: "32px", display: "flex", gap: "8px", maxWidth: "420px" }}>
                <div style={{ flex: 1, display: "flex", border: "1px solid rgba(255,255,255,0.3)", borderRadius: "8px", overflow: "hidden", background: "rgba(255,255,255,0.1)" }}>
                  <span style={{ padding: "12px", borderRight: "1px solid rgba(255,255,255,0.3)", fontSize: "13px" }}>+91 - IN</span>
                  <input type="tel" placeholder="Enter Phone Number" style={{ flex: 1, background: "transparent", border: "none", padding: "12px", color: "white", outline: "none" }} />
                </div>
                <button style={{ background: "white", color: "#333", fontWeight: "700", padding: "12px 20px", borderRadius: "8px", border: "none", cursor: "pointer" }}>→</button>
              </div>
            </div>
            <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: "16px", aspectRatio: "4/3", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "80px" }}>🌍</div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "white" }}>

      {/* HERO */}
      <section style={{ background: data.bgColor, color: "white", padding: "64px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", alignItems: "center" }}>
          <div>
            <p style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.2em", opacity: 0.7, marginBottom: "8px" }}>International Institute Of Language</p>
            <h1 style={{ fontSize: "48px", fontWeight: "800", lineHeight: "1.1" }}>{data.title}</h1>
            <p style={{ marginTop: "16px", fontSize: "17px", opacity: 0.85, maxWidth: "480px" }}>{data.subtitle}</p>
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
          {/* IMAGE PLACEHOLDER 1 - Hero Banner */}
          <div style={{ borderRadius: "16px", border: "4px solid rgba(255,255,255,0.2)", aspectRatio: "4/3", background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.5)", fontSize: "14px", flexDirection: "column", gap: "8px" }}>
            <span style={{ fontSize: "40px" }}>🖼️</span>
            <span>[ Hero Banner Image ]</span>
            <span style={{ fontSize: "11px", opacity: 0.6 }}>Replace with: {data.images?.[0]}</span>
          </div>
        </div>
      </section>

      {/* QUICK FACTS */}
      <section style={{ background: "#f9fafb", padding: "40px 24px", borderBottom: "1px solid #e5e7eb" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: "16px" }}>
          {data.facts.map((f) => (
            <div key={f.label} style={{ background: "white", borderRadius: "12px", padding: "16px", textAlign: "center", border: "1px solid #e5e7eb" }}>
              <p style={{ fontSize: "11px", color: "#9ca3af", textTransform: "uppercase" }}>{f.label}</p>
              <p style={{ marginTop: "4px", fontWeight: "700", color: "#1f2937", fontSize: "13px" }}>{f.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* INTRO */}
      <section style={{ padding: "56px 24px", background: "white" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "center" }}>
          <div>
            <p style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.2em", color: data.bgColor, marginBottom: "8px" }}>Overview</p>
            <h2 style={{ fontSize: "32px", fontWeight: "700", color: "#1f2937", marginBottom: "20px" }}>Want to Study in {countryName}?</h2>
            <p style={{ color: "#6b7280", lineHeight: "1.8" }}>{data.intro}</p>
          </div>
          {/* IMAGE PLACEHOLDER 2 - Overview Image */}
          <div style={{ borderRadius: "16px", aspectRatio: "4/3", background: "#f3f4f6", border: "2px dashed #d1d5db", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "8px", color: "#9ca3af" }}>
            <span style={{ fontSize: "40px" }}>🖼️</span>
            <span style={{ fontSize: "14px" }}>[ Overview Image ]</span>
            <span style={{ fontSize: "11px" }}>Replace with: {data.images?.[1]}</span>
          </div>
        </div>
      </section>

      {/* WHY STUDY */}
      <section style={{ padding: "56px 24px", background: "#f9fafb" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.2em", color: data.bgColor, textAlign: "center", marginBottom: "8px" }}>Benefits</p>
          <h2 style={{ fontSize: "32px", fontWeight: "700", color: "#1f2937", textAlign: "center", marginBottom: "40px" }}>Why Study in {countryName}?</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "24px" }}>
            {data.whyStudy.map((item, i) => (
              <div key={i} style={{ background: "white", borderRadius: "16px", padding: "24px", border: "1px solid #e5e7eb" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: data.bgColor, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700", fontSize: "14px", marginBottom: "16px" }}>{i + 1}</div>
                <h3 style={{ fontWeight: "700", color: "#1f2937", marginBottom: "8px" }}>{item.title}</h3>
                <p style={{ fontSize: "13px", color: "#6b7280", lineHeight: "1.7" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REQUIREMENTS + FORM */}
      <section style={{ padding: "56px 24px", background: "white" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px" }}>
          <div>
            <p style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.2em", color: data.bgColor, marginBottom: "8px" }}>Documents</p>
            <h2 style={{ fontSize: "28px", fontWeight: "700", color: "#1f2937", marginBottom: "24px" }}>{countryName} Student Visa Requirements</h2>
            {data.requirements.map((req, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px", background: "#f9fafb", padding: "12px 16px", borderRadius: "8px", border: "1px solid #e5e7eb", marginBottom: "8px" }}>
                <span style={{ color: data.bgColor, fontWeight: "700" }}>✓</span>
                <span style={{ color: "#374151", fontSize: "14px" }}>{req}</span>
              </div>
            ))}
          </div>
          <div style={{ background: "#f9fafb", borderRadius: "16px", padding: "32px", border: "1px solid #e5e7eb" }}>
            <h3 style={{ fontSize: "20px", fontWeight: "700", color: "#1f2937", marginBottom: "20px" }}>Get Free Counselling</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <input type="text" placeholder="Your Full Name" style={{ border: "1px solid #e5e7eb", borderRadius: "8px", padding: "12px 16px", fontSize: "14px", outline: "none" }} />
              <input type="tel" placeholder="Phone Number" style={{ border: "1px solid #e5e7eb", borderRadius: "8px", padding: "12px 16px", fontSize: "14px", outline: "none" }} />
              <input type="email" placeholder="Email Address" style={{ border: "1px solid #e5e7eb", borderRadius: "8px", padding: "12px 16px", fontSize: "14px", outline: "none" }} />
              <select style={{ border: "1px solid #e5e7eb", borderRadius: "8px", padding: "12px 16px", fontSize: "14px", outline: "none", color: "#6b7280" }}>
                <option>Select Visa Type</option>
                <option>Study Visa</option>
                <option>Work Visa</option>
                <option>Visitor Visa</option>
              </select>
              <button style={{ background: data.bgColor, color: "white", fontWeight: "700", padding: "14px", borderRadius: "8px", border: "none", cursor: "pointer", fontSize: "15px" }}>Submit Enquiry</button>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section style={{ padding: "56px 24px", background: "#f9fafb" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.2em", color: data.bgColor, textAlign: "center", marginBottom: "8px" }}>Step by Step</p>
          <h2 style={{ fontSize: "32px", fontWeight: "700", color: "#1f2937", textAlign: "center", marginBottom: "40px" }}>How to Apply for {countryName} Student Visa</h2>
          {/* IMAGE PLACEHOLDER 3 - Visa Process Image */}
          <div style={{ borderRadius: "16px", aspectRatio: "16/5", background: "#f3f4f6", border: "2px dashed #d1d5db", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "8px", color: "#9ca3af", marginBottom: "40px" }}>
            <span style={{ fontSize: "40px" }}>🖼️</span>
            <span style={{ fontSize: "14px" }}>[ Visa Process Banner Image ]</span>
            <span style={{ fontSize: "11px" }}>Replace with: {data.images?.[2]}</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "24px" }}>
            {data.process.map((item, i) => (
              <div key={i} style={{ background: "white", borderRadius: "16px", padding: "24px", border: "1px solid #e5e7eb" }}>
                <div style={{ fontSize: "36px", fontWeight: "800", color: data.bgColor, opacity: 0.25, marginBottom: "12px" }}>{item.step}</div>
                <h3 style={{ fontWeight: "700", color: "#1f2937", marginBottom: "8px" }}>{item.title}</h3>
                <p style={{ fontSize: "13px", color: "#6b7280", lineHeight: "1.7" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UNIVERSITIES TABLE */}
      <section style={{ padding: "56px 24px", background: "white" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.2em", color: data.bgColor, textAlign: "center", marginBottom: "8px" }}>Top Institutions</p>
          <h2 style={{ fontSize: "32px", fontWeight: "700", color: "#1f2937", textAlign: "center", marginBottom: "40px" }}>Best Colleges & Universities in {countryName}</h2>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
            <thead>
              <tr style={{ background: data.bgColor, color: "white" }}>
                <th style={{ padding: "14px 16px", textAlign: "left" }}>Institution Name</th>
                <th style={{ padding: "14px 16px", textAlign: "left" }}>Province</th>
                <th style={{ padding: "14px 16px", textAlign: "left" }}>City</th>
              </tr>
            </thead>
            <tbody>
              {data.universities.map((u, i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? "#f9fafb" : "white", borderBottom: "1px solid #e5e7eb" }}>
                  <td style={{ padding: "12px 16px", color: "#374151" }}>{u.name}</td>
                  <td style={{ padding: "12px 16px", color: "#6b7280" }}>{u.province}</td>
                  <td style={{ padding: "12px 16px", color: "#6b7280" }}>{u.city}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: data.bgColor, color: "white", padding: "56px 24px", textAlign: "center" }}>
        <h2 style={{ fontSize: "32px", fontWeight: "700", marginBottom: "16px" }}>Start Your {countryName} Journey Today!</h2>
        <p style={{ opacity: 0.8, marginBottom: "32px", maxWidth: "500px", margin: "0 auto 32px" }}>Our expert counselors are ready to guide you through every step of the process.</p>
        <Link href="/enquiry" style={{ background: "white", color: data.bgColor, fontWeight: "700", padding: "16px 32px", borderRadius: "50px", textDecoration: "none" }}>
          Book Free Consultation →
        </Link>
      </section>

    </div>
  );
}