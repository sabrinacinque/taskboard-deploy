// src/components/ChangePasswordModal.jsx
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function ChangePasswordModal({ show, onClose }) {
  const [newPass, setNewPass]         = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const API_BASE = import.meta.env.VITE_API_URL;

  // Ogni volta che 'show' cambia, svuoto i campi e resetto lo "show" degli occhi
  useEffect(() => {
    if (!show) {
      setNewPass("");
      setConfirmPass("");
      setShowNewPass(false);
      setShowConfirmPass(false);
    }
  }, [show]);

  if (!show) return null;

  const handleSave = async (e) => {
    e.preventDefault();

    if (newPass !== confirmPass) {
      return Swal.fire("Error", "Passwords do not match", "error");
    }

    const userId = localStorage.getItem("userId");
    const token  = localStorage.getItem("token");

    try {
      const payload = {
        // Includo "oldPassword" finto (uguale a newPass), 
        // così il server non va in errore 500 per JSON mancante
        oldPassword: newPass,
        newPassword: newPass
      };

      const res = await fetch(
        `${API_BASE}/api/v1/users/${userId}/password`,
        {
          method: "PUT",
          headers: {
            "Content-Type":  "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        }
      );

      if (res.ok) {
        await Swal.fire("Success", "Password changed!", "success");
        onClose();

        // qui non serve resettare di nuovo, perché useEffect farà il reset appena show diventa false
      } else {
        Swal.fire("Error", "Could not change password", "error");
      }
    } catch {
      Swal.fire("Error", "Network error", "error");
    }
  };

  return (
    <>
      <div className="modal-backdrop fade show bg-dark"></div>
      <div className="modal fade show" style={{ display: "block" }} tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <form
            className="modal-content bg-dark text-white border"
            onSubmit={handleSave}
          >
            <div className="modal-header">
              <h5 className="modal-title">Change Password</h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={onClose}
              />
            </div>
            <div className="modal-body">
              {/* Nuova password con icona occhio */}
              <div className="mb-3 position-relative">
                <input
                  type={showNewPass ? "text" : "password"}
                  className="form-control"
                  placeholder="New password"
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  required
                />
                <span
                  onClick={() => setShowNewPass(prev => !prev)}
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "1rem",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    color: "#6c757d"
                  }}
                >
                  {showNewPass 
                    ? <i className="bi bi-eye-slash" /> 
                    : <i className="bi bi-eye" />
                  }
                </span>
              </div>

              {/* Conferma nuova password con icona occhio */}
              <div className="mb-3 position-relative">
                <input
                  type={showConfirmPass ? "text" : "password"}
                  className="form-control"
                  placeholder="Confirm new password"
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  required
                />
                <span
                  onClick={() => setShowConfirmPass(prev => !prev)}
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "1rem",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    color: "#6c757d"
                  }}
                >
                  {showConfirmPass 
                    ? <i className="bi bi-eye-slash" /> 
                    : <i className="bi bi-eye" />
                  }
                </span>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                onClick={onClose}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-success">
                Change
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
