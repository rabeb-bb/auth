const { validationResult, check } = require("express-validator");

exports.bookValidate = () => [
  check("title", "title is required").notEmpty(),
  // check("price_currency", "price_currency is required").notEmpty(),
  check("price", "price is required").notEmpty(),
  check("tags", "tags is required").notEmpty(),
  check("description", "synopsis is required").notEmpty(),
];

exports.validation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
