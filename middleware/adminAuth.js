const User = require("../models/User");
const jwt = require("jsonwebtoken");
const adminAuth = async (req, res, next) => {
  try {
    //import token
    const token = req.headers["authorization"];
    //check token
    if (!token) {
      return res
        .status(401)
        .send({ errors: [{ msg: "you are not authorized1" }] });
    }
    // verify token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    // test if the user exist with that id and if it is an admin
    const user = await User.findOne({ _id: decoded.id }).select("-password");
    if (!user || user.role !== "admin") {
      return res
        .status(401)
        .send({ errors: [{ msg: "you are not authorized2" }] });
    }
    req.user = user;

    // next
    next();
  } catch (error) {
    res.status(401).send({ errors: [{ msg: "you are not authorized" }] });
  }
};

module.exports = adminAuth;
