const mongoose = require('mongoose');
const thoughtSchema = require('./Thought')

// Schema to create User model
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true, trim: true },
    email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
    thoughts: [thoughtSchema],
    friends: [userSchema]
},
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// Create a virtual property 'friendCount' that retrieves length of user's friends array field on query
userSchema.virtual('friendCount').get(function(){
    return this.friends.length;
});

// Initialize User model
const User = model('User', userSchema);

module.exports = User