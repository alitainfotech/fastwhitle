const Joi = require('joi');
var jvf = require('../utilities/joi_validation_format');
var jwt_token_decode = require('../utilities/jwt_token_decode');
var post_model = require('../models/post_model');

var schema_options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true // remove unknown props
};

class post_controller {
    constructor() {
    }

    get_all_posts(req,res){
        const user = jwt_token_decode(req);
        post_model.find({
            created_by : user.id
        }).then(posts=>{
            res.status(200).json({
                message:'get all posts successfully',
                success:true,
                data:{
                    posts
                }
            });
        }).catch(err=>{
            console.log(err);
        });
    }

    get_single_post(req,res){
        const schema = Joi.object({
            params: Joi.object({
                id: Joi.string().required(),
            })
        });

        const { error, value } = schema.validate(req.body, schema_options);

        if (!error) {
            const user = jwt_token_decode(req);
            post_model.find({
                _id : req.params.id,
                created_by : user.id
            }).then(post=>{
                if(Object.keys(post).length > 0){
                    res.status(200).json({
                        message:'get single post successfully',
                        success:true,
                        data:{
                            post
                        }
                    });
                } else {
                    res.status(200).json({
                        message:'sorry post record is not found!',
                        success:true,
                        data:{}
                    });
                }
            }).catch(err=>{
                console.log(err);
            });
        }
    }

    get_active_inactive_post_count(req,res){
        post_model.aggregate().group({
            _id: { status:'$status'},
            total: { "$sum": 1 }
        }).then(posts=>{
            res.status(200).json({
                message:'get all posts successfully',
                success:true,
                data:{
                    posts
                }
            });
        }).catch(err=>{
            console.log(err);
        });
    }

    store_single_post(req,res){
        const schema = Joi.object({
            title: Joi.string().min(1).max(100).required(),
            body: Joi.string().min(1).max(200).required(),
            status: Joi.number().max(1).required()
        });

        const { error, value } = schema.validate(req.body, schema_options);

        if (!error) {
            const user = jwt_token_decode(req);
            post_model.create({
                title: req.body.title,
                body: req.body.body,
                status: req.body.status,
                created_by: user.id
            }).then(post => {
                res.status(200).json({
                    message:'new post is created successfully',
                    success:true,
                    data:{
                        post
                    }
                });
            }).catch(err =>{
                res.status(400).json({
                    message:'something wrong post is not created',
                    success:false,
                    data:{}
                });
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

    update_single_post(req,res){
        const schema = Joi.object({
            params: Joi.object({
                id: Joi.string().required(),
            }),
            title: Joi.string().min(1).max(100).required(),
            body: Joi.string().min(1).max(200).required(),
            status: Joi.number().max(1).required()
        });

        const { error, value } = schema.validate(req.body, schema_options);

        if (!error) {
            const user = jwt_token_decode(req);

            post_model.findOne({ user: user.id, _id: req.params.id }).then(post => {
                if(post){
                    post_model.updateOne({
                        _id: req.params.id
                    },{
                        title: req.body.title,
                        body: req.body.body,
                        status: req.body.status
                    }).then(post => {
                        res.status(200).json({
                            message:'post is updated successfully',
                            success:true,
                            data:{
                                post
                            }
                        });
                    }).catch(err =>{
                        res.status(400).json({
                            message:'something wrong post is not updated',
                            success:false,
                            data:{}
                        });
                    });
                } else{
                    res.status(400).json({
                        message:'sorry post is not found',
                        success:false,
                        data:{}
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

    delete_post(req,res){
        const schema = Joi.object({
            params: Joi.object({
                id: Joi.string().required(),
            })
        });

        const { error, value } = schema.validate(req.body, schema_options);

        if (!error) {
            post_model.deleteOne({
                _id: req.params.id
            }).then(post => {
                res.status(200).json({
                    message:'post is deleted successfully',
                    success:true,
                    data:{
                        post
                    }
                });
            }).catch(err =>{
                res.status(400).json({
                    message:'something wrong post is not deleted',
                    success:false,
                    data:{}
                });
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


module.exports = new post_controller();