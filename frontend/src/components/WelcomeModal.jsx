// src/components/WelcomeModal.jsx
import React, { useState } from "react";
import { MessageCircle } from "lucide-react";
import robotImg from "../../public/images/robot.png";

export default function WelcomeModal({ isOpen, onClose, username }) {
  const [dontShowAgain, setDontShowAgain] = useState(false);


  const handleClose = () => {
    if (dontShowAgain) {
      localStorage.setItem("hideWelcomeModal", "true");
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay d-flex justify-content-center align-items-center"
      // l’overlay deve occupare l’intera finestra:
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.8)",
        zIndex: 1060
      }}
    >
      <div
        className="modal-content bg-dark text-white rounded-4 shadow-lg position-relative"
        style={{
          maxWidth: "500px",
          width: "90%",
          maxHeight: "90vh",
          overflowY: "auto",
          zIndex: 1061
        }}
      >
        {/* Bottone di chiusura (X) */}
        <button
          type="button"
          className="btn-close btn-close-white position-absolute top-0 end-0 m-3"
          onClick={handleClose}
          style={{ zIndex: 1062 }}
        ></button>

        {/*  Contenuto interno del modal */}
        <div className="p-4 text-center">
          {/* Avatar “robot” */}
          <div className="mb-4">
            <div
              className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle bg-primary"
              style={{ width: "100px", height: "100px" }}
              
            >
              <img src={robotImg} alt="logo robot dino" style={{ width: "80px", height: "80px" }}/>
            </div>
            <h3 className="text-primary mb-2">Hi {username}! 👋</h3>
            <h4 className="h5 text-light">I'm Dino, your AI assistant!</h4>
          </div>

          {/* Testo di benvenuto */}
          <div className="mb-4">
            <p className="text-light mb-3">
              Welcome to your Task Dashboard! I'm here to help you manage your
              projects and answer any questions you might have.
            </p>

            <div className="bg-secondary rounded-3 p-3 mb-3">
              <p className="mb-2 text-light">
                <strong>Here's what I can help you with:</strong>
              </p>
              <ul className="list-unstyled text-start small">
                <li className="mb-1">• Creating and organizing tasks</li>
                <li className="mb-1">• Project management tips</li>
                <li className="mb-1">• Navigation help</li>
                <li className="mb-1">• General questions about the app</li>
              </ul>
            </div>

            {/* Indicazione per la chatbox */}
            <div className="d-flex align-items-center justify-content-center mb-3">
              <p className="mb-0 me-2 text-light">You can find me in the chatbox</p>
              <span className="text-primary fs-4">⌄</span>
            </div>

            <div className="d-flex align-items-center justify-content-center">
              <MessageCircle size={24} className="text-primary me-2" />
              <small className="text-muted">
                Click the chat button in the bottom right corner
              </small>
            </div>
          </div>

          {/* Checkbox “Don't show again” */}
          <div className="form-check mb-4 text-start px-3">
            <input
              className="form-check-input"
              type="checkbox"
              id="dontShowAgain"
              checked={dontShowAgain}
              onChange={(e) => setDontShowAgain(e.target.checked)}
            />
            <label className="form-check-label text-light" htmlFor="dontShowAgain">
              Don't show this welcome message again
            </label>
          </div>

          {/* Pulsanti di azione */}
          <div className="d-flex gap-2 justify-content-center pb-4">
            <button
              type="button"
              className="btn btn-outline-light"
              onClick={handleClose}
            >
              Got it, thanks!
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                handleClose();
                // Simula l’apertura della chatbox dopo mezzo secondo
                setTimeout(() => {
                  const chatButton = document.querySelector("[data-chat-button]");
                  if (chatButton) {
                    chatButton.click();
                  }
                }, 500);
              }}
            >
              Open Chat Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
