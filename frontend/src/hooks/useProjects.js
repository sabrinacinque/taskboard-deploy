import { useState, useEffect, useCallback } from "react";

const BASE = `${import.meta.env.VITE_API_URL}/api/v1/projects`;

// LISTA PROGETTI
export function useProjects() {
  const [projects, setProjects] = useState([]);
  const [adminProjects, setAdminProjects] = useState([]);
  const [memberProjects, setMemberProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const token  = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const url = userId
        ? `${BASE}?userId=${encodeURIComponent(userId)}`
        : BASE;
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error("Fetch projects failed");
      const allProjects = await res.json();
      
      // Separa i progetti in base al ruolo dell'utente corrente
      const adminList = [];
      const memberList = [];
      
      allProjects.forEach(project => {
        const currentUserMembership = project.members?.find(
          member => member.user.id === parseInt(userId)
        );
        
        if (currentUserMembership?.role === "ADMIN") {
          adminList.push(project);
        } else if (currentUserMembership?.role === "MEMBER") {
          memberList.push(project);
        }
      });
      
      setProjects(allProjects);
      setAdminProjects(adminList);
      setMemberProjects(memberList);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  }, [token, userId]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const createProject = async ({ name, description, startDate, endDate }) => {
    const res = await fetch(`${BASE}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ name, description, startDate, endDate })
    });
    if (!res.ok) throw new Error("Create project failed");
    const proj = await res.json();
    setProjects(ps => [proj, ...ps]);
    // Il nuovo progetto sarà automaticamente un progetto admin per il creatore
    setAdminProjects(ps => [proj, ...ps]);
    return proj;
  };

  const deleteProject = async id => {
    const res = await fetch(`${BASE}/delete/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error("Delete project failed");
    setProjects(ps => ps.filter(p => p.id !== id));
    setAdminProjects(ps => ps.filter(p => p.id !== id));
    setMemberProjects(ps => ps.filter(p => p.id !== id));
  };

  const addMember = async (projectId, { userId, role }) => {
    const res = await fetch(`${BASE}/${projectId}/members`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ userId, role })
    });
    if (!res.ok) throw new Error("Add member failed");
    return res.json();
  };

  return {
    projects,
    adminProjects,
    memberProjects,
    loading,
    fetchAll,
    createProject,
    deleteProject,
    addMember
  };
}

// SINGOLO PROGETTO
export function useProject(projectId) {
  const [project, setProject] = useState(null);
  const token = localStorage.getItem("token");

  const fetchOne = useCallback(async () => {
    if (!projectId) return;
    const res = await fetch(`${BASE}/${projectId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error("Fetch project failed");
    setProject(await res.json());
  }, [projectId, token]);

  useEffect(() => { fetchOne(); }, [fetchOne]);

  const addMember = async (userId, role = "MEMBER") => {
    const res = await fetch(`${BASE}/${projectId}/members`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ userId, role })
    });
    if (!res.ok) throw new Error("Add member failed");
    return res.json();
  };

  const removeMember = async userId => {
    const res = await fetch(`${BASE}/${projectId}/members/${userId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error("Remove member failed");
  };

  return {
    project,
    refresh: fetchOne,
    addMember,
    removeMember
  };
}
