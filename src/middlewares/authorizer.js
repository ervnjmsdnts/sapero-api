const verify = require("../helpers/verify");

module.exports.authorizer = async (req, res, next) => {
  const bearerToken = req.headers["authorization"];

  if (!bearerToken) return res.status(401).send({ error: "Unauthorized" });

  const token = bearerToken.split(" ")[1];

  if (!token) return res.status(401).send({ error: "Unauthorized" });

  const isTokenValid = await verify.jwt(token);

  if (!isTokenValid) return res.status(401).send({ error: "Unauthorized" });

  req.userId = isTokenValid.id;

  req.userRole = isTokenValid.role;

  next();
};
