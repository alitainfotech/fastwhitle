const Joi = require('joi');
var jvf = require('../utilities/joi_validation_format');
var user_model = require('../models/user_model');

const bcrypt = require('bcrypt');
const saltRounds = 10;

var jwt = require('jsonwebtoken');
var jwtKey = process.env.JWT_SECRET;
var expiresTime = "1d";

var schema_options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true // remove unknown props
};

class auth_controller {
    constructor() {
    }

    login_process(req,res){
        const schema = Joi.object({
            email: Joi.string().min(1).max(100).required(),
            password: Joi.string().min(8).max(30).required(),
        });

        const { error, value } = schema.validate(req.body, schema_options);

        if (!error) {

            user_model.findOne({
                email: req.body.email
            }).then(user=>{
                if(user){
                    var result = bcrypt.compareSync(req.body.password,user.password);
                    if(result){
                        jwt.sign({
                            id:user.id,
                            fullname:user.fullname,
                            email:user.email,
                        },jwtKey,{expiresIn:expiresTime},(err,token)=>{
                            res.status(200).json({
                                message:'user login successfully',
                                success:true,
                                data:{
                                    fullname: user.fullname,
                                    token:token
                                }
                            });
                        });
                    }
                }
            }).catch(err=>{
                res.status(400).json({
                    message:'user record is not found!',
                    success:false,
                    data:{}
                });
            })

        } else {
            res.status(400).json({
                message:'validation failed',
                success:false,
                data:{
                    errors: jvf.joi_validation_format(error)
                }
            });
        }
    }


    registration_process(req,res){
        const schema = Joi.object({
            fullname: Joi.string().min(1).max(100).required(),
            gender: Joi.number().max(1).required(),
            email: Joi.string().min(1).max(100).required(),
            password: Joi.string().min(8).max(30).required(),
            confirm_password: Joi.string().min(8).max(30).valid(Joi.ref('password')).required(),
        });

        const { error, value } = schema.validate(req.body, schema_options);

        if (!error) {

            user_model.findOne({ email: req.body.email }).then(user => {
                if(user){
                    res.status(400).json({
                        message:'user email is already exist!',
                        success:false,
                        data:{}
                    });
                } else {
                    user_model.create({
                        fullname: req.body.fullname,
                        gender: req.body.gender,
                        email: req.body.email,
                        password: bcrypt.hashSync(req.body.password, saltRounds)
                    }).then(user=>{
                        jwt.sign({
                            id:user._id,
                            fullname:user.fullname,
                            email:user.email,
                        },jwtKey,{expiresIn:expiresTime},(err,token)=>{
                            res.status(200).json({
                                message:'user register successfully',
                                success:true,
                                data:{
                                    token:token
                                }
                            });
                        });
                    }).catch(err=>{
                        console.log(err);
                        res.status(400).json({
                            message:'something wrong user is not register',
                            success:false,
                            data:{}
                        });
                    });
                }
            });
        } else {
            res.status(400).json({
                message:'validation failed',
                success:false,
                data:{
                    errors: jvf.joi_validation_format(error)
                }
            });
        }
    }
}


module.exports = new auth_controller();