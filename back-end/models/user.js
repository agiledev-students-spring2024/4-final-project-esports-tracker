
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    roles: {
        User: {
            type: Number,
            default: 1
        },
    },
    password: {
        type: String,
        required: true
    },
    email:{
        type: String,
        default: 'temp@email.com'
    },
    pfp: {
        type: String,
        default: 'https://picsum.photos/id/237/200/300'
    },
    bio:{
        type: String,
        default: ' '
    },
    matchedUsers: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
    preferences: {
        pet: {
            type: String,
            default: 'all'
        },
        // Add more preferences as needed (e.g., gender preferences, interests, etc.)
    },

    refreshToken: String // not sure if neccesary
});

module.exports = mongoose.model('user', userSchema);
