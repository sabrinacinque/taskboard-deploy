// src/components/ChangeAvatarModal.jsx
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { FiUser, FiUsers, FiSmile, FiStar } from "react-icons/fi";

const AVATAR_OPTIONS = [
  { key: "user",   Icon: FiUser },
  { key: "users",  Icon: FiUsers },
  { key: "smile",  Icon: FiSmile },
  { key: "star",   Icon: FiStar },
];

 const API_BASE = import.meta.env.VITE_API_URL;

export default function ChangeAvatarModal({ show, onClose, onUpdated }) {
  const [choice, setChoice] = useState("");
  const userId = localStorage.getItem("userId");
  const token  = localStorage.getItem("token");

  useEffect(() => {
    if (!show) return;
    // Legge l’avatar corrente dal backend, se esiste
    fetch(`${API_BASE}/api/v1/users/${userId}/avatar`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => (r.ok ? r.json() : null))
      .then(data => {
        if (data?.avatarUrl) {
          setChoice(data.avatarUrl);
        }
      });
  }, [show, userId, token]);

  if (!show) return null;

  const handleSave = async () => {
    const res = await fetch(
      `${API_BASE}/api/v1/users/${userId}/avatar`,
      {
        method: "PUT",
        headers: {
          "Content-Type":  "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ avatarUrl: choice })
      }
    );
    if (res.ok) {
      Swal.fire("Success", "Avatar changed!", "success");
      // 1) Aggiorna il localStorage
      localStorage.setItem("avatar", choice);
      // 2) Chiudi il modal
      onClose();
      // 3) Notifica chi ascolta che l’avatar è cambiato
      window.dispatchEvent(new Event("avatarChanged"));
      // 4) Avvisa il genitore (SettingsPage) se serve
      if (typeof onUpdated === "function") {
        onUpdated(choice);
      }
    } else {
      Swal.fire("Errore", "Impossible update avatar", "error");
    }
  };

  return (
    <>
      <div className="modal-backdrop fade show bg-dark"></div>
      <div className="modal fade show" style={{ display: "block" }} tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content bg-dark text-white p-4 border">
            <h5 className="mb-3">Scegli il tuo avatar</h5>
            <div className="d-flex flex-wrap gap-4">
              {AVATAR_OPTIONS.map(option => {
                const { key, Icon } = option;
                return (
                  <div
                    key={key}
                    onClick={() => setChoice(key)}
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: "50%",
                      backgroundColor: choice === key ? "#2f81f7" : "#444",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "2rem",
                      cursor: "pointer"
                    }}
                  >
                    <Icon />
                  </div>
                );
              })}
            </div>
            <div className="mt-4 text-end">
              <button className="btn btn-secondary me-2" onClick={onClose}>
                Annulla
              </button>
              <button className="btn btn-primary" onClick={handleSave}>
                Salva
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
