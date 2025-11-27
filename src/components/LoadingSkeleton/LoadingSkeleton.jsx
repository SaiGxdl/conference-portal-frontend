// src/components/LoadingSkeleton/LoadingSkeleton.jsx
import React from "react";

export default function LoadingSkeleton({ rows = 6 }) {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} style={{ height: 80, borderRadius: 8, background: "linear-gradient(90deg, rgba(0,0,0,0.04), rgba(0,0,0,0.02))" }}></div>
      ))}
    </div>
  );
}
