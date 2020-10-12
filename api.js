// This file will be used to route all the requests 
const express = require('express');
const  mongoose  = require('mongoose');
const router = express.Router();

const uri = "mongodb+srv://user1:Y6RHjust7IUxw1oE@metadata.s6ori.mongodb.net/DataClassification?retryWrites=true&w=majority";

mongoose.connect(uri,{ useNewUrlParser: true } ,(err)=>{
    if(err){
        console.error("Database connection error : ",err);
    }else{
        console.log("connected to database");
    }
})

router.get('/',(req,res)=>{
    res.send('API router');
})

module.exports = router;