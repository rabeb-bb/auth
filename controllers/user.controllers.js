const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//create user account
exports.Register = async (req, res) => {
  try {
    const { email, password } = req.body;
    //check if email exists in the db or not
    const findUser = await User.findOne({ email: email });
    if (findUser) {
      return res
        .status(400)
        .send({ errors: [{ msg: "email already exists" }] });
    }
    //encryprt password
    const saltRounds = 10;
    const hashPassword = await bcrypt.hashSync(password, saltRounds);

    //create new user
    const newUser = new User({ ...req.body });
    newUser.password = hashPassword;

    //save user
    await newUser.save();
    //implemant token
    const token = jwt.sign(
      {
        id: newUser._id,
      },
      process.env.SECRET_KEY,
      { expiresIn: "2h" }
    );
    res
      .status(200)
      .send({ msg: "registered successfully", user: newUser, token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ errors: [{ msg: "could not register" }] });
  }
};

//log into an already existing user account
exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //check if email exists in the db or not
    const findUser = await User.findOne({ email: email });
    if (!findUser) {
      return res.status(400).send({ errors: [{ msg: "bad credentials" }] });
    }
    //compare encrypted password
    const comparePass = await bcrypt.compare(password, findUser.password);
    if (!comparePass) {
      return res.status(400).send({ errors: [{ msg: "bad credential" }] });
    }
    //implemant token
    const token = jwt.sign(
      {
        id: findUser._id,
      },
      process.env.SECRET_KEY,
      { expiresIn: "24h" }
    );

    res.status(200).send({ msg: "login successfully", user: findUser, token });
  } catch (error) {
    res.status(500).send({ errors: [{ msg: "could not login" }] });
  }
};

//get all users
exports.getUsers = async (req, res) => {
  try {
    const getAllUsers = await User.find();
    res.status(200).send({ msg: "found all users", users: getAllUsers });
  } catch (error) {
    res.status(400).send({ errors: [{ msg: "could not find all users" }] });
  }
};
//get user by id
exports.getUser = async (req, res) => {
  try {
    const getUser = await User.findById(req.params._id);
    res
      .status(200)
      .send({ msg: "found the user you are looking for", user: getUser });
  } catch {
    res.status(400).send({ errors: [{ msg: "could not find user" }] });
  }
};
//get user by id
exports.deleteUser = async (req, res) => {
  console.log(req.params);
  try {
    const deletedUser = await User.deleteOne({ _id: req.params._id });
    console.log(req.params);
    res.status(200).send({ msg: "user is deleted", user: deletedUser });
  } catch (error) {
    console.log(req.params);
    res.status(400).send({ errors: [{ msg: "could not delete user" }] });
  }
};
//get user by id
exports.changeRole = async (req, res) => {
  try {
    const updateUser = await User.updateOne(
      { _id: req.params._id },
      {
        $set: { ...req.body },
      }
    );
    res.status(200).send({ msg: "user is deleted", user: updateUser });
  } catch (error) {
    res.status(400).send({ errors: [{ msg: "could not delete user" }] });
  }
};
