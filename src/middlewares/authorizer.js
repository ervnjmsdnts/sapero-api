const verify = require("../helpers/verify");

module.exports.authorizer = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).send({ error: "Token not found" });

  const decoded = await verify.jwt(token);

  if (!decoded) return res.status(401).send({ error: "Token is invalid" });

  req.user = decoded;

  next();
};
