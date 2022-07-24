const { Router } = require("express");
const { getAllCars } = require("../../controllers/carController");

const router = Router();

// get all
router.get("/", getAllCars);
// get one
// create
// update
// delete
// add or change image of car
// rent a car
// reserve a car
// return a car
// get all rented
// get all reserved
// get all available

module.exports = router;
