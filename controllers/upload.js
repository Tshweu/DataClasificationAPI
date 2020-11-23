const express = require('express');
const router = express.Router();
const multer = require('multer');
const readExcel = require('../controllers/readExcelFile');
const classify = require('./classify');
const fs = require('fs');

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

// POST Excel File
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
//recieves sheet and filename 
//reads data from the specified sheet
router.post('/excelSheet',(req,res)=>{
  let filename = req.body.filename;
  let sheet = req.body.sheet;
  res.json(classify.ExcelClassification(readExcel.readFileData(sheet)));
})

//Post Textfile
router.post('/txt',upload.single('file'),function (req, res) {
  console.log(fileName);
  if (!req.file) {
    console.log("No file is available!");
    return res.send({
      success: false
    });

  } else {
    console.log('File is available!');
    fs.readFile(`./uploads/`+fileName, (error, data) => {
      if(error) {
          throw error;
      }
      let data_json = data.toString();
      res.json(classify.textClassification(data_json));
      //console.log(data.toString());
    });
  }
});

//post csv
router.post('/word',upload.single('file'),function (req, res) {
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