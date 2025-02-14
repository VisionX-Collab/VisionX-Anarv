const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    githubId: { type: String, required: true, unique: true },
    email: { type: String },
    tokens: { type: Number, default: 0 }, // User’s blockchain tokens
});

module.exports = mongoose.model('User', UserSchema);