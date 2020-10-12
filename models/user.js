const mongoose = require('mongoose');
//mongoose is used to convert mongodb data to json
//this schema is the user object layout
const Schema = mongoose.Schema;
const userSchema = new Schema({
    email: String,
    password: String
})
//maps it to users collection
module.exports = mongoose.model('user',userSchema,'users');