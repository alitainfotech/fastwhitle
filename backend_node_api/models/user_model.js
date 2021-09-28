const mongoose = require('mongoose');
const conn = require('../connection/mongoose_mongodb');

var UserSchema = new mongoose.Schema({
    fullname: {
        type: String,
        max: 100,
        required: true
    },
    email: {
        type: String,
        max: 100,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
},{timestamps: true});

const user = conn.model('user', UserSchema);

module.exports = user;