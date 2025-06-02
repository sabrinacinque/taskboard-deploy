// src/components/TaskCard.jsx
import React from "react";
import { FiTrash2, FiEdit2, FiCheck, FiPhone } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import "./TaskCard.css";

const STATE_COLORS = {
  urgent:      "rgba(255,  0,   0,   0.2)",
  "this week": "rgba(255,255,  0,   0.2)",
  incoming:    "rgba(  0,255,255,   0.2)",
  done:        "rgba(  0,255,  0,   0.2)",
};

export default function TaskCard({ task, onAction, isNewest = false }) {
  const raw = task.creatorNumber || "";            // e.g. "3311234567"
const withPrefix = raw.startsWith("+") 
  ? raw 
  : "+39" + raw.replace(/\D/g, "");               // ottieni "+393311234567"
const plainNumber = withPrefix.replace(/\D/g, ""); // ottieni "393311234567"

  return (
    <div
      className="task-card p-3 mb-3 rounded position-relative"
      style={{
        backgroundColor: STATE_COLORS[task.state] || "rgba(255,255,255,0.1)",
      }}
    >
      {/* ──────────────────────────────────────────────────── */}
      {/* MOSTRA “NEW” in alto a destra se è l’ultimo incoming  */}
      {/* ──────────────────────────────────────────────────── */}
      {task.state === "incoming" && isNewest && (
        <span
          className="position-absolute top-0 end-0 translate-middle badge rounded-pill bg-danger"
          style={{ fontSize: "0.7rem", zIndex: 10 }}
        >
          NEW
        </span>
      )}

      {/* ───────────────────────────── */}
      {/* RIGA 1: “From: …” + Telefono/WA */}
      {/* ───────────────────────────── */}
      {task.state === "incoming" && (
        <div className="row mb-2">
          <div className="col-12 d-flex flex-wrap align-items-center">
            <span className="me-2 small text-danger fw-bold">
              From: <strong>{task.creatorUsername}</strong>
            </span>
            {plainNumber && (
              <div className="d-flex gap-3">
                {/* Icona Telefono */}
                <a
                  href={`tel:${plainNumber}`}
                  className="text-decoration-none text-danger"
                  title={`Call ${task.creatorUsername}`}
                >
                  <FiPhone size={20} />
                </a>
                {/* Icona WhatsApp */}
                <a
                  href={`https://wa.me/${plainNumber}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-decoration-none text-success"
                  title={`WhatsApp ${task.creatorUsername}`}
                >
                  <FaWhatsapp size={20} />
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ───────────────────────────── */}
      {/* RIGA 2: Titolo / Descrizione */}
      {/* ───────────────────────────── */}
      <div className="row mb-2">
        <div className="col-12">
          <h6 className="task-title mb-1 text-capitalize">{task.title}</h6>
          {task.description && (
            <p className="task-desc small">{task.description}</p>
          )}
        </div>
      </div>

      {/* ───────────────────────────── */}
      {/* RIGA 3: Data di creazione */}
      {/* ───────────────────────────── */}
      <div className="row mb-2">
        <div className="col-12">
          <div className="small text-white-50">
            Created:{" "}
            {new Date(task.insertDate).toLocaleString([], {
              day:   "2-digit",
              month: "2-digit",
              year:  "numeric",
              hour:  "2-digit",
              minute:"2-digit",
            })}
          </div>
        </div>
      </div>

      {/* ───────────────────────────── */}
      {/* RIGA 4: Icone di azione (✔ ✎ 🗑) */}
      {/* ───────────────────────────── */}
      <div className="row">
        <div className="col-12 text-end">
          <div className="action-icons d-inline-flex gap-3">
            {/* Mostro ✔ solo se non è “done” */}
            {task.state !== "done" && (
              <FiCheck
                className="action-icon text-success"
                title="Mark done"
                onClick={() => onAction(task, "done")}
                style={{ cursor: "pointer" }}
              />
            )}
            <FiEdit2
              className="action-icon text-warning"
              title="Edit"
              onClick={() => onAction(task, "edit")}
              style={{ cursor: "pointer" }}
            />
            <FiTrash2
              className="action-icon text-danger"
              title="Delete"
              onClick={() => onAction(task, "delete")}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
