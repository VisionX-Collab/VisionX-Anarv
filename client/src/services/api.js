import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5100/api/github',
});

// Login with GitHub
export const loginWithGitHub = () => {
    window.location.href = 'http://localhost:5100/api/github/login';
};

// Fetch GitHub repositories
export const getUserRepos = async (accessToken) => {
    const response = await api.get(`/repos?accessToken=${accessToken}`);
    return response.data;
};

// Fetch contributions for a repository
export const getRepoContributions = async (owner, repo, accessToken) => {
    const response = await api.get(`/contributions/${owner}/${repo}?accessToken=${accessToken}`);
    return response.data;
};

export const createProject = async (accessToken, projectName, visibility) => {
    const response = await api.post('/github/create-project', {
        accessToken,
        projectName,
        visibility,
    });

    return response.data;
};