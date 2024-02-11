const mongoose = require("mongoose");
const Reviews = require("../models/review");

let getReviews = async (req, res) => {
  try {
    const reviews = await Reviews.find({});
    res.status(200).json({ data: reviews });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

let getReview=async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(500).json({ message: "Invalid id" });
    }
    const review = await Reviews.findOne({ _id: id });

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.status(200).json({ data: review });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

let deleteReview=async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      res.status(500).json({ message: "Invalid id" });
    }

    const reveiw = await Reviews.findByIdAndDelete({ _id: id });
    if (!reveiw) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.status(200).json({ message: "reveiw is deleted", data: reveiw });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getReviews,
  getReview,
  deleteReview
};
