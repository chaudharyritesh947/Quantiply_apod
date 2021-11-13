const mongoose = require('mongoose');

const ApodSchema = new mongoose.Schema({
	copyright : {type: String},
    date : {type: String},
    explanation : {type: String},
    hdurl : {type: String},
    media_type : {type: String},
    service_version : {type: String},
    title : {type: String},
    url : {type: String}
})

const model = mongoose.model('ApodModel', ApodSchema)
module.exports = model;
