// src/components/EventCard/EventCard.jsx
import React from "react";
import dayjs from "dayjs";
import "./EventCard.css";

export default function EventCard({ event, onOpen }) {
  const seatsLeft = (event.seatsTotal || 0) - (event.seatsBooked || 0);
  return (
    <article className="card">
      <div style={{ display: "flex", gap: 12 }}>
        <img src={event.imageUrl || "/assets/event_placeholder.jpg"} alt={event.title} style={{ width: 120, height: 80, objectFit: "cover", borderRadius: 8 }} />
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ marginBottom: 6 }}>{event.title}</h3>
            <div className="small">{event.type}</div>
          </div>
          <div className="small">{dayjs(event.startDate).format("DD MMM YYYY, h:mm A")} • {event.location}</div>
          <div style={{ marginTop: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div className="small">{seatsLeft} seats left</div>
            <button className="btn btn-primary" onClick={() => onOpen(event.id)}>View</button>
          </div>
        </div>
      </div>
    </article>
  );
}
