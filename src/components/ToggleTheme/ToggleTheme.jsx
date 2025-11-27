// src/components/ToggleTheme/ToggleTheme.jsx
import React from "react";
import { useTheme } from "../../context/ThemeContext";
import "./ToggleTheme.css";

export default function ToggleTheme() {
  const { theme, toggle } = useTheme();
  return (
    <button aria-pressed={theme === "dark"} className="btn" onClick={toggle} title="Toggle theme">
      {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
