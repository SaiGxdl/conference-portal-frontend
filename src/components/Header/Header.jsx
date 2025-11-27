// src/components/Header/Header.jsx
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ToggleTheme from "../ToggleTheme/ToggleTheme";
import "./Header.css";

export default function Header() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const onSearch = (e) => {
    e.preventDefault();
    // go to events with query param
    if (location.pathname !== "/events") navigate(`/events?q=${encodeURIComponent(q)}`);
    else {
      // push new url in place
      navigate({ pathname: "/events", search: `?q=${encodeURIComponent(q)}` });
    }
  };

  return (
    <header style={{ padding: "12px 16px", borderBottom: "1px solid rgba(0,0,0,0.06)", background: "var(--bg)" }}>
      <div className="header-inner container">
        <div className="flex" style={{ gap: 12 }}>
          <div className="header-brand">ConfPortal</div>
          <nav className="header-nav" aria-label="Primary">
            <Link to="/">Dashboard</Link>
            <Link to="/events">Events</Link>
            <Link to="/calendar">Calendar</Link>
          </nav>
        </div>

        <div className="flex" style={{ marginLeft: "auto" }}>
          <form onSubmit={onSearch}>
            <input
              className="input"
              placeholder="Search events..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
              style={{ width: 240 }}
              aria-label="Search events"
            />
          </form>
          <ToggleTheme />
          <a className="small" href="https://github.com/your-repo" target="_blank" rel="noreferrer">Repo</a>
        </div>
      </div>
    </header>
  );
}
