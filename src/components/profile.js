// src/components/Profile.js
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "./firebase";
import { ref, get, remove, set } from "firebase/database";

export default function Profile() {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const fetchProjects = async () => {
      const snapshot = await get(ref(db, `Users/${user.uid}/projects`));
      if (snapshot.exists()) {
        const data = snapshot.val();
        const projectList = Object.entries(data).map(([id, proj]) => ({
          id,
          name: proj.name || "Untitled Project",
          updatedAt: proj.updatedAt || "Unknown",
        }));
        setProjects(projectList);
      }
    };

    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    const user = auth.currentUser;
    if (!user) return;
    await remove(ref(db, `Users/${user.uid}/projects/${id}`));
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const handleCreateProject = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const newId = Date.now().toString(); // unique projectId
    await set(ref(db, `Users/${user.uid}/projects/${newId}`), {
      name: "New Project",
      blocks: [],
      updatedAt: new Date().toISOString(),
    });

    navigate(`/builder/${newId}`); // go straight to builder
  };

  return (
    <div className="container mt-4">
      <h2>Your Projects</h2>
      <button className="btn btn-success mb-3" onClick={handleCreateProject}>
        + Create Project
      </button>

      {projects.length === 0 ? (
        <p>No projects yet. Start building in Canvas!</p>
      ) : (
        <ul className="list-group">
          {projects.map((p) => (
            <li
              key={p.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>{p.name}</strong>
                <br />
                <small>Last updated: {p.updatedAt}</small>
              </div>
              <div>
                <Link
                  to={`/builder/${p.id}`}
                  className="btn btn-primary btn-sm me-2"
                >
                  Open
                </Link>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(p.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
