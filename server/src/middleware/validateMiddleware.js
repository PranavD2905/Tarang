const validate = (schema) => (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(400);
      throw new Error(error.details[0].message);
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = validate;