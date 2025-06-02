import React from 'react';
import { Link } from 'react-router-dom';


export default function HelpPage() {
  return (
    <div className="d-flex background vh-100">
  
      
      <div className="container py-5 overflow-y-scroll">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="text-center mb-5">
              <h1 className="text-white display-4 mb-3">Help & Support</h1>
              <p className="text-light fs-5">Find answers to common questions about TaskBoard</p>
            </div>

            <div className="row g-4">
              <div className="col-md-6">
                <div className="card bg-dark bg-opacity-75 text-white h-100">
                  <div className="card-body">
                    <h5 className="card-title text-warning">Getting Started</h5>
                    <p className="card-text">
                      Learn how to create your first project, add tasks, and invite team members to collaborate effectively.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card bg-dark bg-opacity-75 text-white h-100">
                  <div className="card-body">
                    <h5 className="card-title text-warning">Managing Tasks</h5>
                    <p className="card-text">
                      Organize your tasks by states: urgent, this week, incoming, and done. Set deadlines and track progress.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card bg-dark bg-opacity-75 text-white h-100">
                  <div className="card-body">
                    <h5 className="card-title text-warning">Projects & Collaboration</h5>
                    <p className="card-text">
                      Create projects, add team members, and manage project-specific tasks. Assign roles and permissions.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card bg-dark bg-opacity-75 text-white h-100">
                  <div className="card-body">
                    <h5 className="card-title text-warning">Friends & Connections</h5>
                    <p className="card-text">
                      Connect with colleagues, send tasks to friends, and receive incoming tasks from your network.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 text-center">
              <div className="card bg-dark bg-opacity-75 text-white">
                <div className="card-body">
                  <h5 className="card-title text-success">Need More Help?</h5>
                  <p className="card-text mb-3">
                    Can't find what you're looking for? Contact our support team for personalized assistance.
                  </p>
                   <Link to="/contact" className="btn btn-success me-3">
                      Contact Support
                   </Link>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}