// This file will be used to route all the requests 
const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.send('API router');
})

module.exports = router;