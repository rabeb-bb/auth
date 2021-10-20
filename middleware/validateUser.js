const { validationResult, check } = require("express-validator");
// exports.registerValidate = () => [
//   check("name", "name is required").notEmpty(),
//   check("password", "password should be 6 characters or over").isLength({
//     min: 6,
//   }),
//   check("email", "email is required and should be valid").isEmail().notEmpty(),
// ];
exports.registerValidate = () => [
  check("first_name", "first name is required").notEmpty(),
  check("last_name", "last name is required").notEmpty(),
  check("email", "should be email").isEmail(),
  check("password", "password is required").notEmpty(),
  // check("password2", "rentering password is required").notEmpty(),
  // check("password2", "passwords don't match").custom((value, { req }) => {
  //   if (value === req.body.password) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }),
  check("role", "you need to choose to be a reader or an author").notEmpty(),
  check("password", "enter a valid password").isLength({ min: 6 }),
];
exports.loginValidate = () => [
  check("email", "should be email").isEmail().notEmpty(),
  check("password", "password is required").notEmpty(),
  check("password", "enter a valid password").isLength({ min: 6 }),
];
exports.validation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
