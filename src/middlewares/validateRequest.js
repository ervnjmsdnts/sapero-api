module.exports.validate = (schema) => async (req, res, next) => {
  try {
    console.log(req.body);
    await schema.validate({
      ...req.body,
      ...req.query,
      ...req.params,
    });

    next();
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
