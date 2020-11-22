const express = require('express');
const router = express.Router();
const multer = require('multer');
const readExcel = require('../controllers/readExcelFile');

// File upload settings  
const PATH = './uploads';
var fileName = '';

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, PATH);
  },
  filename: (req, file, cb) => {
    fileName = file.fieldname + '-' + Date.now();
    cb(null,fileName)
  }
});

let upload = multer({
  storage: storage
});

router.get('/', function (req, res) {
  res.end('File catcher');
});

// POST File
router.post('/excel',upload.single('file'),function (req, res) {
    console.log(fileName);
  if (!req.file) {
    console.log("No file is available!");
    return res.send({
      success: false
    });

  } else {
    console.log('File is available!');

    let sheets_and_filename = {
      sheets: [],
      filename: String
    }

    sheets_and_filename.sheets = readExcel.getSheetList(`./uploads/`+fileName);
    sheets_and_filename.filename = fileName;
    return res.json(sheets_and_filename);
  }
});

//Post Textfile

//post word
router.post('/excel',upload.single('file'),function (req, res) {
    console.log(fileName);
  if (!req.file) {
    console.log("No file is available!");
    return res.send({
      success: false
    });

  } else {
    console.log('File is available!');

    let sheets_and_filename = {
      sheets: [],
      filename: String
    }

    sheets_and_filename.sheets = readExcel.getSheetList(`./uploads/`+fileName);
    sheets_and_filename.filename = fileName;
    return res.json(sheets_and_filename);
  }
});
module.exports = router;