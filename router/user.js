const express = require("express");
const { Register, Login } = require("../controllers/user.controllers");
const {
  registerValidate,
  loginValidate,
  validation,
} = require("../middleware/validateUser");
const isAuth = require("../middleware/isAuth");
const router = express.Router();

// router.get("/", (req, res) => {
//   res.send("test");
// }); =====>works
// *****************

// Register Router
router.post("/register", registerValidate(), validation, Register);

//Login router
router.post("/login", loginValidate(), validation, Login);

//get something
router.get("/current", isAuth, (req, res) => {
  res.send({ msg: `authorized`, user: req.user });
});

//export
module.exports = router;
