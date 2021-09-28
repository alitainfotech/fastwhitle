var express = require('express');
var router = express.Router();

/* middlewares */
const checkUserAuthenticate = require('../middlewares/checkUserAuthenticate');

/* post controller */
var controller = require('../controllers/post_controller');


router.get('/',checkUserAuthenticate,(req,res)=>{ controller.get_all_posts(req,res) });

router.get('/show',checkUserAuthenticate,(req,res)=>{ controller.get_active_inactive_post_count(req,res) });

router.post('/',checkUserAuthenticate,(req,res)=>{ controller.store_single_post(req,res) });

router.put('/:id',checkUserAuthenticate,(req,res)=>{ controller.update_single_post(req,res) });

router.delete('/:id',checkUserAuthenticate,(req,res)=>{ controller.delete_post(req,res) });


/* export router */
module.exports = router;