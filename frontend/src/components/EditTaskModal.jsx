// src/components/EditTaskModal.jsx
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export default function EditTaskModal({ show, task, onClose, onSave }) {
  const [title, setTitle]           = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate]       = useState('');

  useEffect(() => {
    if (!task) return;
    setTitle(task.title);
    setDescription(task.description);
    setDueDate(
      task.previousEndDate
        ? new Date(task.previousEndDate).toISOString().slice(0,16)
        : ''
    );
  }, [task]);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const input = {
         recipientId: task.recipientId,   // adattati alla shape
        title,
        description,
        state: task.state,
        insertDate: null,
        previousEndDate: dueDate || null,
      };
      await onSave(task.id, input);
      await Swal.fire('Updated!', `"${title}" has been updated.`, 'success');
      onClose();
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Could not update task.', 'error');
    }
  };

  if (!show) return null;
  return (
    <>
      <div className="modal-backdrop fade show"></div>
      <div className="modal fade show" tabIndex="-1" style={{ display:'block' }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content bg-dark text-light">

            <div className="modal-header">
              <h5 className="modal-title">Edit Task</h5>
              <button type="button" className="btn-close" onClick={onClose} />
            </div>

            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                {/* same fields as AddTaskModal */}
                {/* Title */}
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
                {/* Description */}
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                  />
                </div>
                {/* Due date & time */}
                <div className="mb-3">
                  <label className="form-label">Due Date &amp; Time</label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    value={dueDate}
                    onChange={e => setDueDate(e.target.value)}
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
                  Save Changes
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </>
  );
}
