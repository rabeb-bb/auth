const express = require("express");
const { getUsers } = require("../controllers/admin.controllers");
const { validation } = require("../middleware/validateUser");
const isAuth = require("../middleware/isAuth");
const router = express.Router();

// router.get("/", (req, res) => {
//   res.send("test");
// }); =====>works
// *****************

//get something
router.get("/", (req, res) => {
  res.send({ msg: `authorized`, users: getUsers });
});

//export
module.exports = router;
