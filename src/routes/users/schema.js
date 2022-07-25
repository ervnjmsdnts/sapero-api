const { object, string } = require("yup");

module.exports.updateUserRoleSchema = object({
  id: string().required(),
  role: string().oneOf(["admin", "user"]),
});
