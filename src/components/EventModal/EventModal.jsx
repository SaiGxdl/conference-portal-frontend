// src/components/EventModal/EventModal.jsx
import React, { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";

export default function EventModal({ event, onClose }) {
  const overlayRef = useRef();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!event) return null;

  async function submit(e) {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    alert(`Registration submitted for ${name} (${email}) — Thanks!`);
    setSubmitting(false);
    onClose();
  }

  return (
    <div className="modal-overlay" ref={overlayRef} onMouseDown={(e) => { if (e.target === overlayRef.current) onClose(); }}>
      <div className="modal" role="dialog" aria-modal="true" aria-label={`${event.title} details`}>
        <div style={{ display: "flex", gap: 12 }}>
          <button className="close-btn" aria-label="Close" onClick={onClose}>✕</button>

          <img src={event.imageUrl || "/assets/event_placeholder.jpg"} alt="" style={{ width: 160, height: 110, objectFit: "cover", borderRadius: 8 }} />
          <div style={{ flex: 1 }}>
            <h2>{event.title}</h2>
            <div className="small">{dayjs(event.startDate).format("DD MMM YYYY, h:mm A")} • {event.location}</div>
            <p style={{ marginTop: 10 }}>{event.description}</p>
            <p className="small" style={{ marginTop: 8 }}>Trainer: {event.trainerName || "TBA"}</p>
          </div>
        </div>

        <hr style={{ margin: "12px 0" }} />

        <form onSubmit={submit} style={{ display: "grid", gap: 8 }}>
          <label className="small">Name</label>
          <input className="input" required value={name} onChange={(e)=>setName(e.target.value)} />
          <label className="small">Email</label>
          <input className="input" type="email" required value={email} onChange={(e)=>setEmail(e.target.value)} />
          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 6 }}>
            <button type="button" className="btn" onClick={onClose}>Cancel</button>
            <button className="btn btn-primary" disabled={submitting} type="submit">{submitting ? "Submitting..." : "Register"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
