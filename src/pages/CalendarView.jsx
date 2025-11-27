// src/pages/CalendarView.jsx
import React, { useState } from "react";
import useFakeFetch from "../hooks/useFakeFetch";
import LoadingSkeleton from "../components/LoadingSkeleton/LoadingSkeleton";
import EventModal from "../components/EventModal/EventModal";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

export default function CalendarView() {
  const { data, loading } = useFakeFetch("/data/events.json", 600);
  const [openId, setOpenId] = useState(null);

  if (loading) return <LoadingSkeleton rows={4} />;

  const events = (data || []).map(ev => ({
    id: ev.id,
    title: ev.title,
    start: ev.startDate,
    end: ev.endDate
  }));

  return (
    <div>
      <h2 className="title" style={{ marginBottom: 12 }}>Calendar</h2>
      <div className="card">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          eventClick={(info) => setOpenId(info.event.id)}
        />
      </div>

      <EventModal event={(data||[]).find(e=>e.id===openId)} onClose={()=>setOpenId(null)} />
    </div>
  );
}
