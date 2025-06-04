import React, { useState, useEffect } from "react";
import { ChevronsRight, ChevronsLeft } from "lucide-react";
import Sidebar from "./Sidebar.jsx";

export default function SidebarWrapper() {
  // 1) avatarKey forzerà il remount di <Sidebar> quando cambia
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
          className="btn btn-outline-secondary position-fixed top-50 start-0 translate-middle-y me-2 bg-dark border border-3 rounded-5 me-3"
          type="button"
          onClick={toggleLeftSidebar}
          style={{ zIndex: 1050 }}
        >
          {leftSidebarOpen ? (
            <ChevronsLeft size={20} className="text-white" />
          ) : (
            <ChevronsRight size={20} className="text-white" />
          )}
        </button>

        <div
          className="position-fixed top-0 h-100 bg-white shadow"
          style={{
            left: leftSidebarOpen ? 0 : "-300px",
            width: "300px",
            zIndex: 1040,
            transition: "left 0.3s ease-in-out",
            marginTop: "60px" // lascia spazio al header
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
            className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
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
