import React, { useState } from "react";
import { FiTrash2, FiPhone } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { useFriends } from "../hooks/useFriends";
import { useTasks } from "../hooks/useTasks";
import AddTaskModal from "../components/AddTaskModal";
import Swal from "sweetalert2";
import "./FriendConnections.css";

export default function FriendConnections() {
  const {
    incoming,
    outgoing,
    connections,       // ogni elemento: { id, username, email, number, friendRequestId }
    foundUser,
    searchError,
    searchByPhone,
    sendRequest,
    respond,
    handleRemoveFriend
  } = useFriends();

  const { addTask, fetchAll: refreshTasks } = useTasks();

  const [phoneToSearch, setPhone] = useState("");
  const [sendTo, setSendTo] = useState(null);

  const handleSearch = () => {
    if (!phoneToSearch) return;
    searchByPhone(phoneToSearch);
  };

  const handleSendRequest = async () => {
    await sendRequest(foundUser.id);
    await Swal.fire({
      title: "Request sent!",
      text: `You sent a request to ${foundUser.username}.`,
      icon: "success",
      timer: 1500,
      showConfirmButton: false
    });
  };

  const confirmRemoveFriend = async (conn) => {
    const result = await Swal.fire({
      title: "Remove Friend?",
      text: `Are you sure you want to remove ${conn.username}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove",
      cancelButtonText: "Cancel"
    });

    if (!result.isConfirmed) return;

    try {
      await handleRemoveFriend(conn.friendRequestId);
      await Swal.fire({
        title: "Removed!",
        text: `${conn.username} has been removed.`,
        icon: "success",
        timer: 1500,
        showConfirmButton: false
      });
    } catch (err) {
      console.error("Remove friend failed:", err);
      await Swal.fire({
        title: "Error",
        text: "Failed to remove friend. Please try again.",
        icon: "error"
      });
    }
  };

  const relationStatus = () => {
    if (!foundUser) return null;
    if (connections.some(c => c.id === foundUser.id)) return "connected";
    if (outgoing.some(p => p.target.id === foundUser.id)) return "pending_out";
    if (incoming.some(p => p.requester.id === foundUser.id)) return "pending_in";
    return "none";
  };

  const openSendTaskModal = user => setSendTo(user);

  const handleSendTask = async payload => {
    try {
      await addTask(payload);
    } catch (err) {
      console.error("addTask failed:", err);
    } finally {
      setSendTo(null);
      refreshTasks();
    }
  };

  return (
    <div className="container-fluid background text-white vh-100 p-3 p-md-4 overflow-y-scroll">
      <div className="pt-3 pt-md-5">
        <h2 className="mb-2 text-warning">Find &amp; Connect</h2>
        <h4>Keep in touch with your friends!!</h4>
        <p className="text-white mb-4">
          Search by phone number and click “Add” to send a connection request.
        </p>

        {/* Ricerca utente per numero di cellulare */}
        <div className="row mb-4">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="input-group">
              <input
                type="tel"
                className="form-control"
                placeholder="User phone number (example 3311234567)"
                value={phoneToSearch}
                onChange={e => setPhone(e.target.value)}
              />
              <button className="btn btn-success" onClick={handleSearch}>
                Search
              </button>
            </div>
          </div>
        </div>

        {searchError && <div className="alert alert-danger">{searchError}</div>}

        {/* Utente trovato */}
        {foundUser && (
          <div className="card mb-5 bg-dark text-white border-secondary" style={{ maxWidth: '400px' }}>
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <h5 className="card-title mb-1">User Found</h5>
                <p className="card-text mb-0">
                  <strong>{foundUser.username}</strong><br />
                  <small className="text-muted">{foundUser.number || "no phone on record"}</small>
                </p>
              </div>
              <div>
                {relationStatus() === "none" && (
                  <button className="btn btn-outline-primary" onClick={handleSendRequest}>
                    <i className="bi bi-person-plus-fill"></i> Add
                  </button>
                )}
                {relationStatus() === "pending_out" && (
                  <button className="btn btn-warning" disabled>
                    <i className="bi bi-hourglass-split"></i> Pending
                  </button>
                )}
                {relationStatus() === "pending_in" && (
                  <button className="btn btn-info" disabled>
                    <i className="bi bi-arrow-clockwise"></i> Accept?
                  </button>
                )}
                {relationStatus() === "connected" && (
                  <button className="btn btn-success" disabled>
                    <i className="bi bi-person-check-fill"></i> Connected
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Incoming Requests */}
        <h2 className="mt-5 text-warning">Incoming Requests</h2>
        {incoming.length === 0 ? (
          <p className="pb-4">No pending requests.</p>
        ) : (
          <ul className="list-group mb-4">
            {incoming.map(req => (
              <li
                key={req.id}
                className="list-group-item d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center bg-dark bg-opacity-25 text-white border-0 border-bottom py-3"
              >
                <span className="mb-2 mb-sm-0">
                  <strong>{req.requester.username}</strong> wants to connect
                </span>
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-sm btn-outline-success"
                    onClick={() => respond(req.id, true)}
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => respond(req.id, false)}
                  >
                    Reject
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <hr className="my-4" />

        {/* Lista Connessioni */}
        <h2 className="my-4 text-warning">Your Connections</h2>
        {connections.length === 0 ? (
          <p>You have no connections yet.</p>
        ) : (
          <ul className="list-group">
            {connections.map(conn => {
              const raw = conn.number || "";
              const withPrefix = raw.startsWith("+")
                ? raw
                : "+39" + raw.replace(/\D/g, "");
              const plainNumber = withPrefix.replace(/\D/g, "");

              return (
                <li
                  key={conn.id}
                  className="list-group-item bg-dark bg-opacity-25 text-white border-0 d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center"
                >
                  <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center w-100">
                    <span className="me-3 mb-2 mb-sm-0">
                      {conn.username} ({conn.number})
                    </span>

                    {raw && (
                      <div className="d-flex gap-2 mb-2 mb-sm-0">
                        <a
                          href={`tel:${withPrefix}`}
                          className="text-decoration-none text-danger"
                          title={`Call ${conn.username}`}
                        >
                          <FiPhone size={20} />
                        </a>
                        <a
                          href={`https://wa.me/${plainNumber}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-decoration-none text-success"
                          title={`WhatsApp ${conn.username}`}
                        >
                          <FaWhatsapp size={20} />
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => openSendTaskModal(conn)}
                    >
                      Send Task
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => confirmRemoveFriend(conn)}
                    >
                      <FiTrash2 /> Remove
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {sendTo && (
        <AddTaskModal
          show
          state="incoming"
          recipientId={sendTo.id}
          onClose={() => setSendTo(null)}
          onSave={handleSendTask}
        />
      )}
    </div>
  );
}
