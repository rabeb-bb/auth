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
      { expiresIn: "24h" }
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
  } catch {
    console.log(error);
    res.status(500).send({ errors: [{ msg: "could not login" }] });
  }
};
