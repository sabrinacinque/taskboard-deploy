// src/components/AddTaskModal.jsx
import React, { useState } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default function AddTaskModal({
  show,
  onClose,
  state,
  onSave,
  recipientId: propRecipientId
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  if (!show) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const creatorId   = Number(localStorage.getItem("userId"));
    const recipientId = propRecipientId != null ? propRecipientId : creatorId;

    if (!creatorId) {
      await Swal.fire("Error", "You have to be logged to send a task.", "error");
      return;
    }

    try {
      const payload = {
        recipientId,
        title,
        description,
        state,
        insertDate: null,
        previousEndDate: dueDate || null,
      };
      // *** questa chiamata va a buon fine ***
      await onSave(payload);

      // *** DA QUÌ IN POI NESSUN ERRORE DI SINTASSI ***
      const modalTitle = state === "incoming"
        ? "Task sent!"
        : "Task added!";

      const modalText = state === "incoming"
        ? `"${title}" has been sent.`
        : `"${title}" has been created.`;

      await Swal.fire({
        title: modalTitle,
        text: modalText,
        icon: "success",
        confirmButtonText: "OK"
      });

      // reset form
      setTitle("");
      setDescription("");
      setDueDate("");
      onClose();

    } catch (err) {
      console.error("Errore in AddTaskModal:", err);
      await Swal.fire("Error", "Impossibile add task.", "error");
    }
  };

  return (
    <>
      <div className="modal-backdrop fade show"></div>
      <div className="modal fade show " style={{ display: "block" }} tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content bg-dark text-light mx-auto">
            <div className="modal-header">
              <h5 className="modal-title">
                {state === "incoming" ? "Sent Task" : `New Task (${state})`}
              </h5>
              <button type="button" className="btn-close" onClick={onClose}/>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Scadenza</label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    value={dueDate}
                    onChange={e => setDueDate(e.target.value)}
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
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
