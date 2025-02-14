const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    repoUrl: { type: String, required: true, unique: true },
    tokenAllocation: { type: Number, required: true },
    contributors: [
        {
            githubUsername: { type: String, required: true },
            contributions: { type: Number, default: 0 },
            tokensEarned: { type: Number, default: 0 },
        },
    ],
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Project', ProjectSchema);