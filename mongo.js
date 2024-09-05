const mongoose=require("mongoose");
const newSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    message:{
        type:String
    }
}, { timestamps: true });
const UserModel=mongoose.model("persondetails",newSchema)
module.exports=UserModel