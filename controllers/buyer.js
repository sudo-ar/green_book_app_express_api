
const mongoose = require("mongoose");
const Buyers = require("../models/buyer");

let  getBuyers= async (req, res) => {
  try {
    const buyers = await Buyers.find({});
    res.status(200).json({ data: buyers });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

let createBuyer = async (req, res) => {
  try {
    const buyerData = req.body;
    const buyer = new Buyers(buyerData);
    await buyer.save();
    console.log(buyer);
    res.status(200).json({ data: buyer });
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

let getBuyer=async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(500).json({ message: "Invalid id" });
    }
    const buyer = await Buyers.findOne({ _id: id });

    if (!buyer) {
      return res.status(404).json({ message: "buyer not found" });
    }
    res.status(200).json({ data: buyer });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

let deleteBuyer=async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      res.status(500).json({ message: "Invalid id" });
    }

    const buyer = await Buyers.findByIdAndDelete({ _id: id });
    if (!buyer) {
      return res.status(404).json({ message: "the object is not exist" });
    }
    res.status(200).json({ message: "buyer is deleted", data: buyer });
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

let updateBuyer=async (req, res) => {
  const id = req.params.id;
  if (!mongoose.isValidObjectId) {
    res.json({ message: "the object id is not valid" });
  }
  const buyerUpdate = req.body;

  const buyer = await Buyers.findByIdAndUpdate({ _id: id }, buyerUpdate);

  res.status(200).json({ message: "Buyer infos updated", data: buyer });
}

module.exports = {
  getBuyers,
  createBuyer,
  getBuyer,
  deleteBuyer,
  updateBuyer
};
