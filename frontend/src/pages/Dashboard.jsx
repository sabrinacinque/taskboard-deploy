import React, { useEffect, useState } from "react";
import Board from "../components/Board";
import SidebarDX from "../components/SidebarDX";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { useTasks } from "../hooks/useTasks";
import { useTaskNotifications } from "../hooks/useTaskNotifications";
import "./Dashboard.css";

export default function Dashboard() {
  // Hook per i task
  const { tasks, fetchAll, addTask, deleteTask, updateTask } = useTasks();
  useTaskNotifications(tasks);

  // Stati per tracking sidebar destra
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  useEffect(() => {
    const interval = setInterval(() => fetchAll(), 30000);
    return () => clearInterval(interval);
  }, [fetchAll]);

  // Controllo autenticazione
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  if (!token || !userId) return null;

  // Ordina i task
  const sortedTasks = [...tasks].sort(
    (a, b) => new Date(b.insertDate) - new Date(a.insertDate)
  );

  const toggleRightSidebar = () => {
    setRightSidebarOpen(!rightSidebarOpen);
  };

  return (
    <div className="d-flex flex-grow-1 vh-100">
      {/* Contenuto principale - Board */}
      <div className="flex-grow-1 d-flex flex-column">
        <div className="board-area flex-grow-1 overflow-auto">
          <Board
            tasks={sortedTasks}
            addTask={addTask}
            deleteTask={deleteTask}
            updateTask={updateTask}
            refreshTasks={fetchAll}
          />
        </div>
      </div>

      {/* Sidebar destra - solo su mobile/tablet ha il toggle */}
      <div className="d-xl-none">
        <button
          className="btn btn-outline-secondary position-fixed top-50 end-0 translate-middle-y me-2 bg-dark border border-3 rounded-5 me-3 "
          type="button"
          onClick={toggleRightSidebar}
          style={{ zIndex: 1050 }}
        >
          {rightSidebarOpen ? (
            <ChevronsRight size={20} className="text-white" />
          ) : (
            <ChevronsLeft size={20} className="text-white" />
          )}
        </button>

        {/* Sidebar destra collassabile su mobile/tablet */}
        <div 
          className={`position-fixed top-0 h-100 bg-white shadow ${rightSidebarOpen ? 'end-0' : ''}`}
          style={{
            right: rightSidebarOpen ? 0 : '-300px',
            width: '300px',
            zIndex: 1040,
            transition: 'right 0.3s ease-in-out',
            marginTop: '60px' // per non sovrapporsi all'header
          }}
        >
          <SidebarDX tasks={sortedTasks} />
        </div>

        {/* Overlay per chiudere sidebar su mobile */}
        {rightSidebarOpen && (
          <div 
            className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
            style={{ zIndex: 1035, marginTop: '60px' }}
            onClick={toggleRightSidebar}
          ></div>
        )}
      </div>

      {/* Sidebar destra fissa su desktop */}
      <div className="d-none d-xl-block" style={{ width: '300px' }}>
        <SidebarDX tasks={sortedTasks} />
      </div>
    </div>
  );
}