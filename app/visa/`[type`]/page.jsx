"use client";
import { useParams } from "next/navigation";

export default function VisaTypePage() {
  const params = useParams();
  return (
    <div style={{padding: "40px"}}>
      <h1>Visa Type: {params.type}</h1>
    </div>
  );
}