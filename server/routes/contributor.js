const express = require('express');
const router = express.Router();
const Contribution = require('../models/Contribution');

// Fetch all contributions for a user
router.get('/:userId', async (req, res) => {
    try {
        const contributions = await Contribution.find({ userId: req.params.userId });
        const totalTokens = contributions.reduce((sum, contribution) => sum + contribution.tokens, 0);
        res.json({ contributions, totalTokens });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Register a contribution
router.post('/add', async (req, res) => {
    try {
        const { userId, projectId, tokensEarned } = req.body;

        const newContribution = new Contribution({
            userId,
            projectId,
            tokens: tokensEarned,
        });

        await newContribution.save();
        res.status(201).json({ message: 'Contribution recorded!', contribution: newContribution });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;