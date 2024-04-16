
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {ObjectId} = Schema.Types

const postSchema = new Schema({
    caption: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: "none"
        
    },
    dateCreated:{
        type: Date,
        default: Date.now // Automatically set to the current date and time when a new post is created
    },
    postedBy: {
        type: ObjectId,
        required: true,
        ref:'user'
    },
    likeCount: {
        type: Number,
        default: 0,
    },
    comments: [{
        text: {
            type: String,
            required: true
        },
        author: {
            type: ObjectId,
            ref: 'user'
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }]

});

module.exports = mongoose.model('post', postSchema);
