const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    name: {type:String,required:true},
    email: {type:String,required:true,unique:true},
    phone: String,
    password: {type:String,required:true},
    role: {type:String,required:true},

 });

const Users = mongoose.model("User", userSchema);

module.exports=Users;