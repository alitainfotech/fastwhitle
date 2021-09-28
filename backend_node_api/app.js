/* modules */
var http = require('http');
var express = require("express");
var cors = require('cors')
var bodyParser = require("body-parser");
const dotenv = require('dotenv');
dotenv.config();

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


/* routes start */

var authRouter = require('./routes/auth');
app.use('/auth',authRouter);

var postRouter = require('./routes/post');
app.use('/post',postRouter);


/* routes end */




/* server setup */
const hostname = process.env.NODE_API_URL || 'localhost';
const port = process.env.NODE_API_PORT || '3000';

const httpServer = http.createServer(app);
httpServer.listen(port, hostname, () => {
    console.log(`server running at http://${hostname}:${port}`);
});