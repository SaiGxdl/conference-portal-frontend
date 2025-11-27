// src/components/ChartPanel/ChartPanel.jsx
import React, { useMemo } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as C, ArcElement, Tooltip, Legend } from "chart.js";
C.register(ArcElement, Tooltip, Legend);

export default function ChartPanel({ events = [] }) {
  const counts = useMemo(() => {
    const m = {};
    (events || []).forEach((e) => { const t = e.type || "Other"; m[t] = (m[t] || 0) + 1; });
    return m;
  }, [events]);

  const labels = Object.keys(counts);
  const data = { labels, datasets: [{ data: labels.map(l=>counts[l]), backgroundColor: labels.map((_,i)=>[`#4f46e5`, `#06b6d4`, `#f97316`, `#ef4444`, `#a78bfa`][i%5]) }] };
  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top", labels: { boxWidth: 12, padding: 16 } },
      tooltip: { padding: 8, bodySpacing: 6 }
    }
  };
  <Pie data={data} options={options} />
  
 
  return <div style={{ width: "100%", height: 260 }}><Pie data={data} /></div>;


}
