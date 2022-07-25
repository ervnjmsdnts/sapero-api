const { Router } = require("express");
const {
  getAllCars,
  createCar,
  updateCar,
  deleteCar,
  addImage,
} = require("../../controllers/carController");
const { authorizer } = require("../../middlewares/authorizer");
const { validate } = require("../../middlewares/validateRequest");
const {
  createCarSchema,
  updateCarSchema,
  deleteCarSchema,
  imageCarSchema,
} = require("./schema");

const router = Router();

router.get("/", authorizer, getAllCars);
router.post("/create", [authorizer, validate(createCarSchema)], createCar);
router.put("/update", [authorizer, validate(updateCarSchema)], updateCar);
router.post("/delete", [authorizer, validate(deleteCarSchema)], deleteCar);
router.patch("/image", [authorizer, validate(imageCarSchema)], addImage);
// rent a car
// reserve a car
// return a car
// get all rented
// get all reserved
// get all available

module.exports = router;
