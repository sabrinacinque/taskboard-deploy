import { useState, useEffect, useCallback } from "react";

export function useSessions() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);

  // Usa la variabile d’ambiente per ricavare l’URL base:
  const BASE = `${import.meta.env.VITE_API_URL}/api/v1/sessions`;

  const fetchRecent = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${BASE}/recent`, {
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
  }, [BASE]);

  useEffect(() => {
    fetchRecent();
  }, [fetchRecent]);

  return { sessions, loading, error, refetch: fetchRecent };
}
