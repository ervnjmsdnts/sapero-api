const { Router } = require("express");
const {
  getAllUsers,
  getCurrentUser,
  updateUserRole,
  addBalance,
} = require("../../controllers/userController");
const { authorizer } = require("../../middlewares/authorizer");
const { validate } = require("../../middlewares/validateRequest");
const { updateUserRoleSchema, addBalanceSchema } = require("./schema");

const router = Router();

router.get("/", authorizer, getAllUsers);
router.get("/current", authorizer, getCurrentUser);
router.patch(
  "/update/role",
  [authorizer, validate(updateUserRoleSchema)],
  updateUserRole
);
router.post(
  "/add/balance",
  [authorizer, validate(addBalanceSchema)],
  addBalance
);

module.exports = router;
