module.exports.validate = (schema) => async (req, res, next) => {
  try {
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
