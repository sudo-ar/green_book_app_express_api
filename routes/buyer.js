const express = require("express");
const {
  getBuyers,
  createBuyer,
  getBuyer,
  deleteBuyer,
  updateBuyer
}=require("../controllers/buyer");

const router = express.Router();


router.get("/",getBuyers);
router.post("/",createBuyer);
router.get("/:id",getBuyer );
router.delete("/:id",deleteBuyer );
router.put("/:id",updateBuyer );

module.exports = router;
