// src/pages/RegisterPage.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import "./RegisterPage.css"; // eventuali stili custom

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Stati per le checkbox
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Controlla che le checkbox siano spuntate
    if (!acceptedTerms) {
      setError("You must download and accept the Terms and Conditions.");
      return;
    }
    if (!acceptedPrivacy) {
      setError("You must download and accept the Privacy Policy.");
      return;
    }

    // Verifica che le password combacino
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          email,
          password,
          active: true,
          number,
        }),
      });
      const body = await res.json();

      if (res.ok && body.success) {
        await Swal.fire({
          title: "Registration successful!",
          text: "You can now log in.",
          icon: "success",
          confirmButtonText: "OK",
          background: "#0f1c25",
          color: "#fff",
        });
        navigate("/login");
      } else {
        setError(body.message || "Registration failed.");
      }
    } catch {
      setError("Network error. Please try again.");
    }
  };

  return (
    <div className="hero-background d-flex justify-content-center align-items-center min-vh-100">
      <div className="container-fluid px-3">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 col-xxl-4">
            <div className="register-card bg-dark bg-opacity-75 p-4 p-md-5">
              <h2 className="card-title text-center mb-4">Sign Up</h2>
              <form onSubmit={handleSubmit}>
                {/* Username */}
                <div className="form-group mb-3">
                  <input
                    type="text"
                    className="form-control form-control-lg bg-dark text-white border-0 rounded-3"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>

                {/* Email */}
                <div className="form-group mb-3">
                  <input
                    type="email"
                    className="form-control form-control-lg bg-dark text-white border-0 rounded-3"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                {/* Phone Number */}
                <div className="form-group mb-3">
                  <input
                    type="text"
                    className="form-control form-control-lg bg-dark text-white border-0 rounded-3"
                    placeholder="Phone Number"
                    value={number}
                    onChange={(e) => setNumber(e.target.value.replace(/\D/g, ""))}
                    required
                  />
                </div>

                {/* Password */}
                <div className="form-group mb-3">
                  <input
                    type="password"
                    className="form-control form-control-lg bg-dark text-white border-0 rounded-3"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                {/* Confirm Password */}
                <div className="form-group mb-3">
                  <input
                    type="password"
                    className="form-control form-control-lg bg-dark text-white border-0 rounded-3"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>

                {/* Checkbox: Terms and Conditions (download link) */}
                <div className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="acceptTerms"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                  />
                  <label className="form-check-label text-white" htmlFor="acceptTerms">
                    I have read and accept the{" "}
                    <a
                      href="/terms.txt"                     
                      className="text-primary text-decoration-underline"
                      target="_blank"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>

                {/* Checkbox: Privacy Policy (download link) */}
                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="acceptPrivacy"
                    checked={acceptedPrivacy}
                    onChange={(e) => setAcceptedPrivacy(e.target.checked)}
                  />
                  <label className="form-check-label text-white" htmlFor="acceptPrivacy">
                    I have read and accept the{" "}
                    <a
                      href="/privacy.txt"
                      className="text-primary text-decoration-underline"
                      target="_blank"
                    >
                      Privacy Policy
                    </a>
                  </label>
                </div>

                {/* Messaggio di errore */}
                {error && (
                  <div className="alert alert-danger text-center py-2 mb-3 small">
                    {error}
                  </div>
                )}

                <button type="submit" className="btn btn-primary w-100 btn-lg py-2 mb-3">
                  Sign Up
                </button>
              </form>

              <p className="alt-text text-center mb-0 text-white">
                Already have an account?{" "}
                <Link to="/login" className="text-primary text-decoration-none">
                  Log In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
