const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const axios = require('axios');
require('dotenv').config();

// Fetch all projects
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create a new project
router.post('/create', async (req, res) => {
    try {
        const { name, description, owner } = req.body;

        // Create a GitHub repo
        const githubResponse = await axios.post(
            'https://api.github.com/user/repos',
            { name },
            {
                headers: {
                    Authorization: `token ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`,
                    Accept: 'application/vnd.github.v3+json',
                },
            }
        );

        // Save project details in DB
        const newProject = new Project({
            name,
            description,
            owner,
            repoUrl: githubResponse.data.html_url,
        });

        await newProject.save();
        res.status(201).json({ message: 'Project created successfully!', project: newProject });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;