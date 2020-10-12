const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

//to allow our app to recieve json 
app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.send("Data catalog API");
})

app.listen(PORT,() =>{
    console.log(`listening on ${process.env.PORT || 3000}`);
})