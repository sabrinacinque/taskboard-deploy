import React, { useState } from "react";
import { Link } from "react-router-dom";
import CreateProjectModal from "../components/CreateProjectModal";
import { useFriends } from "../hooks/useFriends";
import { useProjects } from "../hooks/useProjects";

export default function ProjectsPage() {
  const {
    adminProjects = [],
    memberProjects = [],
    loading,
    fetchAll,
    createProject,
    addMember,
    deleteProject,
  } = useProjects();

  const { connections } = useFriends();
  const [creating, setCreating] = useState(false);

  const ProjectList = ({ projects, showDeleteButton = false, title }) => {
    if (loading) {
      return (
        <div className="text-center my-4">
          <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="mt-2 text-muted">
            Loading {title.toLowerCase()}...
          </div>
        </div>
      );
    }

    if (projects.length === 0) {
      return (
        <div className="text-center my-4 p-4 bg-dark bg-opacity-25 rounded">
          <p className="text-white mb-0">
            {showDeleteButton
              ? "You haven't created any projects yet."
              : "You are not tagged in any projects yet."}
          </p>
        </div>
      );
    }

    return (
      <ul className="list-group mb-4">
  {projects.map((p) => (
    <li
      key={p.id}
      className="
        list-group-item 
        bg-dark bg-opacity-25 text-white 
        d-flex 
        flex-column flex-sm-row 
        justify-content-between 
        align-items-start align-items-sm-center
      "
    >
      {/* Titolo: flex-fill + text-break */}
      <div className="flex-fill mb-2 mb-sm-0">
        <span className="fw-bold text-break">{p.name}</span>
      </div>

      {/* Pulsanti */}
      <div className="d-flex gap-2">
        <Link to={`/projects/${p.id}`} className="btn btn-sm btn-warning">
          Details
        </Link>
        {showDeleteButton && (
          <button
            className="btn btn-sm btn-danger"
            onClick={async () => {
              await deleteProject(p.id);
              fetchAll();
            }}
          >
            Delete
          </button>
        )}
      </div>
    </li>
  ))}
</ul>

    );
  };

  return (
    <div className="container-fluid background text-white vh-100 p-3 p-md-4 overflow-y-scroll">
      {/* Header Row: Title + New Project Button */}
      <div className="row align-items-center mb-4">
        <div className="col-12 col-md-6 text-center text-md-start mb-3 mb-md-0">
          <h2>Your Projects</h2>
        </div>
        <div className="col-12 col-md-6 text-center text-md-end">
          <button className="btn btn-success" onClick={() => setCreating(true)}>
            + New Project
          </button>
        </div>
      </div>

      {/* Section: Projects You Created */}
      <div className="row mb-5">
        <div className="col-12">
          <h4 className="mb-3 text-success">Projects You Created</h4>
          <ProjectList
            projects={adminProjects}
            showDeleteButton={true}
            title="Projects You Created"
          />
        </div>
      </div>

      {/* Section: Projects You Are Tagged In */}
      <div className="row mb-5">
        <div className="col-12">
          <h4 className="mb-3 text-warning">Projects You Are Tagged In</h4>
          <ProjectList
            projects={memberProjects}
            showDeleteButton={false}
            title="Projects You Are Tagged In"
          />
        </div>
      </div>

      {/* Create Project Modal */}
      {creating && (
        <CreateProjectModal
          show={creating}
          onClose={() => setCreating(false)}
          onSave={async (payload) => {
            const proj = await createProject(payload);
            fetchAll();
            return proj;
          }}
          addMember={addMember}
          connections={connections}
        />
      )}
    </div>
  );
}
