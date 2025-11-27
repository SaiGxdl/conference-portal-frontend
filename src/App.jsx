// src/App.jsx
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Events from "./pages/Events";
import CalendarView from "./pages/CalendarView";
import Header from "./components/Header/Header";

export default function App() {
  return (
    <div className="app-root">
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/events" element={<Events />} />
          <Route path="/calendar" element={<CalendarView />} />
          <Route path="*" element={<div style={{padding:20}}>Page not found — <Link to="/">Go home</Link></div>} />
        </Routes>
      </main>
    </div>
  );
}
