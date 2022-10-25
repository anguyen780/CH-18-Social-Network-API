const { Schema, Types } = require('mongoose');
const moment = require('moment')

// schema to create reaction virtual
const reactionSchema = new Schema({
    reactionId: { type: Schema.Types.ObjectId, default: () => new Types.ObjectId()},
    reactionBody: { type: String, required: true, maxlength: 280},
    username: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, get: date => moment(date).format("MMMM Do YYYY, h:mm a") }
},
{
    toJSON: {
        virtuals: true,
        getters: true,
    },
    id: false,
}
);

module.exports = reactionSchema;