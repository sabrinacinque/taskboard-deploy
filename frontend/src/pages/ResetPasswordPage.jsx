import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Sidebar from "../MainComponent/Sidebar";
import "./LoginPage.css";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      Swal.fire({
        title: 'Invalid Link',
        text: 'This password reset link is invalid or has expired.',
        icon: 'error',
        confirmButtonText: 'Go to Login',
        background: "#0f1c25",
        color: "#fff"
      }).then(() => {
        navigate('/login');
      });
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:8080/api/v1/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password: password }),
      });
      const body = await res.json();

      if (res.ok && body.success) {
        await Swal.fire({
          title: 'Password Reset Successful!',
          text: 'Your password has been reset. You can now log in with your new password.',
          icon: 'success',
          confirmButtonText: 'Go to Login',
          background: "#0f1c25",
          color: "#fff"
        });
        navigate('/login');
      } else {
        setError(body.message || "Failed to reset password");
      }
    } catch (err) {
      console.error('Error resetting password:', err);
      setError("Network error. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
    return null;
  }

  return (
    <div className="page-layout d-flex">
 

      <div className="hero-background flex-grow-1 d-flex justify-content-center align-items-center">
        <div className="login-card col-10 col-md-8 col-lg-4 p-5">
          <h2 className="login-title">Reset Password</h2>
          <p className="text-light mb-4">Enter your new password below.</p>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group password-group">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
              <span
                className="password-toggle"
                onClick={() => setShowPassword((v) => !v)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>

            <div className="form-group password-group">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
              />
              <span
                className="password-toggle"
                onClick={() => setShowConfirmPassword((v) => !v)}
              >
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>

            {error && <div className="error-text">{error}</div>}

            <button 
              type="submit" 
              className="btn btn-primary w-100 fs-5 py-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                  Resetting...
                </>
              ) : (
                'Reset Password'
              )}
            </button>
          </form>

          <p className="signup-text">
            Remember your password? <Link to="/login">Back to Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}