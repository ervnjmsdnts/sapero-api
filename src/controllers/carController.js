module.exports.getAllCars = async (req, res) => {
  return res.status(200).send({ message: "get all cars" });
};
