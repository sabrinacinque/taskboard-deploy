// src/pages/RegisterPage.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import "./RegisterPage.css"; // <-- Assicurati che questo import punti al file qui sotto

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validazione password
    if (password !== confirmPassword) {
      setError("Le password non corrispondono");
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
        setError(body.message || "Registrazione fallita");
      }
    } catch {
      setError("Errore di rete");
    }
  };

  return (
    <div className="hero-background d-flex justify-content-center align-items-center min-vh-100">
      <div className="container-fluid px-3">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 col-xxl-4">
            <div className="register-card bg-dark bg-opacity-75 p-4 p-md-5">
              <h2 className="card-title">Sign up</h2>
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
                    onChange={(e) =>
                      setNumber(e.target.value.replace(/\D/g, ""))
                    }
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

                {error && (
                  <div className="error-text alert alert-danger text-center py-2 mb-3 small">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-primary w-100 btn-lg py-2 mb-3"
                >
                  Sign up
                </button>
              </form>

              <p className="alt-text text-center mb-0 text-white">
                Already have an account?{" "}
                <Link to="/login" className="text-primary text-decoration-none">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
