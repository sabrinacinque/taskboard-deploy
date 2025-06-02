import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

export default function HomePage() {
  const noLoggedIn = !localStorage.getItem("token");
  
  return (
    <div className="hero-background d-flex align-items-center min-vh-100">
      <div className="container-fluid px-3 px-md-5">
        <div className="row justify-content-center ">
          <div className="col-12 col-md-8 col-lg-6 text-center text-lg-start">
            <h1 className="display-4 display-md-3 fw-bold mb-3 text-white">
              Manage your tasks efficiently
            </h1>
            <p className="lead text-white-50 mb-4 fs-5 fs-md-4">
              TaskBoard is a powerful task management tool that helps you
              organize your projects and collaborate with your team. With
              features like task assignment, progress tracking, and team
              collaboration, you can streamline your workflow and boost
              productivity.
            </p>
            {noLoggedIn && (
              <div className="d-flex flex-column flex-sm-row gap-2 gap-sm-3 justify-content-center justify-content-md-start">
                <Link to="/register" className="btn btn-primary btn-lg px-4 py-2">
                  Get Started
                </Link>
                <Link to="/login" className="btn btn-outline-light btn-lg px-4 py-2">
                  Log in
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
