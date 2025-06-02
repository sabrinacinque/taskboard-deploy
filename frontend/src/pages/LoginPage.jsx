// src/pages/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { FiEye, FiEyeOff } from "react-icons/fi";
import ForgotPasswordModal from "../components/ForgotPasswordModal";
import WelcomeModal from "../components/WelcomeModal";
import "./LoginPage.css"; // ← Assicurati che il CSS sia importato

export default function LoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/sessions/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });
      const body = await res.json();

      if (res.ok && body.success) {
        localStorage.setItem("token", body.sessiondata.token);
        localStorage.setItem("userId", String(body.sessiondata.userid));
        localStorage.setItem("username", identifier);

        await Swal.fire({
          title: `Hello ${identifier}!`,
          text: "Login success.",
          icon: "success",
          confirmButtonText: "Go to dashboard",
          background: "#0f1c25",
          color: "#fff",
        });
  
        console.log(
            "DEBUG: prima di setShowWelcomeModal, stato era:",
            showWelcomeModal
          );
          setShowWelcomeModal(true);
          console.log("DEBUG: dopo setShowWelcomeModal, stato è:", true);

        const hideWelcomeModal = localStorage.getItem("hideWelcomeModal");
        if (!hideWelcomeModal) {
          setShowWelcomeModal(true);
        } else {
          navigate("/dashboard");
        }
      } else {
        setError(body.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      setError("Errore di rete");
    }
  };

  const handleWelcomeModalClose = () => {
    setShowWelcomeModal(false);
    navigate("/dashboard");
  };

  return (
    <div className="hero-background d-flex justify-content-center align-items-center min-vh-100">
      <div className="container-fluid px-3">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 col-xxl-4">
            <div className="login-card p-4 p-md-5">
              <h2 className="login-title text-center mb-4">Log in</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <input
                    type="text"
                    className="form-control form-control-lg bg-dark text-white border-0 rounded-3"
                    placeholder="Email or Username"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group mb-3 password-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control form-control-lg bg-dark text-white border-0 rounded-3 pe-5"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <span
                    className="password-toggle"
                    onClick={() => setShowPassword((v) => !v)}
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </span>
                </div>

                {error && (
                  <div className="error-text alert alert-danger text-center py-2 mb-3 small">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-primary w-100 btn-lg py-2 mb-3"
                >
                  Log in
                </button>
              </form>

              <div className="text-center mb-3">
                <button
                  type="button"
                  className="btn btn-link text-decoration-none p-0 text-white small"
                  onClick={() => setShowForgotPasswordModal(true)}
                >
                  Forgot your password?{" "}
                  <span className="text-primary text-decoration-underline">
                    Click here
                  </span>
                </button>
              </div>

              <p className="signup-text text-center mb-0">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-primary text-decoration-underline"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modali */}
      <ForgotPasswordModal
        isOpen={showForgotPasswordModal}
        onClose={() => setShowForgotPasswordModal(false)}
      />

      <WelcomeModal
        isOpen={showWelcomeModal}
        onClose={handleWelcomeModalClose}
        username={identifier}
      />
    </div>
  );
}
