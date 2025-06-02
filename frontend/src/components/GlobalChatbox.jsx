import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import Chatbox from './Chatbox';

export default function GlobalChatbox() {
  const [showChat, setShowChat] = useState(false);
  const toggleChat = () => setShowChat((prev) => !prev);

  return (
    <>
      {/* Pulsante flottante globale per la chatbox */}
      <button
        onClick={toggleChat}
        data-chat-button
        className="btn btn-dark position-fixed bottom-0 end-0 m-4 d-flex align-items-center justify-content-center border border-3 rounded-5"
        style={{ zIndex: 1000 }}
      >
        <MessageCircle size={30} color="white" />
      </button>

      {/* Chatbox globale */}
      {showChat && (
        <div className="position-fixed bottom-0 end-0 me-5 mb-5" style={{ zIndex: 999 }}>
          <Chatbox onClose={toggleChat} />
        </div>
      )}
    </>
  );
}