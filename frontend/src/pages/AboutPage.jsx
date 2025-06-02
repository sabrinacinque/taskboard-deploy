import React from "react";
import { Link } from "react-router-dom";

export default function AboutPage() {
  return (
    <div className="d-flex background vh-100">
     

      <div className="container overflow-scroll mt-4 ">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="text-center mb-5">
              <h1 className="text-white display-4 mb-3">About TaskBoard</h1>
              <p className="text-light fs-5">
                Empowering teams to collaborate and achieve more together
              </p>
            </div>

            <div className="card bg-dark bg-opacity-75 text-white mb-4">
              <div className="card-body">
                <h3 className="card-title text-warning mb-3">Our Mission</h3>
                <p className="card-text fs-6">
                  TaskBoard was created to simplify project management and team
                  collaboration. We believe that great things happen when teams
                  can organize their work efficiently, communicate seamlessly,
                  and track progress in real-time.
                </p>
              </div>
            </div>

            <div className="row g-4 mb-4">
              <div className="col-md-4">
                <div className="card bg-dark bg-opacity-50 text-white h-100 text-center">
                  <div className="card-body">
                    <div className="display-6 text-success mb-3">🚀</div>
                    <h5 className="card-title">Innovation</h5>
                    <p className="card-text">
                      Constantly improving our platform with cutting-edge
                      features and intuitive design.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card bg-dark bg-opacity-50 text-white h-100 text-center">
                  <div className="card-body">
                    <div className="display-6 text-warning mb-3">🤝</div>
                    <h5 className="card-title">Collaboration</h5>
                    <p className="card-text">
                      Bringing teams together through seamless communication and
                      shared goals.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card bg-dark bg-opacity-50 text-white h-100 text-center">
                  <div className="card-body">
                    <div className="display-6 text-danger mb-3">💎</div>
                    <h5 className="card-title">Quality</h5>
                    <p className="card-text">
                      Delivering a reliable, fast, and secure platform you can
                      depend on.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card bg-dark bg-opacity-75 text-white mb-4">
              <div className="card-body">
                <h3 className="card-title text-warning mb-3">
                  Why Choose TaskBoard?
                </h3>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <span className="text-success">✓</span>{" "}
                    <strong>Simple & Intuitive:</strong> No complex setup, start
                    organizing immediately
                  </li>
                  <li className="mb-2">
                    <span className="text-success">✓</span>{" "}
                    <strong>Real-time Collaboration:</strong> Work together
                    seamlessly with your team
                  </li>
                  <li className="mb-2">
                    <span className="text-success">✓</span>{" "}
                    <strong>Flexible Organization:</strong> Adapt the system to
                    your workflow
                  </li>
                  <li className="mb-2">
                    <span className="text-success">✓</span>{" "}
                    <strong>Cross-platform:</strong> Access your tasks anywhere,
                    anytime
                  </li>
                </ul>
              </div>
            </div>

            <div className="text-center mb-3 ">
              <div className="card bg-dark bg-opacity-75 text-white">
                <div className="text-center mt-4 pb-3">
                  <h5 className="card-title text-success">
                    Ready to Get Started?
                  </h5>
                  <Link to="/register" className="btn btn-primary me-3">
                    Register Now
                  </Link>
                  <a
                    href="https://www.linkedin.com/in/sabrina-cinque/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-light"
                  >
                    My LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
