const { Schema, model } = require('mongoose');
const dateFormat = require('../../pizza-hunt/utils/dateFormat');

// thoughts model
const ThoughtsSchema = new Schema(
        {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },

        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal) 
        },

        username: {
            type: String,
            required: true
        },

        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

ThoughtsSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
})

const Thoughts = model('Thoughts', ThoughtsSchema);

module.exports = Thoughts;
