const User = require("../models/user");

module.exports.getAllUsers = async (req, res) => {
  const users = await User.find();
  return res.json(users);
};

module.exports.getCurrentUser = async (req, res) => {
  const user = await User.findById({ _id: req.userId });
  return res.json(user);
};
