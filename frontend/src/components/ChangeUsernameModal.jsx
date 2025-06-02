// src/components/ChangeUsernameModal.jsx
import React, { useState } from "react";
import Swal from "sweetalert2";

export default function ChangeUsernameModal({ show, onClose }) {
  const [newUsername, setNewUsername] = useState("");

  if (!show) return null;

  const handleSave = async e => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    const token  = localStorage.getItem("token");
    const res = await fetch(
      `http://localhost:8080/api/v1/users/${userId}/username`,
      {
        method: "PUT",
        headers: {
          "Content-Type":  "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ username: newUsername })
      }
    );
    const body = await res.json();
    if (res.ok && body.success) {
      await Swal.fire("Success", "Username updated!", "success");
      localStorage.setItem("username", newUsername);
      onClose();
    } else {
      Swal.fire("Error", body.message || "Failed to update", "error");
    }
  };

  return (
    <>
      <div className="modal-backdrop fade show bg-dark"></div>
      <div className="modal fade show" style={{ display: "block" }} tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <form
            className="modal-content bg-dark text-white border p-4"
            onSubmit={handleSave}
          >
            <div className="modal-header">
              <h5 className="modal-title">Change Username</h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={onClose}
              />
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                placeholder="New username"
                value={newUsername}
                onChange={e => setNewUsername(e.target.value)}
                required
              />
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
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
