const express = require('express');
const router = express.Router();
const multer = require('multer');

// File upload settings  
const PATH = './uploads';

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, PATH);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now())
  }
});

let upload = multer({
  storage: storage
});


router.get('/', function (req, res) {
  res.end('File catcher');
});

// POST File
router.post('/',upload.single('file'),function (req, res) {
    
  if (!req.file) {
    console.log("No file is available!");
    return res.send({
      success: false
    });

  } else {
    console.log('File is available!');
    return res.send({
      success: true
    })
  }
});

module.exports = router;