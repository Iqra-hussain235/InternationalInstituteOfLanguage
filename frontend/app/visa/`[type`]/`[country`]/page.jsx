"use client";
import { useParams } from "next/navigation";

export default function CountryPage() {
  const params = useParams();
  return (
    <div style={{padding: "40px"}}>
      <h1>Working!</h1>
      <p>Type: {params.type}</p>
      <p>Country: {params.country}</p>
    </div>
  );
}