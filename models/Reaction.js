const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
    reactionId: { type: mongoose.ObjectId, default: () => new mongoose.ObjectId()},
    reactionBody: { type: String, required: true, maxlength: 280},
    username: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, get: (date) => timeSince(date)}
});

module.exports = reactionSchema;