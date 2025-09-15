const mongoose = require("mongoose");
const { modelName } = require("./candidateModel");

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    role:{
        type:String,
        enum:["Admin","Employee","Customer"],
        default:"Customer"
    },
    email:{
         type:String,
         require:true,
         unique: true,
    },
   isEmailConfirmed: {
         type: Boolean,
         default: false,
    },
   phone:{
         type:Number,
         required:true,
    },
   confirmationToken: {
         type: String
   },
    confirmed:{
         type:Boolean,
         default:false
   },
    notificationPermission:{
         type:Boolean,
         default:false
    },
    password:{
         type:String,
         require:true
   },

},{timestamps:true});

module.exports=mongoose.model("User",userSchema);