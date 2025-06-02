import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

export function useTaskNotifications(tasks) {
  const [lastCheckTime, setLastCheckTime] = useState(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    // Recupera l'ultimo timestamp di controllo dal localStorage
    const storedTime = localStorage.getItem(`lastTaskCheck_${userId}`);
    if (storedTime) {
      setLastCheckTime(new Date(storedTime));
    } else {
      // Se non c'è un timestamp salvato, impostiamo ora come riferimento
      // ma NON salviamo, così le notifiche funzioneranno dalla prossima sessione
      setLastCheckTime(new Date());
    }
  }, [userId]);

  useEffect(() => {
    if (!tasks || !lastCheckTime || !userId) return;

    console.log("🔔 Checking for new tasks...");
    console.log("📅 Last check time:", lastCheckTime);
    console.log("📋 Tasks to check:", tasks.length);

    // Trova i task incoming nuovi dall'ultimo controllo
    const newIncomingTasks = tasks.filter(task => {
      const isIncoming = task.state === 'incoming';
      const isForMe = task.recipientId === Number(userId);
      const isNewer = new Date(task.insertDate) > lastCheckTime;
      
      console.log(`📝 Task "${task.title}": incoming=${isIncoming}, forMe=${isForMe}, newer=${isNewer}`);
      
      return isIncoming && isForMe && isNewer;
    });

    console.log("🆕 New incoming tasks found:", newIncomingTasks.length);

    // Mostra notifiche per i nuovi task
    newIncomingTasks.forEach(task => {
      console.log("🔔 Showing notification for:", task.title);
      Swal.fire({
        title: "Nuovo Task Ricevuto!",
        text: `${task.creatorUsername} ti ha inviato un nuovo task: "${task.title}"`,
        icon: "info",
        timer: 5000,
        showConfirmButton: false,
        position: "top-end",
        toast: true
      });
    });

    // Aggiorna il timestamp dell'ultimo controllo SOLO se ci sono stati nuovi task
    if (newIncomingTasks.length > 0) {
      const now = new Date().toISOString();
      localStorage.setItem(`lastTaskCheck_${userId}`, now);
      setLastCheckTime(new Date(now));
      console.log("⏰ Updated last check time to:", now);
    }
  }, [tasks, lastCheckTime, userId]);

  // Funzione per aggiornare manualmente il timestamp (chiamata al login)
  const markAsChecked = () => {
    const now = new Date().toISOString();
    localStorage.setItem(`lastTaskCheck_${userId}`, now);
    setLastCheckTime(new Date(now));
    console.log("✅ Manually marked tasks as checked:", now);
  };

  return { markAsChecked };
}