// web token dependency
const jwt = require('jsonwebtoken');

function verifyToken(req,res,next){
    //check if authorization exists
    if(!req.headers.authorization){
        console.log(body);
        return res.status(401).send('Unauthorized request');
    }else{
        //split where there is a space and take token
        //@ index 1
        let token = req.headers.authorization.split(' ')[1]; 
        //check if token is null
        if(token === 'null'){
            return res.status(401).send('Unauthorized request');
        } else{
            let payload = jwt.verify(token, 'keyAuth');
            //checks if valid token
            if(!payload){
                return res.status(401).send('Unauthorized request');
            }
            req.userId = payload.subject;
            next();
        }
    }
}

module.exports = {verifyToken};