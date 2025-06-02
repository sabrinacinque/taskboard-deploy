// src/pages/SettingsPage.jsx
import React, { useState } from "react";
import ChangePasswordModal from "../components/ChangePasswordModal";
import ChangeUsernameModal from "../components/ChangeUsernameModal";
import ChangeAvatarModal from "../components/ChangeAvatarModal";
import { FiUser, FiUsers, FiSmile, FiStar } from "react-icons/fi";
import "./SettingsPage.css";

const AVATAR_COMPONENTS = {
  user: FiUser,
  users: FiUsers,
  smile: FiSmile,
  star: FiStar,
};

export default function SettingsPage() {
  const [showPwd, setShowPwd] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const [showAvatar, setShowAvatar] = useState(false);

  // Username per visualizzare “Current:”
  const username = localStorage.getItem("username") || "";

  // Stato locale per l’avatar attuale (lettura da localStorage)
  const initialAvatar = localStorage.getItem("avatar") || "";
  const [currentAvatar, setCurrentAvatar] = useState(initialAvatar);

  // questa funzione verrà passata a ChangeAvatarModal come prop onUpdated
  const handleAvatarUpdated = newKey => {
    setCurrentAvatar(newKey);
    // Non serve altro qui, SidebarWrapper si aggiornerà tramite evento
  };

  return (
    <div className="container-fluid settings min-vh-100 d-flex flex-column">
      <div className="row p-3 p-md-5 text-white text-center mb-3 mb-md-5">
        <div className="col">
          <h1 className="h2 h1-md">Settings</h1>
        </div>
      </div>

      <div className="row text-white flex-grow-1">
        <div className="col-12 col-md-10 col-lg-8 mx-auto">
          {/* Change Password */}
          <div className="my-3 my-md-4 d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center border-bottom pb-3">
            <h2 className="h4 h3-md mb-2 mb-sm-0">Change Password</h2>
            <button
              className="btn btn-outline-warning btn-sm btn-md-normal"
              onClick={() => setShowPwd(true)}
            >
              Change
            </button>
          </div>

          {/* Change Username */}
          <div className="my-3 my-md-4 d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center border-bottom pb-3">
            <div className="mb-2 mb-sm-0">
              <h2 className="h4 h3-md mb-1">Change Username</h2>
              <span className="small">
                Current: <strong>{username}</strong>
              </span>
            </div>
            <button
              className="btn btn-outline-warning btn-sm btn-md-normal"
              onClick={() => setShowUser(true)}
            >
              Change
            </button>
          </div>

          {/* Change Avatar */}
          <div className="my-3 my-md-4 d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center border-bottom pb-3">
            <div className="d-flex align-items-center mb-2 mb-sm-0">
              <h2 className="h4 h3-md mb-0 me-3">Change Avatar</h2>
              {/* Icona avatar corrente */}
              {currentAvatar && AVATAR_COMPONENTS[currentAvatar] && (
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    backgroundColor: "#2f81f7",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.5rem"
                  }}
                >
                  {React.createElement(AVATAR_COMPONENTS[currentAvatar])}
                </div>
              )}
            </div>
            <button
              className="btn btn-outline-warning btn-sm btn-md-normal"
              onClick={() => setShowAvatar(true)}
            >
              Change
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ChangePasswordModal show={showPwd} onClose={() => setShowPwd(false)} />
      <ChangeUsernameModal show={showUser} onClose={() => setShowUser(false)} />
      <ChangeAvatarModal
        show={showAvatar}
        onClose={() => setShowAvatar(false)}
        onUpdated={handleAvatarUpdated}
      />
    </div>
  );
}
