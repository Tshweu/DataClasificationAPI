// This file will be used to route all the requests 
const express = require('express');
const mongoose  = require('mongoose');
const User = require('./models/user');
const router = express.Router();
// web token dependency
const jwt = require('jsonwebtoken');

const uri = "mongodb+srv://user1:Y6RHjust7IUxw1oE@metadata.s6ori.mongodb.net/DataClassification?retryWrites=true&w=majority";

const options = {
    useNewUrlParser: true ,
    useUnifiedTopology: true// Keep trying to send operations for 5 seconds 
}

mongoose.connect(uri, options ,(err)=>{
    if(err){
        console.error("Database connection error : ",err);
    }else{
        console.log("connected to database");
    }
})

function verifyToken(req,res,next){
    //check if authorization exists
    if(!req.body.authorization){
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
// router.get('/',verifyToken,(req,res)){
//     ...add code
// }

router.get('/',(req,res)=>{
    res.send('API router');
})

router.post('/register',(req,res)=>{
    let userData = req.body;
    let user = new User(userData);
    user.save((err,registeredUser)=>{
        if(err){
            console.error("ERROR, Failed to save user : ",err);
        }else{
            //create payload with id generated by mongodb
            let payload = {subject: registeredUser._id};
            //generate token with secret key
            let token = jwt.sign(payload, 'keyAuth');
            //send token as object
            res.status(200).send({token});
        }
    })
})

router.post('/login',(req,res)=>{
    let userData = req.body;
    User.findOne({email: userData.email}, (err,user)=>{
        //check if theres a error
        if(err){
            console.error("User login err :",err);
        } else{
            //if no error check if user exists
            if(!user){
                res.status(401).send('Invalid Email')
            }else{
                // checks if password matches
                if(user.password != userData.password){
                    res.status(401).send("Invalid Password");
                }else{ 
                    //set payload in token to user id generated by mongodb
                    let payload = { subject: user._id };
                    //generate token and set secret key
                    let token = jwt.sign(payload, 'keyAuth');
                    //send token as object
                    res.status(200).send({token});
                }
            }
        }
    })
})

module.exports = router;