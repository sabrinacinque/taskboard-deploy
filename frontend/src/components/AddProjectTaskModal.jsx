import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default function AddProjectTaskModal({
  show,
  onClose,
  members,
  onSave,
  editingTask = null // nuovo prop per il task da editare
}) {
  const [description, setDescription] = useState("");
  const [recipientId, setRecipientId] = useState(
    members.length > 0 ? members[0].user.id : ""
  );

  // Precompila i campi se stiamo editando un task esistente
  useEffect(() => {
    if (editingTask) {
      setDescription(editingTask.description || "");
      setRecipientId(editingTask.recipientId || editingTask.user?.id || (members.length > 0 ? members[0].user.id : ""));
    } else {
      setDescription("");
      setRecipientId(members.length > 0 ? members[0].user.id : "");
    }
  }, [editingTask, members]);

  if (!show) return null;

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (editingTask) {
        // Modalità editing - passa l'ID del task
        await onSave({ id: editingTask.id, description, recipientId });
        await Swal.fire("Updated!", "Task updated successfully.", "success");
      } else {
        // Modalità creazione
        await onSave({ description, recipientId });
        await Swal.fire("Added!", "Task created successfully.", "success");
      }
      setDescription("");
      onClose();
    } catch (err) {
      console.error("Error in AddProjectTaskModal:", err);
      await Swal.fire("Error", `Impossible ${editingTask ? 'update' : 'add'} task.`, "error");
    }
  };

  return (
    <>
      <div className="modal-backdrop fade show" />
      <div className="modal fade show" style={{ display: "block" }} tabIndex="-1">
        <div className="modal-dialog">
          <form className="modal-content bg-dark text-light mx-auto" onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">
                {editingTask ? 'Edit Project Task' : 'Add Project Task'}
              </h5>
              <button type="button" className="btn-close" onClick={onClose} />
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Assign to</label>
                <select
                  className="form-select"
                  value={recipientId}
                  onChange={e => setRecipientId(Number(e.target.value))}
                  required
                >
                  {members.map(m => (
                    <option key={m.id} value={m.user.id}>
                      {m.user.username}
                    </option>
                  ))}
                </select>
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
                {editingTask ? 'Update' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}