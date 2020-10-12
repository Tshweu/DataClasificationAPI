const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;
// api router ref
const api = require('./api');

//to allow our app to recieve json data
app.use(bodyParser.json());
//telling app to use it
// when api is specified in the route
app.use('/api',api);



app.get('/',(req,res)=>{
    res.send("Data catalog API");
})

app.listen(PORT,() =>{
    console.log(`listening on ${process.env.PORT || 3000}`);
})