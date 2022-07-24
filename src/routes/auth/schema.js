const { object, string, ref } = require("yup");

module.exports.loginSchema = object({
  email: string().email("Enter a valid email").required(),
  password: string().required(),
});

module.exports.registerSchema = object({
  firstName: string().required(),
  lastName: string().required(),
  email: string().email("Enter a valid email").required(),
  password: string().required(),
  confirmPassword: string()
    .oneOf([ref("password"), null], "Passwords must match")
    .required(),
});
