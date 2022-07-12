const { Router } = require("express");
const {
  loginController,
  registerController,
} = require("../../controllers/authController");
const { validate } = require("../../middlewares/validateRequest");
const { loginSchema, registerSchema } = require("./schema");

const router = Router();

router.post("/login", validate(loginSchema), loginController);
router.post("/register", validate(registerSchema), registerController);

module.exports.handler = router;
