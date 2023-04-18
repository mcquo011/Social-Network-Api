const User = require('../models/User');

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find({});
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  createUser: async (req, res) => {
    try {
      const newUser = await User.create(req.body);
      res.json(newUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  updateUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const updateUser = await User.findByIdAndUpdate(
        req.params.userId,
        req.body,
        {
          new: true,
        }
      );

      res.json(updateUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  deleteUser: async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.userId);

      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({ message: "User deleted" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  addFriend: async (req, res) => {
    try {
      const currentUser = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );

      if (!currentUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({ message: "Friend added" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  removeFriend: async (req, res) => {
    try {
      const currentUser = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );

      if (!currentUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({ message: "Friend removed" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = userController;