import React, { useState } from "react";
import TaskCard from "./TaskCard";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function Column({
  title,
  tasks,
  onAdd,
  onAction,
  isCollapsible = false
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Trova l'ultimo task incoming per mostrare la pillola NEW
  const newestIncomingTask = title === "incoming" && tasks.length > 0 
    ? tasks.reduce((newest, current) => 
        new Date(current.insertDate) > new Date(newest.insertDate) ? current : newest
      )
    : null;

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="d-flex flex-column">
      {/* Header della colonna con background sempre visibile */}
      <div className="bg-dark bg-opacity-50 rounded p-3 mb-2">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="text-light text-capitalize mb-0">{title}</h5>
          
          {/* Freccia collassa solo su schermi < lg */}
          {isCollapsible && (
            <button 
              className="btn btn-sm btn-outline-light d-lg-none p-1"
              onClick={toggleExpanded}
              style={{ minWidth: '32px', height: '32px' }}
            >
              {isExpanded ? (
                <ChevronUp size={16} className="text-white" />
              ) : (
                <ChevronDown size={16} className="text-white" />
              )}
            </button>
          )}
        </div>

        {/* Badge con numero task */}
        {tasks.length >= 0 && (
          <span className="badge bg-secondary mt-2">
            {tasks.length} task{tasks.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* Bottone Add - sempre visibile fuori dal contenuto collassabile */}
      {title !== "incoming" && title !== "done" && (
        <button
          className="btn btn-outline-light w-100 mb-2 py-2"
          onClick={onAdd}
        >
          + Add
        </button>
      )}

      {/* Area task - sempre visibile su lg+, collassabile su schermi piccoli */}
      <div className={`${
        isCollapsible ? 'd-lg-block' : ''
      } ${isCollapsible && !isExpanded ? 'd-none' : ''}`}>
        {(isExpanded || !isCollapsible || window.innerWidth >= 992) && (
          <div className="bg-dark bg-opacity-50 rounded p-2" style={{ minHeight: '200px', maxHeight: '70vh', overflowY: 'auto' }}>
            {tasks.length === 0 ? (
              <div className="text-center text-muted py-3">
                <small>No tasks</small>
              </div>
            ) : (
              tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onAction={onAction}
                  isNewest={newestIncomingTask && task.id === newestIncomingTask.id}
                />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}