// src/components/RecentSessions.jsx
import React from "react";
import { useSessions } from "../hooks/useSessions";
import "./RecentSessions.css";

export default function RecentSessions() {
  const { sessions, loading, error } = useSessions();

  if (loading)  return <p>Loading sessions…</p>;
  if (error)    return <p className="text-danger">Error: {error}</p>;
  if (sessions.length === 0) return <p>No recent sessions.</p>;

  return (
    <div className="recent-sessions p-3">
      <h6 className="text-light">Your last sessions</h6>
      <ul className="list-unstyled">
        {sessions.map((s, i) => (
          <li key={i} className="session-item mb-2">
            <small className="text-secondary">
              {new Date(s.date).toLocaleString()}
            </small>
            <br/>
            <span className="text-white">{s.ip}</span>
            {!s.active && (
              <span className="badge bg-danger ms-2">Ended</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
