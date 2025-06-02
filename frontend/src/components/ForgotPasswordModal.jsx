import React, { useState } from 'react';
import Swal from 'sweetalert2';

export default function ForgotPasswordModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:8080/api/v1/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const body = await res.json();

      if (res.ok && body.success) {
        await Swal.fire({
          title: 'Email Sent!',
          text: 'Check your email for password reset instructions.',
          icon: 'success',
          confirmButtonText: 'OK',
          background: "#0f1c25",
          color: "#fff"
        });
        onClose();
        setEmail('');
      } else {
        await Swal.fire({
          title: 'Error',
          text: body.message || 'Failed to send recovery email',
          icon: 'error',
          confirmButtonText: 'OK',
          background: "#0f1c25",
          color: "#fff"
        });
      }
    } catch (err) {
      console.error('Error sending recovery email:', err);
      await Swal.fire({
        title: 'Network Error',
        text: 'Please try again later',
        icon: 'error',
        confirmButtonText: 'OK',
        background: "#0f1c25",
        color: "#fff"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay d-flex justify-content-center align-items-center position-fixed top-0 start-0 w-100 h-100" style={{ zIndex: 1050, backgroundColor: 'rgba(0,0,0,0.7)' }}>
      <div className="modal-content bg-dark text-white p-4 rounded" style={{ maxWidth: '400px', width: '90%' }}>
        <div className="modal-header d-flex justify-content-between align-items-center mb-3">
          <h5 className="modal-title">Recover Password</h5>
          <button
            type="button"
            className="btn-close btn-close-white"
            onClick={onClose}
            disabled={isLoading}
          ></button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="recovery-email" className="form-label">
              Enter your email address and we'll send you a link to reset your password.
            </label>
            <input
              type="email"
              id="recovery-email"
              className="form-control"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          
          <div className="d-flex gap-2">
            <button
              type="button"
              className="btn btn-secondary flex-fill"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary flex-fill"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                  Sending...
                </>
              ) : (
                'Send Recovery Email'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}