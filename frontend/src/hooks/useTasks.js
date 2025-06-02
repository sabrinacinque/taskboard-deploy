import { useState, useEffect, useCallback } from "react";

const BASE_URL = `${import.meta.env.VITE_API_URL}/api/v1/tasks`;


export function useTasks(projectId = null) {
  const [tasks, setTasks] = useState([]);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const fetchAll = useCallback(async () => {
    let url = BASE_URL;
    if (projectId) {
      url += `?projectId=${encodeURIComponent(projectId)}`;
    } else if (userId) {
      url += `?userId=${encodeURIComponent(userId)}`;
    }
    
    console.log("🔍 Calling API:", url);
    console.log("📋 ProjectId passed to hook:", projectId);
    
    const res = await fetch(url, {
      headers: { "Authorization": `Bearer ${token}` }
    });
    if (!res.ok) throw new Error("Fetch failed");
    
    const fetchedTasks = await res.json();
    console.log("📦 Fetched tasks from API:", fetchedTasks);
    console.log("📊 Number of tasks received:", fetchedTasks.length);
    
    setTasks(fetchedTasks);
  }, [projectId, userId, token]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const addTask = async input => {
    const res = await fetch(`${BASE_URL}/create`, {
      method: "POST",
      headers: { 
        "Content-Type":"application/json",
        "Authorization": `Bearer ${token}` 
      },
      body: JSON.stringify(input),
    });
    if (!res.ok) throw new Error("Add task failed");
    const newTask = await res.json();
    
    console.log("✅ Task created:", newTask);
    
    // se sto guardando un progetto, lo metto in lista anche se non è mio
    if (projectId) {
      setTasks(ts => [newTask, ...ts]);
    } else if (String(newTask.recipientId) === String(userId)) {
      setTasks(ts => [newTask, ...ts]);
    }
    return newTask;
  };

  const updateTask = async (id, input) => {
    console.log("🔄 Updating task:", id, "with data:", input);
    
    const res = await fetch(`${BASE_URL}/update/${id}`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` 
      },
      body: JSON.stringify(input),
    });
    if (!res.ok) throw new Error("Update failed");
    const updated = await res.json();
    
    console.log("✅ Task updated:", updated);
    
    setTasks(ts => ts.map(t => t.id === updated.id ? updated : t));
    return updated;
  };

  const deleteTask = async id => {
    const res = await fetch(`${BASE_URL}/delete/${id}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${token}` }
    });
    if (!res.ok) throw new Error("Delete failed");
    setTasks(ts => ts.filter(t => t.id !== id));
  };

  return { tasks, fetchAll, addTask, updateTask, deleteTask };
}
