"use client";

import { useEffect } from "react";
import { installVisaEnquiryShim } from "@/utils/visaEnquiryShim";

export default function VisaLayout({ children }) {
  useEffect(() => {
    installVisaEnquiryShim();
  }, []);

  return <>{children}</>;
}
