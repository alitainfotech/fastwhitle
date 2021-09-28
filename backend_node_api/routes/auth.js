var express = require('express');
var router = express.Router();

const bcrypt = require('bcrypt');
const saltRounds = 10;

var jwt = require('jsonwebtoken');
var jwtKey = process.env.JWT_SECRET;
var expiresTime = "1d";


/* auth controller */
var controller = require('../controllers/auth_controller');


router.post('/login',(req,res)=>{ controller.login_process(req,res) });

router.post('/register',(req,res)=>{ controller.registration_process(req,res) });


/* export router */
module.exports = router;