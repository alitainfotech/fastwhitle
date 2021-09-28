const mongoose = require('mongoose');

const conn = mongoose.createConnection('mongodb://localhost:27017/fastwhistle',function (err) {
    if (err) throw err;

    console.log("mongodb is connected");
});

module.exports = conn;