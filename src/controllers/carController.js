const Car = require("../models/car");
const { cloudinary } = require("../helpers/cloudinary");

module.exports.getAllCars = async (_req, res) => {
  const cars = await Car.find();
  return res.json(cars);
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
