const User = require("../models/user");

module.exports.getAllUsers = async (req, res) => {
  try {
    if (req.userRole !== "admin") {
      return res.status(401).send({ error: "Unauthorized" });
    }

    const users = await User.find();

    return res.json(users);
  } catch (error) {
    return res.status(500).send({ error: "Something went wrong" });
  }
};

module.exports.getCurrentUser = async (req, res) => {
  const user = await User.findById({ _id: req.userId });
  return res.json(user);
};

module.exports.updateUserRole = async (req, res) => {
  if (req.userRole !== "admin") {
    return res.status(401).send({ error: "Unauthorized" });
  }

  const user = await User.findByIdAndUpdate(req.body.id, {
    role: req.body.role,
  });

  if (!user) {
    return res.status(404).send({ error: "User not found" });
  }

  await user.save();

  return res.status(200).send({ message: "User updated" });
};

module.exports.addBalance = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.userId, {
    balance: req.body.balance,
  });

  if (!user) {
    return res.status(404).send({ error: "User not found" });
  }

  await user.save();

  return res.status(200).send({ message: "User updated" });
};
