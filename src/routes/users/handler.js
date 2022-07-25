const { Router } = require("express");
const {
  getAllUsers,
  getCurrentUser,
  updateUserRole,
} = require("../../controllers/userController");
const { authorizer } = require("../../middlewares/authorizer");
const { validate } = require("../../middlewares/validateRequest");
const { updateUserRoleSchema } = require("./schema");

const router = Router();

router.get("/", authorizer, getAllUsers);
router.get("/current", authorizer, getCurrentUser);
router.patch(
  "/update/role",
  [authorizer, validate(updateUserRoleSchema)],
  updateUserRole
);

module.exports = router;
