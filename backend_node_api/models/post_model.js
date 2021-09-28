const mongoose = require('mongoose');
const conn = require('../connection/mongoose_mongodb');

var PostSchema = new mongoose.Schema({
    title: {
        type: String,
        max: 100,
        required: true
    },
    body: {
        type: String,
        max: 200,
        required: true
    },
    created_by: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        required: true,
        max: 1,
        default: 0
    }
},{timestamps: true});

const post = conn.model('post', PostSchema);

module.exports = post;