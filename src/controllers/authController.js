module.exports.loginController = async (req, res) => {
  const { email, password } = req.body;
  res.send({ message: `Welcome ${email}` });
};

module.exports.registerController = async (req, res) => {
  res.json({ message: "Register Now Mister" });
};
