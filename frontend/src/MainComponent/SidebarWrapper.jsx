// SidebarWrapper.jsx
import React, { useState, useEffect } from "react";
import { ChevronsRight, ChevronsLeft } from "lucide-react";
import Sidebar from "./Sidebar.jsx";
import "./SidebarWrapper.css"; // importa il CSS che hai appena creato

export default function SidebarWrapper() {
  // 1) avatarKey forzare il remount di <Sidebar> quando cambia
  const [avatarKey, setAvatarKey] = useState(
    localStorage.getItem("avatar") || ""
  );

  // 2) stato per mostrare/nascondere la sidebar su mobile
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);

  // 3) toggle per aprire/chiudere sidebar su mobile
  const toggleLeftSidebar = () => {
    setLeftSidebarOpen(!leftSidebarOpen);
  };

  // 4) ascolta l’evento “avatarChanged” per riallineare avatarKey
  useEffect(() => {
    const onAvatarChanged = () => {
      const newKey = localStorage.getItem("avatar") || "";
      setAvatarKey(newKey);
    };
    window.addEventListener("avatarChanged", onAvatarChanged);
    return () => {
      window.removeEventListener("avatarChanged", onAvatarChanged);
    };
  }, []);

  return (
    <>
      {/* ─────────────────────────── */}
      {/* Mobile / Tablet View: toggleable sidebar */}
      {/* ─────────────────────────── */}
      <div className="d-lg-none">
        {/* Bottone fluttuante per aprire/chiudere */}
        <button
          className="btn position-fixed top-50 translate-middle-y ms-0 rounded-circle px-0 py-0"
          type="button"
          onClick={toggleLeftSidebar}
          style={{ zIndex: 1050, width: "50px", height: "50px" }}
        >
          <div className="circle-button-content px-auto mx-auto">
            {/* Icona centrata */}
            <div className="icon-center">
              {leftSidebarOpen ? (
                <ChevronsLeft size={20} />
              ) : (
                <ChevronsRight size={20} />
              )}
            </div>

            {/* SVG con testo circolare */}
            <svg
              className="circular-text p-1"
              viewBox="0 0 50 50"
            >
              <defs>
                {/*
                  Definiamo un cerchio di raggio 20 (centro 25,25) 
                  su cui andrà a “scorrere” il testo.
                */}
                <path
                  id="circlePathLeft"
                  d="
                    M25,25 
                    m-25,0 
                    a20,20 0 1,1 40,0 
                    a20,20 0 1,1 -40,0
                  "
                />
              </defs>
              <text>
                <textPath
                  href="#circlePathLeft"
                  startOffset="50%"
                  textAnchor="middle"
                >
                  {leftSidebarOpen ? "TAP TO CLOSE" : "TAP TO OPEN"}
                </textPath>
              </text>
            </svg>
          </div>
        </button>

        <div
          className="position-fixed top-0 h-100 bg-white shadow"
          style={{
            left: leftSidebarOpen ? 0 : "-300px",
            width: "300px",
            zIndex: 1040,
            transition: "left 0.3s ease-in-out",
            marginTop: "60px", // lascia spazio al header
          }}
        >
          <div key={avatarKey} className="h-100">
            {/* Passo la funzione di chiusura alla Sidebar */}
            <Sidebar onLinkClick={toggleLeftSidebar} />
          </div>
        </div>

        {/* Overlay che copre il resto e chiude la sidebar quando cliccato */}
        {leftSidebarOpen && (
          <div
            className="position-fixed top-0 start-0 w-100 h-100  bg-opacity-50"
            style={{ zIndex: 1035, marginTop: "60px" }}
            onClick={toggleLeftSidebar}
          ></div>
        )}
      </div>

      {/* ─────────────────────────── */}
      {/* Desktop View: sidebar sempre visibile */}
      {/* ─────────────────────────── */}
      <div className="d-none d-lg-block vh-100" style={{ width: "300px" }}>
        <div key={avatarKey} className="h-100">
          <Sidebar />
        </div>
      </div>
    </>
  );
}
