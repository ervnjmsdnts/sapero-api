const Car = require("../models/car");
const { cloudinary } = require("../helpers/cloudinary");
const Rented = require("../models/rented");
const Reserved = require("../models/reserved");
const User = require("../models/user");

module.exports.getAllCars = async (_req, res) => {
  const cars = await Car.find();
  return res.json(cars);
};

module.exports.getCarById = async (req, res) => {
  const car = await Car.findById(req.params.id);
  return res.json(car);
};

module.exports.createCar = async (req, res) => {
  if (req.userRole !== "admin") {
    return res.status(401).send({ error: "Unauthorized" });
  }

  const car = new Car({ ...req.body });

  await car.save();

  return res.status(201).send({ message: "Car created" });
};

module.exports.updateCar = async (req, res) => {
  if (req.userRole !== "admin") {
    return res.status(401).send({ error: "Unauthorized" });
  }

  const car = await Car.findByIdAndUpdate(req.body.id, { ...req.body });

  if (!car) {
    return res.status(404).send({ error: "Car not found" });
  }

  await car.save();

  if (car.status === "rented" && req.body.status === "available") {
    const rented = await Rented.findOne({ car: car._id });

    if (!rented) {
      return res.status(404).send({ error: "Rented not found" });
    }

    rented.status = "finished";

    await rented.save();
  }

  if (car.status === "reserved" && req.body.status === "available") {
    const reserved = await Reserved.findOne({ car: car._id });

    if (!reserved) {
      return res.status(404).send({ error: "Reserved not found" });
    }

    reserved.status = "finished";

    await reserved.save();
  }

  return res.status(200).send({ message: "Car updated" });
};

module.exports.deleteCar = async (req, res) => {
  if (req.userRole !== "admin") {
    return res.status(401).send({ error: "Unauthorized" });
  }

  console.log(req.body);

  const car = await Car.findByIdAndDelete(req.body.id);

  if (!car) {
    return res.status(404).send({ error: "Car not found" });
  }

  return res.status(200).send({ message: "Car deleted" });
};

module.exports.addImage = async (req, res) => {
  try {
    if (req.userRole !== "admin") {
      return res.status(401).send({ error: "Unauthorized" });
    }

    const car = await Car.findById(req.body.id);

    if (!car) {
      return res.status(404).send({ error: "Car not found" });
    }

    const image = await cloudinary.uploader.upload(req.body.image);

    car.image = image.url;

    await car.save();

    return res.status(200).send({ message: "Image added" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Error uploading image" });
  }
};

module.exports.rentCar = async (req, res) => {
  const car = await Car.findById(req.body.car);

  if (!car) {
    return res.status(404).send({ error: "Car not found" });
  }

  car.status = "rented";

  await car.save();

  const rent = new Rented({
    car: car._id,
    user: req.userId,
    pickUpDate: req.body.pickUpDate,
    endDate: req.body.endDate,
    totalPrice: req.body.totalPrice,
  });

  await rent.save();

  const user = await User.findById(req.userId);

  if (!user) {
    return res.status(404).send({ error: "User not found" });
  }

  user.balance -= req.body.totalPrice;

  await user.save();

  return res.status(200).send({ message: "Car rented" });
};

module.exports.reserveCar = async (req, res) => {
  const car = await Car.findById(req.body.car);

  if (!car) {
    return res.status(404).send({ error: "Car not found" });
  }

  car.status = "reserved";

  await car.save();

  const reserve = new Reserved({
    car: car._id,
    user: req.userId,
    dateOfReservation: req.body.dateOfReservation,
    totalPrice: req.body.totalPrice,
  });

  await reserve.save();

  const user = await User.findById(req.userId);

  if (!user) {
    return res.status(404).send({ error: "User not found" });
  }

  user.balance -= req.body.totalPrice;

  await user.save();

  return res.status(200).send({ message: "Car reserved" });
};

module.exports.getRentedCars = async (req, res) => {
  const cars = await Rented.find({ user: req.userId }).populate("car");

  if (!cars) {
    return res.status(404).send({ error: "Cars not found" });
  }

  return res.json(cars);
};

module.exports.getReservedCars = async (req, res) => {
  const cars = await Reserved.find({ user: req.userId }).populate("car");

  if (!cars) {
    return res.status(404).send({ error: "Cars not found" });
  }

  return res.json(cars);
};
