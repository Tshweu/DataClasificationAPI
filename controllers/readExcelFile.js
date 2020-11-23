const xlsx = require('xlsx');

var sheetList,WorkBook = null;

var getSheetList = (fileName)=>{
    //Read file based on file name
    WorkBook = xlsx.readFile(fileName,{
        cellDates: true
    });
    sheetList = WorkBook.SheetNames;  
    return sheetList
}
//console.log(getSheetList('./uploads/test.xlsx'));
var readFileData = (sheet)=>{
//from work book to work sheets
    if(!WorkBook) {console.log('empty workbook')}
    let WorkSheets = WorkBook.Sheets[sheet];
    let sheetToJson = xlsx.utils.sheet_to_json(WorkSheets);
    console.log(sheetToJson);
    return sheetToJson;
}

//console.log(readFileData(Sheet1'))
module.exports = {readFileData,getSheetList};
