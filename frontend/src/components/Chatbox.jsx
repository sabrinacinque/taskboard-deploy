import React, { useState } from "react";
import { X } from "lucide-react";
import robotImg from "../../public/images/robot.png";

export default function Chatbox({ onClose }) {
  // Struttura dei topic in inglese, suddivisi in categorie
  const chatTopics = {
    tasks: {
      title: "📋 Task Management",
      options: [
        {
          id: "create-task",
          text: "How do I create a new task?",
          answer:
            "Click on '+ Add Task' in the dashboard or in any project view. Fill in the description, assign it to a user, and set the priority level before saving.",
        },
        {
          id: "change-state",
          text: "How can I change a task's status?",
          answer:
            "Simply drag and drop the task card between columns (e.g., Urgent, This Week, Incoming, Done) or use the status dropdown within the task details modal.",
        },
        {
          id: "assign-task",
          text: "How do I assign a task to someone?",
          answer:
            "When creating or editing a task, select the assignee from the 'Assign to' dropdown. You can choose anyone who is a member of the project or in your friends list.",
        },
        {
          id: "task-deadline",
          text: "How are deadlines managed?",
          answer:
            "Deadlines are tied to the column state: 'Urgent' for immediate tasks, 'This Week' for week-long tasks, 'Incoming' for future tasks, and 'Done' once completed.",
        },
      ],
    },
    collaboration: {
      title: "👥 Collaboration",
      options: [
        {
          id: "invite-members",
          text: "How do I invite members to a project?",
          answer:
            "Go to the project page and click '+ Add Member'. You can invite only users who are already in your friends or contacts list.",
        },
        {
          id: "share-tasks",
          text: "How do I share tasks with friends?",
          answer:
            "Create a new task and select a friend as the assignee. The task will automatically appear in their dashboard under the 'Incoming' column.",
        },
        {
          id: "project-permissions",
          text: "How do I manage project permissions?",
          answer:
            "Only project admins can add/remove members and modify project settings. Regular members can view tasks but cannot change permissions.",
        },
      ],
    },
    features: {
      title: "🚀 Features",
      options: [
        {
          id: "notifications",
          text: "How do notifications work?",
          answer:
            "You receive real-time notifications for new tasks assigned to you. The system checks for updates every 30 seconds.",
        },
        {
          id: "task-states",
          text: "What do the task states mean?",
          answer:
            "URGENT: tasks that need immediate attention. THIS WEEK: tasks to complete within the week. INCOMING: tasks scheduled for the future. DONE: completed tasks.",
        },
        {
          id: "task-priority",
          text: "How do I organize by priority?",
          answer:
            "Tasks are automatically sorted from newest to oldest in each column. Use the column states (Urgent/This Week/Incoming) to manage priority levels.",
        },
      ],
    },
    support: {
      title: "🔧 Support",
      options: [
        {
          id: "no-notifications",
          text: "I'm not receiving notifications",
          answer:
            "Ensure you are logged in and assigned to tasks correctly. Data sync happens every 30 seconds. Try refreshing the page if necessary.",
        },
        {
          id: "sync-issues",
          text: "I have synchronization issues",
          answer:
            "Reload the page or log out and log in again. All data should auto-sync every 30 seconds. Check your network connection if problems persist.",
        },
        {
          id: "account-settings",
          text: "How do I manage my account settings?",
          answer:
            "Use the sidebar on the left to navigate to 'Settings'. There you can update your profile, change your avatar, and modify your password.",
        },
      ],
    },
  };

  // Stato per la categoria selezionata (null = nessuna selezione)
  const [selectedCategory, setSelectedCategory] = useState(null);
  // Stato per la singola opzione selezionata all’interno della categoria
  const [selectedOption, setSelectedOption] = useState(null);

  // Se l’utente sceglie una categoria: mostra elenco delle sue opzioni
  const handleCategoryClick = (catKey) => {
    setSelectedCategory(catKey);
    setSelectedOption(null);
  };

  // Se l’utente sceglie un’opzione: mostra la risposta corrispondente
  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  // Torna alla lista categorie
  const backToCategories = () => {
    setSelectedCategory(null);
    setSelectedOption(null);
  };

  // Torna alla lista opzioni nella stessa categoria
  const backToOptions = () => {
    setSelectedOption(null);
  };

  return (
    <div className="chatbox-container border border-3">
      <div className="card shadow bg-dark text-white" style={{ width: "300px", height: "430px" }}>
        {/* Header: titolo + icona "X" per chiudere - mantiene il colore celeste */}
        <div className="card-header d-flex justify-content-between align-items-center bg-dark border-bottom mb-4">
          <div className="d-flex align-items-center">
            <img src={robotImg} alt="avatarRobot" style={{ width: "40px", height: "40px", marginRight: "8px" }} />
            <span>Hi, I'm Dino , <br></br>your virtual assistant .<br></br>How can I help you?</span>
          </div>
          <button
            className="btn btn-sm btn-transparent text-white position-absolute top-0 end-0"
            onClick={onClose} 
          >
            <X size={20} />
          </button>
        </div>

        {/* Corpo principale - ora con bg-dark text-white */}
        <div className="card-body d-flex flex-column p-2 bg-dark text-white">
          {/* 1. Se non ho selezionato alcuna categoria, mostro le categorie */}
          {!selectedCategory && (
            <>
              <p className="small text-white mb-2">
                How can I help you today? Choose a topic:
              </p>
              <div className="list-group list-group-flush flex-grow-1 overflow-auto">
                {Object.entries(chatTopics).map(([key, cat]) => (
                  <button
                    key={key}
                    className="list-group-item list-group-item-action bg-dark text-white"
                    onClick={() => handleCategoryClick(key)}
                  >
                    {cat.title}
                  </button>
                ))}
              </div>
            </>
          )}

          {/* 2. Se ho selezionato una categoria ma non un’opzione, mostro le opzioni */}
          {selectedCategory && !selectedOption && (
            <>
              <button
                className="btn btn-link btn-sm mb-2 text-white"
                onClick={backToCategories}
              >
                ← Back to topics
              </button>
              <p className="small text-white mb-2">
                {chatTopics[selectedCategory].title} — select a question:
              </p>
              <div className="list-group list-group-flush flex-grow-1 overflow-auto">
                {chatTopics[selectedCategory].options.map((opt) => (
                  <button
                    key={opt.id}
                    className="list-group-item list-group-item-action bg-dark text-white"
                    onClick={() => handleOptionClick(opt)}
                  >
                    {opt.text}
                  </button>
                ))}
              </div>
            </>
          )}

          {/* 3. Se ho selezionato un’opzione, mostro la risposta */}
          {selectedOption && (
            <>
              <button
                className="btn btn-link btn-sm mb-2 text-white"
                onClick={backToOptions}
              >
                ← Back to questions
              </button>
              <div className="flex-grow-1 overflow-auto bg-dark text-white">
                <p className="fw-bold mb-2 text-white">{selectedOption.text}</p>
                <p className="text-white">{selectedOption.answer}</p>
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
}