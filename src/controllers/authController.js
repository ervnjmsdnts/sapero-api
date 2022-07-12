const generate = require("../helpers/generate");
const verify = require("../helpers/verify");
const User = require("../models/user");

module.exports.loginController = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.status(400).send({ error: "User not found" });

  const isPasswordValid = await verify.hash(password, user.password);

  if (!isPasswordValid)
    return res.status(400).send({ error: "Password is wrong" });

  const token = generate.jwt({ id: user._id });

  return res.status(200).send({ token, message: "Login success" });
};

module.exports.registerController = async (req, res) => {
  let { email, password } = req.body;
  const isEmailExist = await User.findOne({ email });

  if (isEmailExist)
    return res.status(400).send({ error: "Email already exist" });

  password = await generate.hash(password);

  const user = new User({
    email,
    password,
  });

  await user.save();

  return res.status(201).send({ message: "User created" });
};
