import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [isGitHubLinked, setIsGitHubLinked] = useState(false);

  useEffect(() => {
    fetchProjects();
    checkGitHubLink();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get("http://localhost:5100/api/projects");
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const checkGitHubLink = async () => {
    try {
      const response = await axios.get("http://localhost:5100/api/github/status");
      setIsGitHubLinked(response.data.linked);
    } catch (error) {
      console.error("Error checking GitHub link:", error);
    }
  };

  const handleContribute = async (projectId) => {
    try {
      const response = await axios.post(`http://localhost:5100/api/projects/contribute`, { projectId });
      alert(response.data.message);
      fetchProjects();
    } catch (error) {
      console.error("Error contributing to project:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">🚀 VisionX Dashboard</h1>

        {!isGitHubLinked ? (
          <div className="p-4 bg-yellow-200 rounded-md mb-6">
            <p>⚠️ Please link your GitHub account to start contributing.</p>
            <Link to="/github-link" className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded">
              Link GitHub
            </Link>
          </div>
        ) : (
          <>
            <button className="bg-green-500 text-white px-4 py-2 rounded mb-4">
              <Link to="/create-project">➕ Create New Project</Link>
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div key={project._id} className="p-4 bg-white shadow-md rounded-md">
                  <h2 className="text-xl font-bold">{project.name}</h2>
                  <p className="text-gray-600">{project.description}</p>
                  <button
                    className="mt-3 bg-blue-500 text-white px-3 py-1 rounded"
                    onClick={() => handleContribute(project._id)}
                  >
                    Contribute
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;


