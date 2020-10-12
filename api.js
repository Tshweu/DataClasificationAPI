// This file will be used to route all the requests 
const express = require('express');
const  mongoose  = require('mongoose');
const User = require('./models/user');
const router = express.Router();

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
            res.status(200).send(registeredUser);
        }
    })
})

module.exports = router;