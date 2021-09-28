var jwt = require('jsonwebtoken');
var jwtKey = process.env.JWT_SECRET;

module.exports = function(req,res,next){
    const authorizationHeaader = req.headers.authorization;
    if(authorizationHeaader){
        const token = req.headers.authorization.split(' ')[1];
        try{
            let result = jwt.verify(token, jwtKey);
            if(result){
                next();
            } else {
                res.status(401).json({
                    message: 'Unauthorize Token.',
                    success: false,
                    data:{}
                });
            }
        } catch(err){
            res.status(401).json({
                message: 'Token is expired.',
                success: false,
                data:{}
            });
        }
    } else {
        res.status(401).json({
            message: 'Authentication error. Token required.',
            success: false,
            data:{}
        });
    }
}