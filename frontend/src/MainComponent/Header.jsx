// src/components/Header.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "./Header.css";

export default function Header() {
  const { isLoggedIn } = useAuth();

  return (
    <nav className="app-header navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        {/* Brand a sinistra */}
        <NavLink to="/" className="navbar-brand d-flex align-items-center fs-2">
          TaskBoard
        </NavLink>

        {/* Hamburger per mobile */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {isLoggedIn && (
              <li className="nav-item">
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    "nav-link" + (isActive ? " active" : "")
                  }
                >
                  Dashboard
                </NavLink>
              </li>
            )}

            {/* Questi due link escono sempre, sia loggato sia non loggato */}
            <li className="nav-item">
              <NavLink
                to="/help"
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active" : "")
                }
              >
                Help
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active" : "")
                }
              >
                About us
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
