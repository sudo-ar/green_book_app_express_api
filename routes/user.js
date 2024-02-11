const express = require("express");
const router = express.Router();

const {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
  userSingin
}=require("../controllers/user");

const {checkAuth}=require("../middlewares/auth");

router.get("/",checkAuth, getUsers);
router.get("/:id", getUser);
router.post("/singup", createUser);
router.post("/signin", userSingin);

// router.delete("/:id", deleteUser);
router.put("/profile/",checkAuth ,updateUser);

module.exports = router;
