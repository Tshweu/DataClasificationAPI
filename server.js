const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8080;
// api router ref
const api = require('./api');
// cors to allow access on different ports
app.use(cors());
//to allow our app to recieve json data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
  }));
//telling app to use it
// when api is specified in the route
app.use('/api',api);

app.get('/',(req,res)=>{
    res.send("Data catalog API");
})

// Find 404 and hand over to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

app.listen(PORT,() =>{
    console.log(`listening on ${process.env.PORT || 8080}`);
})