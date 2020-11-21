const express = require('express');
const router = express.Router();
//const mongoose  = require('mongoose');
const User = require('../models/user');
const MetaData = require('../models/data');

router.post('/',(req,res)=>{
    let meta = new MetaData(req.body);
    User.findById({id:meta.user_id},(err,user)=>{
        meta.save((err,savedData)=>{
            if(err){
                console.error("ERROR, Failed to save metadata : ",err);
                res.send({
                    success: false
                  });
            }else{
                res.status(200).send(savedData);
                console.log("saved metaData");
            }
        })
    })
    
})

module.exports = router;