const express = require('express');
const path = require('path');
const app = express();
const PORT = 5100; // Adjust the port if needed

const connectDB = require('./config/database');
connectDB();

const githubRoutes = require('./routes/github');
app.use('/api/github', githubRoutes);

const userRoutes = require('./routes/user');
app.use('/api/user', userRoutes);

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

// Example API route (optional)
app.get('/api', (req, res) => {
    res.json({ message: 'Welcome to VisionX API!' });
});


// Serve the React app for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});