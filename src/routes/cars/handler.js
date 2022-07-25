const { Router } = require("express");
const {
  getAllCars,
  createCar,
  updateCar,
  deleteCar,
  addImage,
  getCarById,
  rentCar,
  reserveCar,
  getRentedCars,
  getReservedCars,
} = require("../../controllers/carController");
const { authorizer } = require("../../middlewares/authorizer");
const { validate } = require("../../middlewares/validateRequest");
const {
  createCarSchema,
  updateCarSchema,
  deleteCarSchema,
  imageCarSchema,
  rentCarSchema,
  reserveCarSchema,
} = require("./schema");

const router = Router();

router.get("/", getAllCars);
router.get("/:id", authorizer, getCarById);
router.post("/create", [authorizer, validate(createCarSchema)], createCar);
router.put("/update", [authorizer, validate(updateCarSchema)], updateCar);
router.post("/delete", [authorizer, validate(deleteCarSchema)], deleteCar);
router.patch("/image", [authorizer, validate(imageCarSchema)], addImage);
router.post("/rent", [authorizer, validate(rentCarSchema)], rentCar);
router.post("/reserve", [authorizer, validate(reserveCarSchema)], reserveCar);
router.get("/me/rented", authorizer, getRentedCars);
router.get("/me/reserved", authorizer, getReservedCars);

module.exports = router;
