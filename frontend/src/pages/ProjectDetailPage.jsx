import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useProject } from "../hooks/useProjects";
import { useTasks } from "../hooks/useTasks";
import { useFriends } from "../hooks/useFriends";
import AddMemberModal from "../components/AddMemberModal";
import AddProjectTaskModal from "../components/AddProjectTaskModal";


export default function ProjectDetailPage() {
  const { id } = useParams();
  const { project, refresh, addMember, removeMember } = useProject(id);
  const { tasks, fetchAll: refreshTasks, addTask, updateTask } = useTasks(id);
  const { connections } = useFriends();

  const [addingMember, setAddingMember] = useState(false);
  const [addingTask, setAddingTask] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const currentUserId = Number(localStorage.getItem("userId"));

  console.log("🏗️ ProjectDetailPage - Project ID:", id);
  console.log("📋 Tasks received in component:", tasks);
  console.log("🔢 Number of tasks:", tasks?.length || 0);

  useEffect(() => {
    console.log("🔄 Refreshing tasks for project:", id);
    refreshTasks();
  }, [refreshTasks, id]);

  if (!project) return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <p className="text-white">Loading…</p>
    </div>
  );

  const isAdmin = project.members.some(
    (m) => m.user.id === currentUserId && m.role === "ADMIN"
  );

  const projectTasks = tasks;

  console.log("✅ Final project tasks to display:", projectTasks);

  const handleTaskSave = async (input) => {
    if (input.id) {
      // Modalità editing
      await updateTask(input.id, {
        description: input.description,
        recipientId: input.recipientId,
        projectId: Number(id)
      });
    } else {
      // Modalità creazione
      await addTask({ ...input, projectId: id });
    }
    refreshTasks();
    setAddingTask(false);
    setEditingTask(null);
  };

  return (
    <div className="container-fluid background text-white min-vh-100 p-3 p-md-4">
      <div className="pt-3 pt-md-5">
        <div className="mb-5 text-center">
             <Link to="/projects" >&larr; Back to Projects List</Link>
        </div>
        
        <h1 className="h2 h1-md mb-3">Title: {project.name}</h1>
        <div className="mb-4">
          <p className="mb-2">
            <strong>Date creating project:</strong> {new Date(project.startDate).toLocaleString()}
          </p>
          <p className="mb-2">
            <strong>Date ending project:</strong> {new Date(project.endDate).toLocaleString()}
          </p>
        </div>
        
        <h3 className="h4 h3-md mb-4">Description: {project.description}</h3>

        <div className="mb-4">
          <h4 className="h5 h4-md mb-3">Members</h4>
          {isAdmin && (
            <div className="mb-3 d-flex flex-column flex-sm-row gap-2">
              <button
                className="btn btn-sm btn-primary"
                onClick={() => setAddingMember(true)}
              >
                + Add Member
              </button>
              <button
                className="btn btn-sm btn-success"
                onClick={() => setAddingTask(true)}
              >
                + Add Task
              </button>
            </div>
          )}
          <ul className="list-group mb-4">
            {project.members.map((m) => {
              const isSelf = m.user.id === currentUserId;
              return (
                <li
                  key={m.id}
                  className="list-group-item d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center bg-dark bg-opacity-25 text-white"
                >
                  <span className="mb-2 mb-sm-0">
                    {m.user.username} ({m.user.email}) —{" "}
                    {m.role === "ADMIN" ? (
                      <em className="text-warning">Admin</em>
                    ) : (
                      <em className="text-secondary">Member</em>
                    )}
                  </span>
                  {isAdmin && !isSelf && (
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={async () => {
                        await removeMember(m.user.id);
                        refresh();
                      }}
                    >
                      Remove
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <h4 className="h5 h4-md mb-3">Project Tasks ({projectTasks?.length || 0})</h4>
          {projectTasks?.length === 0 ? (
            <p className="text-white-50">No tasks found for this project.</p>
          ) : (
            <ul className="list-group">
              {projectTasks.map((task) => (
                <li
                  key={task.id}
                  className="list-group-item d-flex flex-column flex-sm-row align-items-start align-items-sm-center bg-dark bg-opacity-25 text-white"
                >
                  <span className="flex-grow-1 mb-2 mb-sm-0">
                    <div className="fs-5 fs-md-4">{task.description}</div>
                    <small className="d-block text-white">
                      State: {task.state} | Assigned to: <span className="text-success">{task.recipientUsername || task.user?.username || 'Unassigned'}</span>
                    </small>
                  </span>
                  {isAdmin && (
                    <button
                      className="btn btn-sm btn-outline-light ms-sm-2"
                      onClick={() => setEditingTask(task)}
                      title="Edit task"
                    >
                      ✏️
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {isAdmin && addingMember && (
        <AddMemberModal
          show={addingMember}
          onClose={() => setAddingMember(false)}
          existingMembers={project.members.map((m) => m.user.id)}
          onSave={async (userId) => {
            await addMember(userId, "MEMBER");
            refresh();
          }}
          connections={connections}
        />
      )}

      {isAdmin && (addingTask || editingTask) && (
        <AddProjectTaskModal
          show={addingTask || !!editingTask}
          onClose={() => {
            setAddingTask(false);
            setEditingTask(null);
          }}
          members={project.members}
          editingTask={editingTask}
          onSave={handleTaskSave}
        />
      )}

      

    </div>
  );
}