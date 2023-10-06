const mongoose=require('mongoose');



const distressCallsSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    contactNumber:{
        type:Number,
        required:true
    },
    longitude:{
        type:Number,
        required:true
    },
    latitude:{
        type:Number,
        required:true
    },
    typeOfDisaster:{
        type:String,
        required:true
    },
   requestDate: {
        type: Date,
        default: Date.now, // This will set the current date and time when the document is created
        unique:true
      }



});

module.exports= mongoose.model('distressCall',distressCallsSchema);