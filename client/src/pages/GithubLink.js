import React, { useState } from "react";
import axios from "axios";

const GitHubLink = () => {
  const [authUrl, setAuthUrl] = useState("");

  const handleLinkGitHub = async () => {
    try {
      const response = await axios.get("http://localhost:5100/api/github/auth-url");
      window.location.href = response.data.authUrl; // Redirect to GitHub OAuth
    } catch (error) {
      console.error("Error linking GitHub:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-6 bg-white shadow-md rounded-md text-center">
        <h2 className="text-2xl font-bold mb-4">🔗 Link Your GitHub Account</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleLinkGitHub}>
          Connect GitHub
        </button>
      </div>
    </div>
  );
};

export default GitHubLink;