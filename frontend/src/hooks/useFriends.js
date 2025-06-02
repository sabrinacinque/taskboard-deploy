import { useState, useEffect, useCallback, useMemo } from "react";

export function useFriends() {
  const [incoming, setIncoming]       = useState([]); // richieste in arrivo
  const [outgoing, setOutgoing]       = useState([]); // richieste inviate
  const [connections, setConnections] = useState([]); // amicizie accettate
  const [foundUser, setFoundUser]     = useState(null);
  const [searchError, setSearchError] = useState("");

  const token = localStorage.getItem("token");
  const meId  = Number(localStorage.getItem("userId"));

  // Variabile d’ambiente per URL base:
  const BASE = `${import.meta.env.VITE_API_URL}/api/v1/friends`;

  const authHeaders = useMemo(() => ({
    "Authorization": `Bearer ${token}`,
    "Content-Type":  "application/json"
  }), [token]);

  // 1) fetch incoming (richieste in arrivo)
  const fetchIncoming = useCallback(async () => {
    try {
      const res = await fetch(`${BASE}/pending`, {
        headers: authHeaders
      });
      if (res.ok) {
        setIncoming(await res.json());
      }
    } catch (err) {
      console.error("fetchIncoming failed:", err);
    }
  }, [BASE, authHeaders]);

  // 2) fetch outgoing (richieste inviate)
  const fetchOutgoing = useCallback(async () => {
    try {
      const res = await fetch(`${BASE}/outgoing`, {
        headers: authHeaders
      });
      if (res.ok) {
        setOutgoing(await res.json());
      }
    } catch (err) {
      console.error("fetchOutgoing failed:", err);
    }
  }, [BASE, authHeaders]);

  // 3) fetch connections (amicizie accettate)
  const fetchConnections = useCallback(async () => {
    try {
      const res = await fetch(`${BASE}/connections`, {
        headers: authHeaders
      });
      if (!res.ok) return;
      const frs = await res.json(); // array di FriendRequest

      // 3.a) mappo ciascuna FriendRequest in { id, username, email, friendRequestId }
      const peersWithRequestId = frs.map(fr => {
        const peer = fr.requester.id === meId ? fr.target : fr.requester;
        return {
          id: peer.id,
          username: peer.username,
          email: peer.email,
          number: peer.number,
          friendRequestId: fr.id
        };
      });

      // 3.b) deduplica per user.id
      const unique = peersWithRequestId.filter((u, i) =>
        peersWithRequestId.findIndex(p => p.id === u.id) === i
      );

      setConnections(unique);
    } catch (err) {
      console.error("fetchConnections failed:", err);
    }
  }, [BASE, authHeaders, meId]);

  // 4) search by email
  const searchByEmail = useCallback(async email => {
    setSearchError("");
    setFoundUser(null);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/users?email=${encodeURIComponent(email)}`,
        { headers: authHeaders }
      );
      if (res.ok) {
        const user = await res.json();
        if (user.id === meId) {
          setSearchError("That's you!");
        } else {
          setFoundUser(user);
        }
      } else {
        setSearchError("User not found");
      }
    } catch {
      setSearchError("Network error");
    }
  }, [authHeaders, meId]);

  // 5) send request
  const sendRequest = useCallback(async toUserId => {
    const res = await fetch(`${BASE}/request`, {
      method: "POST",
      headers: authHeaders,
      body: JSON.stringify({ toUserId })
    });
    if (res.ok) {
      await fetchOutgoing();
    } else {
      const err = await res.json();
      setSearchError(err.message || "Request failed");
    }
  }, [BASE, authHeaders, fetchOutgoing]);

  // 6) respond to incoming request
  const respond = useCallback(async (requestId, accept) => {
    await fetch(
      `${BASE}/${requestId}/respond?accept=${accept}`,
      { method: "PUT", headers: authHeaders }
    );
    await fetchIncoming();
    await fetchConnections();
  }, [BASE, authHeaders, fetchIncoming, fetchConnections]);

  // 7) remove friend (DELETE di una FriendRequest già accettata)
  const handleRemoveFriend = useCallback(async requestId => {
    try {
      const res = await fetch(`${BASE}/${requestId}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        // dopo aver eliminato, ricarica le connessioni
        await fetchConnections();
      } else {
        console.error("removeFriend API returned", res.status);
      }
    } catch (err) {
      console.error("removeFriend failed:", err);
    }
  }, [BASE, token, fetchConnections]);

  // inizializza i tre fetch all’avvio
  useEffect(() => {
    fetchIncoming();
    fetchOutgoing();
    fetchConnections();
  }, [fetchIncoming, fetchOutgoing, fetchConnections]);

  return {
    incoming,
    outgoing,
    connections,      // qui ora ogni elemento è { id, username, email, number, friendRequestId }
    foundUser,
    searchError,
    searchByEmail,
    sendRequest,
    respond,
    handleRemoveFriend
  };
}
