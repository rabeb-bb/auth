const express = require("express");
const {
  Register,
  Login,
  getAuthor,
  EditInfo,
  searchAuthors,
} = require("../controllers/user.controllers");
const {
  registerValidate,
  loginValidate,
  validation,
} = require("../middleware/validateUser");
const isAuth = require("../middleware/isAuth");
const router = express.Router();
const cloudinary = require("../config/cloudinary");
const upload = require("../config/multer");

// router.get("/", (req, res) => {
//   res.send("test");
// }); =====>works
// *****************

// Register Router
router.post("/register", registerValidate(), validation, Register);

//Login router
router.post("/login", loginValidate(), validation, Login);

//get current user
router.get("/current", isAuth, (req, res) => {
  res.send({ msg: `authorized`, user: req.user });
});
//edit profile
router.put("/edit/:_id", upload.single("profile_picture"), isAuth, EditInfo);
//get author
router.get("/author/:author_id", getAuthor);
router.post("/authors/search", searchAuthors);

//export
module.exports = router;
