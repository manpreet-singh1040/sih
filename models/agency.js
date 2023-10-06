const mongoose=require('mongoose');


const userschema=new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber:{
        type:Number
    },
    email: {
        type: String,
        required: true,
        
    },
    password: {
        type: String,
        required: true
    },
    agencyName:{
        type: String,
        required: true
    },
    address:{
        type: String
    },
    latitude:{
        type: Number,
        required:true
    },
    longitude:{
        type: Number,
        required:true
    },

})
module.exports=mongoose.model('User',userschema);