const express = require('express');
const router = express.Router();
const githubAPI = require('../services/githubService');

// Test endpoint to get user details
router.get('/user', async (req, res) => {
    try {
        const response = await githubAPI.get('/user');
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;