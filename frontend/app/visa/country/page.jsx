"use client";
import { useParams } from "next/navigation";

export default function CountryPage() {
  const params = useParams();
  return (
    <div style={{padding: "40px"}}>
      <h1>Type: {params.type}</h1>
      <h2>Country: {params.country}</h2>
    </div>
  );
}