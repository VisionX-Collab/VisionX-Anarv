const axios = require('axios');
require('dotenv').config();

const githubAPI = axios.create({
    baseURL: "https://api.github.com",
    headers: {
        Authorization: `token ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
    },
});

module.exports = githubAPI;