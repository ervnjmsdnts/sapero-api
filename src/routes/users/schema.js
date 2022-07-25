const { object, string, number } = require("yup");

module.exports.updateUserRoleSchema = object({
  id: string().required(),
  role: string().oneOf(["admin", "user"]),
});

module.exports.addBalanceSchema = object({
  balance: number().required(),
});
