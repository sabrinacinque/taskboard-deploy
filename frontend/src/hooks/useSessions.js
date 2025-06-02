// src/hooks/useSessions.js
import { useState, useEffect, useCallback } from "react";

export function useSessions() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);

  const fetchRecent = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8080/api/v1/sessions/recent", {
        headers: { 
          "Authorization": `Bearer ${token}` 
        }
      });
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setSessions(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRecent();
  }, [fetchRecent]);

  return { sessions, loading, error, refetch: fetchRecent };
}
