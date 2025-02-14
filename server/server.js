const express = require('express');
const path = require('path');
const connectDB = require('./config/database');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5100;

// Connect MongoDB before starting the server
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const githubRoutes = require('./routes/github');
const userRoutes = require('./routes/user');
const projectRoutes = require('./routes/projects');

app.use('/api/github', githubRoutes);
app.use('/api/user', userRoutes);
app.use('/api/projects', projectRoutes);

// Serve React App
app.use(express.static(path.join(__dirname, '../client/build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});