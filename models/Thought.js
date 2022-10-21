const mongoose = require('mongoose');
const userSchema = require('./User');
const reactionSchema = require('./Reaction');

// Schema to create Thought model
const thoughtSchema = new mongoose.Schema({
    thoughtText: { type: String, required: true, minlength: 1, maxlength: 280 },
    createdAt: { type: Date, default: Date.now(), get: (date) => timeSince(date) },
    username: { userSchema, type: String, required: true },
    reactions: [reactionSchema],
},
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// Creates a virtual that retrieves length of the thoughts reactions
thoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
});

module.exports = Thought;