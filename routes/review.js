const express = require("express");
const mongoose = require("mongoose");
const Reviews = require("../models/review");
const {
  getReviews,
  getReview,
  deleteReview
}=require("../controllers/review");
const router = express.Router();

router.get("/", getReviews);
router.get("/:id",getReview );
router.delete("/:id",deleteReview);

module.exports = router;
