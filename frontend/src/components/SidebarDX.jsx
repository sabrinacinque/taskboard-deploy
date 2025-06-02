// src/components/SidebarDX.jsx
import React from "react";
import RecentSessions from "./RecentSessions";
import StatsPanel      from "./StatsPanel";
import "./SidebarDX.css";

export default function SidebarDX({ tasks }) {
  return (
    <aside className="sidebar-dx h-100 d-flex flex-column">
      <RecentSessions />
      <h6 className="mt-4 text-secondary">Quick Stats</h6>
      <StatsPanel tasks={tasks} />
    </aside>
  );
}
