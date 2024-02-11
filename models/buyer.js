const mongoose = require("mongoose");

const buyerSchema = new mongoose.Schema({
    Name: {type:String,required:true},
    Email: String,
    Phone: String,
    date: Date,
    Address: String,
  });
  
  const Buyers = mongoose.model("Buyer", buyerSchema);

  module.exports = Buyers;