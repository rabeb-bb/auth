const express = require("express");
const router = express.Router();
const adminAuth = require("../middleware/adminAuth");
const {
  getUsers,
  getUser,
  deleteUser,
  changeRole,
} = require("../controllers/user.controllers");

//get all users
router.get("/", adminAuth, getUsers);
//get user by id
router.get("/:_id", adminAuth, getUser);
//delete user by id
router.delete("/delete/:_id", deleteUser);
//change user role
router.put("/update/:_id", adminAuth, changeRole);

//export
module.exports = router;
