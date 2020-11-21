const mongoose = require('mongoose');
//mongoose is used to convert mongodb data to json
//this schema is the user object layout
const Schema = mongoose.Schema;
const metaDataSchema = new Schema({
    user_id: String,
    file_type: String,
    file_name: String,
    file_location: String,
    fields:[{
        field_name: String,
        classified: Boolean
    }],
})
//maps it to users collection
module.exports = mongoose.model('data',metaDataSchema,'metaData');