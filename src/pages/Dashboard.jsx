// src/pages/Dashboard.jsx
import React, { useMemo, useState } from "react";
import useFakeFetch from "../hooks/useFakeFetch";
import LoadingSkeleton from "../components/LoadingSkeleton/LoadingSkeleton";
import EventCard from "../components/EventCard/EventCard";
import ChartPanel from "../components/ChartPanel/ChartPanel";

export default function Dashboard() {
  const { data, loading } = useFakeFetch("/data/events.json", 500);
  const events = data || [];
  const upcoming = useMemo(() => events.slice().sort((a,b)=> new Date(a.startDate)-new Date(b.startDate)).slice(0,3), [events]);

  const totalEvents = events.length;
  const totalOpenSeats = events.reduce((s,e)=> s + Math.max(0, (e.seatsTotal||0)-(e.seatsBooked||0)), 0);

  if (loading) return <LoadingSkeleton rows={4} />;

  return (
    <div>
      <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
        <div className="card" style={{ flex: 1 }}>
          <div className="small">Upcoming events</div>
          <h3 style={{ marginTop: 6 }}>{upcoming.length}</h3>
        </div>
        <div className="card" style={{ flex: 1 }}>
          <div className="small">Total events</div>
          <h3 style={{ marginTop: 6 }}>{totalEvents}</h3>
        </div>
        <div className="card" style={{ flex: 1 }}>
          <div className="small">Open seats</div>
          <h3 style={{ marginTop: 6 }}>{totalOpenSeats}</h3>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 12 }}>
        <div className="card">
          <h3 className="title">Next events</h3>
          <div style={{ marginTop: 12 }}>
            {upcoming.map(ev => <div key={ev.id} style={{ marginBottom: 10 }}><EventCard event={ev} onOpen={()=>{alert('Open event modal on real app')}} /></div>)}
          </div>
        </div>

        <div className="card">
          <h3 className="title">Events by type</h3>
          <div style={{ marginTop: 12 }}>
            <ChartPanel events={events} />
          </div>
        </div>
      </div>
    </div>
  );
}
