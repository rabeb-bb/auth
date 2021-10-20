const User = require("../models/User");

//log into an already existing user account
exports.getUsers = async (req, res) => {
  try {
    const getAllUsers = await User.find();
    console.log(getAllUsers);
    res.status(200).send({ msg: "found all users", users: getAllUser });
  } catch {
    console.log(error);
    res.status(400).send({ errors: [{ msg: "could not find all users" }] });
  }
};
