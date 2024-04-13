
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
    refreshToken: String // not sure if neccesary
});

module.exports = mongoose.model('user', userSchema);
