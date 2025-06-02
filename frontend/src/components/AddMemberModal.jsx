// src/components/AddMemberModal.jsx
import React, { useState } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default function AddMemberModal({
  show,
  onClose,
  onSave,
  connections = [],
  existingMembers = []
}) {
  const [selectedIds, setSelectedIds] = useState([]);

  if (!show) return null;

  const toggleMember = uid => {
    setSelectedIds(ids =>
      ids.includes(uid) ? ids.filter(x => x !== uid) : [...ids, uid]
    );
  };

  const handleSubmit = async e => {
    e.preventDefault();
    // controllo duplicati
    const dup = selectedIds.filter(id => existingMembers.includes(id));
    if (dup.length > 0) {
      await Swal.fire(
        "Attention please",
        "Member could be already in the project",
        "warning"
      );
      return;
    }
    // salva i nuovi
    for (let uid of selectedIds) {
      await onSave(uid);
    }
    onClose();
  };

  return (
    <>
      <div className="modal-backdrop fade show" />
      <div className="modal fade show" style={{ display: "block" }} tabIndex="-1">
        <div className="modal-dialog">
          <form className="modal-content" onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">Select Members</h5>
              <button type="button" className="btn-close" onClick={onClose} />
            </div>
            <div className="modal-body bg-dark text-light">
              {connections.length === 0 ? (
                <p>No connections to add.</p>
              ) : (
                <ul className="list-group">
                  {connections.map(u => {
                    const already = existingMembers.includes(u.id);
                    return (
                      <li
                        key={u.id}
                        className="list-group-item d-flex justify-content-between align-items-center bg-secondary bg-opacity-25 text-white"
                      >
                        <span>
                          {u.username} ({u.email}){" "}
                          {already && <em>(added already)</em>}
                        </span>
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(u.id)}
                          disabled={already}
                          onChange={() => toggleMember(u.id)}
                        />
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
