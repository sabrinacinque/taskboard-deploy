import React, { useState } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

// Nel parent ti passeranno:
//   - show, onClose, onSave (che è createProject)
//   - addMember (dal tuo useProjects)
//   - connections (dal tuo useFriends)
export default function CreateProjectModal({
  show, onClose, onSave, addMember, connections = []
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [endDate, setEndDate] = useState("");
  const [memberPickerOpen, setMemberPickerOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);

  if (!show) return null;

  // formato ISO fino ai secondi: "YYYY-MM-DDTHH:mm:SS"
  const toIso = raw => raw
    ? new Date(raw).toISOString().slice(0,19)
    : null;

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      // 1) creo il progetto - ora con description
      const proj = await onSave({
        name,
        description,
        startDate: null, // automatico dal backend
        endDate: toIso(endDate)
      });

      // 2) aggiungo i membri selezionati
      await Promise.all(
        selectedIds.map(uid =>
          addMember(proj.id, { userId: uid, role: "MEMBER" })
        )
      );

      await Swal.fire("Saved!", `"${name}" creato con successo.`, "success");
      onClose();

      // pulisco
      setName(""); setDescription(""); setEndDate("");
      setSelectedIds([]);
    } catch (err) {
      console.error(err);
      await Swal.fire("Error", "Impossibile creare il progetto.", "error");
    }
  };

  const toggleMember = uid => {
    setSelectedIds(ids =>
      ids.includes(uid)
        ? ids.filter(x => x !== uid)
        : [...ids, uid]
    );
  };

  return (
    <>
      {/* backdrop + main modal */}
      <div className="modal-backdrop fade show"/>
      <div className="modal fade show" style={{ display: "block" }} tabIndex="-1">
        <div className="modal-dialog">
          <form className="modal-content" onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">Create New Project</h5>
              <button type="button" className="btn-close" onClick={onClose}/>
            </div>
            <div className="modal-body bg-dark text-light">
              {/* name */}
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input type="text"
                       className="form-control"
                       value={name}
                       onChange={e => setName(e.target.value)}
                       required/>
              </div>

              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                       rows="4"
                       className="form-control"
                       value={description}
                       onChange={e => setDescription(e.target.value)}
                       placeholder="Descrivi il progetto..."
                />
              </div>

              {/* end */}
              <div className="mb-3">
                <label className="form-label">End Date &amp; Time</label>
                <input type="datetime-local"
                       className="form-control"
                       value={endDate}
                       onChange={e => setEndDate(e.target.value)}/>
              </div>

              {/* add members */}
              <div className="mb-3">
                <label className="form-label">Add project members</label>
                <div>
                  <button type="button"
                          className="btn btn-sm btn-outline-light"
                          onClick={() => setMemberPickerOpen(true)}>
                    + Add
                  </button>
                </div>
                {selectedIds.length > 0 && (
                  <ul className="mt-2">
                    {selectedIds.map(uid => {
                      const u = connections.find(c => c.id === uid);
                      return (
                        <li key={uid} className="text-white">
                          {u?.username || uid}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </div>

            <div className="modal-footer">
              <button type="button"
                      className="btn btn-secondary"
                      onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* 2° modal: member picker */}
      {memberPickerOpen && (
        <>
          <div className="modal-backdrop fade show"/>
          <div className="modal fade show" style={{ display: "block" }}>
            <div className="modal-dialog">
              <div className="modal-content bg-dark text-light">
                <div className="modal-header">
                  <h5 className="modal-title">Select Members</h5>
                  <button className="btn-close" onClick={() => setMemberPickerOpen(false)}/>
                </div>
                <div className="modal-body">
                  {connections.length === 0
                    ? <p>No connections to add.</p>
                    : (
                      <ul className="list-group">
                        {connections.map(u => (
                          <li key={u.id}
                              className="list-group-item d-flex justify-content-between align-items-center bg-secondary bg-opacity-25 text-white">
                            <span>
                              {u.username} ({u.email})
                            </span>
                            <input type="checkbox"
                                   checked={selectedIds.includes(u.id)}
                                   onChange={() => toggleMember(u.id)} />
                          </li>
                        ))}
                      </ul>
                    )}
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary"
                          onClick={() => setMemberPickerOpen(false)}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}