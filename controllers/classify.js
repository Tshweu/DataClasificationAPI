const express = require('express');
const router = express.Router();

const basic_terms = ['Name','surname','fullname','lastname','firstname','middlename',
                        'Age','DOB','Date of birth','Date','ID','Identification',
                        'Address','Street']
var fields=[];
// [{field_name: String,classified: Boolean}];

var textClassification= (meta)=>{
   let Data = meta.split(/\r|:/);
   //let fields = [];
   let results = [];
   let regex = /base/;
   console.log(Data);
    //console.log(Data);
   for(var i = 0;i<Data.length;i=i+2){ 
       let classification = false;
        basic_terms.forEach(element => {
                //search all data for matching 
                //console.log(element);
                str1 = `${element}`
                var re = new RegExp(str1, "i");
                //regex = / {element} /i;
                if(Data[i].match(re)){
                    classification=true;
                }     
        })
        if(Data[i]!='')
        fields.push({field_name: `${Data[i]}`,classified:classification})
   }
  
   return fields;
   //console.log(Data); 
}

module.exports = {textClassification};