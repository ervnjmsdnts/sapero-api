const { Router } = require("express");
const {
  loginController,
  registerController,
} = require("../../controllers/authController");
const { validate } = require("../../middlewares/validateRequest");
const { registerSchema } = require("./schema");

const router = Router();

router.post("/login", loginController);
router.post("/register", validate(registerSchema), registerController);

module.exports = router;
