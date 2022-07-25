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
