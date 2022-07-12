const { Router } = require("express");
const {
  getAllUsers,
  getCurrentUser,
} = require("../../controllers/userController");
const { authorizer } = require("../../middlewares/authorizer");

const router = Router();

router.get("/", authorizer, getAllUsers);
router.get("/current", authorizer, getCurrentUser);

module.exports = router;
