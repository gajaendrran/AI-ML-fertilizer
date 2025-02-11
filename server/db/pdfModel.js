const mongoose = require('mongoose');

const pdfSchema = new mongoose.Schema(
    {
        userId:{type:String,required:true},
        pdfData:{type:Buffer,required:true},
        shortContent :{type:String,required:true},
        createdAt:{type:Date,default:Date.now}
    } 
)
const pdfModel = mongoose.model('pdfModel',pdfSchema);

module.exports = pdfModel;