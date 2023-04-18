const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const Thought = require("../../models/Thought");

// GET all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving users" });
  }
});


module.exports = router;