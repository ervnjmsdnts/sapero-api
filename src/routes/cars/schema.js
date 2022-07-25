const { object, string, number } = require("yup");

module.exports.createCarSchema = object({
  name: string().required(),
  description: string().required(),
  type: string().required(),
  rate: number().required(),
  image: string(),
  status: string().oneOf(["rented", "reserved", "available"]),
});

module.exports.updateCarSchema = object({
  id: string().required(),
  name: string(),
  description: string(),
  type: string(),
  rate: number(),
  image: string(),
  status: string().oneOf(["rented", "reserved", "available"]),
});

module.exports.deleteCarSchema = object({
  id: string().required(),
});

module.exports.imageCarSchema = object({
  id: string().required(),
  image: string().required(),
});

module.exports.rentCarSchema = object({
  car: string().required(),
  pickUpDate: string().required(),
  endDate: string().required(),
  totalPrice: number().required(),
  status: string().oneOf(["on-going", "finished"]),
});

module.exports.reserveCarSchema = object({
  car: string().required(),
  dateOfReservation: string().required(),
  totalPrice: number().required(),
  status: string().oneOf(["on-going", "finished"]),
});
