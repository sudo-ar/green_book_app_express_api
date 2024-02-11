const mongoose = require("mongoose");
const Users = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

let getUsers = async (req, res) => {
  try {
    let id=req.body.id;
    const user = await Users.findOne({_id:id});
    if (user) {
      if (user.role === 'admin') {
        const users = await Users.find({});
       return  res.status(200).json({ data: users });
      }else {
        console.log(user);
        return res.status(403).json({ message: "Forbidden i.e. you don't have access to this resource" });
      }
    }
    return res.status(404).json({ message: "user not found" });
 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

let getUser = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(500).json({ message: "Invalid id" });
    }
    const user = await Users.findOne({ _id: id });

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    res.status(200).json({ data: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

let userSingin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ message: "user does not exist against this email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "1day", audience: "web_app" },
        (err, token) => {
          if (err) {
            return res.status(500).json({ message: err.message });
          }

          return res.status(200).json({
            message: "signin success",
            user: { name: user.name, email: user.email, token: token },
          });
        }
      );
    } else {
      return res.status(200).json({ message: "Invalid password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

let createUser = async (req, res) => {
  try {
    const { email, name, password,role } = req.body;

    const user = await Users.findOne({ email });

    if (user) {
      return res
        .status(200)
        .json({ message: "user exist against this email" });
    }

    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }

      const user = new Users({ email, password: hash, name,role });
     let respone= await user.save();
      if (respone) {
        return res.status(201).json({
          message: "user created",
          user: { _id: user._id, name: user.name, email: user.email },
        });
      }else {
        return res.status(500).json({ message: "user not created"  });
      }
      
    });
  } catch (error) {
   return res.status(500).json({ message: error });
  }
};

let deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      res.status(500).json({ message: "Invalid id" });
    }

    const user = await Users.findByIdAndDelete({ _id: id });
    if (!user) {
      return res.status(404).json({ message: "user does not exist" });
    }
    res.status(200).json({ message: "user is deleted", data: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

let updateUser = async (req, res) => {
  try {
      let id = req.body.id;
      const userUpdate = req.body;
      const user = await Users.findByIdAndUpdate({ _id: id }, userUpdate);
      res.status(200).json({ message: "user info is updated", data: user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
  userSingin,
};
