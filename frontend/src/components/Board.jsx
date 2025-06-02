import React, { useState } from "react";
import Column from "./Column";
import AddTaskModal from "./AddTaskModal";
import EditTaskModal from "./EditTaskModal";
import Swal from "sweetalert2";

const STATES = ["urgent", "this week", "incoming", "done"];

export default function Board({
  tasks,
  addTask,
  deleteTask,
  updateTask,
  refreshTasks
}) {
  const [addState, setAddState] = useState(null);
  const [editTask, setEditTask] = useState(null);

  const byState = state => tasks.filter(t => t.state === state);

  const handleAction = async (task, action) => {
    if (action === "delete") {
      const result = await Swal.fire({
        title: `Delete "${task.title}"?`,
        text: "This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it",
        cancelButtonText: "Cancel"
      });
      if (result.isConfirmed) {
        await deleteTask(task.id);
        await Swal.fire({ title: "Deleted!", icon: "success", timer: 1200, showConfirmButton: false });
      }
    } else if (action === "done" && task.state !== "done") {
      await updateTask(task.id, { state: "done" });
      await Swal.fire({ title: "Nice!", text: `"${task.title}" marked done.`, icon: "success", timer: 1200, showConfirmButton: false });
    } else if (action === "edit") {
      setEditTask(task);
      return;
    }
    refreshTasks();
  };

  return (
    <>
      {/* Grid responsive: 2x2 su mobile/tablet, 1x4 su desktop */}
      <div className="container-fluid vh-100 p-2">
        <div className="row g-2">
          {STATES.map(state => (
            <div key={state} className="col-12 col-sm-6 col-lg-3 d-flex flex-column">
              <Column
                title={state}
                tasks={byState(state)}
                onAdd={() => setAddState(state)}
                onAction={handleAction}
                isCollapsible={true}
              />
            </div>
          ))}
        </div>
      </div>

      {addState && (
        <AddTaskModal
          show
          state={addState}
          onClose={() => setAddState(null)}
          onSave={async input => {
            await addTask(input);
            setAddState(null);
            refreshTasks();
          }}
        />
      )}

      {editTask && (
        <EditTaskModal
          show
          task={editTask}
          onClose={() => setEditTask(null)}
          onSave={async (id, input) => {
            await updateTask(id, input);
            setEditTask(null);
            refreshTasks();
          }}
        />
      )}
    </>
  );
}