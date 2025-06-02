// src/components/ChangePasswordModal.jsx
import React, { useState } from "react";
import Swal from "sweetalert2";

export default function ChangePasswordModal({ show, onClose }) {
  const [oldPass, setOldPass]     = useState("");
  const [newPass, setNewPass]     = useState("");
  const [confirmPass, setConfirm] = useState("");

  const API_BASE = import.meta.env.VITE_API_URL;
  
  if (!show) return null;

  const handleSave = async e => {
    e.preventDefault();
    if (newPass !== confirmPass) {
      return Swal.fire("Error", "Passwords do not match", "error");
    }
    const userId = localStorage.getItem("userId");
    const token  = localStorage.getItem("token");
    const res = await fetch(
      `${API_BASE}/api/v1/users/${userId}/password`,
      {
        method: "PUT",
        headers: {
          "Content-Type":  "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ oldPassword: oldPass, newPassword: newPass })
      }
    );
    if (res.ok) {
      await Swal.fire("Success", "Password changed!", "success");
      onClose();
    } else {
      Swal.fire("Error", "Could not change password", "error");
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
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Old password"
                  value={oldPass}
                  onChange={e => setOldPass(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="New password"
                  value={newPass}
                  onChange={e => setNewPass(e.target.value)}
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm new password"
                  value={confirmPass}
                  onChange={e => setConfirm(e.target.value)}
                  required
                />
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
