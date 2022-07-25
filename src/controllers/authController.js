const generate = require("../helpers/generate");
const verify = require("../helpers/verify");
const User = require("../models/user");

module.exports.loginController = async (req, res) => {
  try {
    const data = await User.findOne({ email: req.body.email });

    if (!data && req.body.provider) {
      const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        googleId: req.body.googleId,
        role: req.body.role,
      });

      await user.save();

      const token = await generate.jwt({ id: user._id, role: user.role });

      return res
        .status(200)
        .send({ token, message: "User created an account with google" });
    }

    if (data && !data.googleId && req.body.provider) {
      await User.findByIdAndUpdate(data._id, { googleId: req.body.googleId });

      const token = await generate.jwt({ id: data._id, role: data.role });

      return res
        .status(200)
        .send({ token, message: "Added google id to existing user" });
    }

    if (data && data.googleId && req.body.provider) {
      const user = await User.findOne({ googleId: req.body.googleId });

      if (!user)
        return res.status(400).send({ error: "Google id does not exist" });

      const token = await generate.jwt({ id: user._id, role: user.role });

      return res
        .status(200)
        .send({ token, message: "User logged in with google id" });
    }

    if (data && data.googleId && !req.body.provider && !data.password) {
      return res
        .status(400)
        .send({ error: "Email is already associated with an account" });
    }

    if (!req.body.provider) {
      const isPasswordValid = await verify.hash(
        req.body.password,
        data.password
      );

      if (!isPasswordValid)
        return res.status(400).send({ error: "Invalid Credentials" });

      const token = await generate.jwt({ id: data._id, role: data.role });

      return res
        .status(200)
        .send({ token, message: "User logged in with email and password" });
    }
  } catch (error) {
    return res.status(400).send({ error: "User does not exist" });
  }
};

module.exports.registerController = async (req, res) => {
  let { email, password, firstName, lastName, role } = req.body;
  const isEmailExist = await User.findOne({ email });

  if (isEmailExist)
    return res.status(400).send({ error: "User already exist" });

  password = await generate.hash(password);

  const user = new User({
    firstName,
    lastName,
    email,
    password,
    ...(role && { role }),
  });

  await user.save();

  return res.status(201).send({ message: "User created" });
};
