const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { cloudinary } = require("../config/cloudinary");

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
      process.env.SECRET_KEY
    );
    res
      .status(200)
      .send({ msg: "registered successfully", user: newUser, token });
  } catch (error) {
    console.log(error);
    res.status(400).send({ errors: [{ msg: "could not register" }] });
  }
};

//create user account
exports.EditInfo = async (req, res) => {
  console.log(req.user);
  try {
    // let { password } = req.body;
    let user = await User.findById(req.user._id);

    // Delete previous image from cloudinary
    if (user.cloudinary_id) {
      await cloudinary.uploader.destroy(user.cloudinary_id);
    }
    //compare encrypted password
    // encryprt password

    // const comparePass = await bcrypt.compare(password, user.password);

    // if (comparePass && password) {
    //   const saltRounds = 10;
    //   const hashPassword = await bcrypt.hashSync(password, saltRounds);
    //   password = hashPassword;
    // }

    // upload image to cloudinary,
    let result;
    if (req.file) {
      result = await cloudinary.uploader.upload(req.file.path);
    }

    // console.log(result);
    //update user
    if (result) {
      const updatedUser = await User.updateOne(
        { _id: req.user._id },
        {
          $set: {
            ...req.body,
            profile_picture: result.secure_url,
            cloudinary_id: result.public_id,
            // password: password,
          },
        }
      );
      res.status(200).send({ msg: "updated successfully", user: updatedUser });
    } else {
      const updatedUser = await User.updateOne(
        { _id: req.params._id },
        {
          $set: { ...req.body },
        }
      );
      res.status(200).send({ msg: "updated successfully", user: updatedUser });
    }
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send({ errors: [{ msg: "could not update account info" }] });
  }
};
exports.add2Shelf = async (req, res) => {
  console.log(req.user);
  try {
    // let { password } = req.body;
    let user = await User.findById(req.user._id);

    const updatedUser = await User.updateOne(
      { _id: req.user._id },
      {
        $set: {
          ...req.body,
        },
      }
    );
    res
      .status(200)
      .send({ msg: "added to shelf successfully", user: updatedUser });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send({ errors: [{ msg: "could not update account info" }] });
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
      return res.status(401).send({ errors: [{ msg: "bad credential" }] });
    }
    //implemant token
    const token = jwt.sign(
      {
        id: findUser._id,
      },
      process.env.SECRET_KEY
    );

    res.status(200).send({ msg: "login successfully", user: findUser, token });
  } catch (error) {
    res.status(400).send({ errors: [{ msg: "could not login" }] });
  }
};

//get all users
exports.getUsers = async (req, res) => {
  try {
    const getAllUsers = await User.find().populate("books");

    res.status(200).send({ msg: "found all users", users: getAllUsers });
  } catch (error) {
    console.log(error);
    res.status(400).send({ errors: [{ msg: "could not find all users" }] });
  }
};
//get user by id
exports.getUser = async (req, res) => {
  try {
    const getUser = await User.findById(req.params._id)
      .populate("books")
      .populate("reviews")
      .populate("posts");
    res
      .status(200)
      .send({ msg: "found the user you are looking for", user: getUser });
  } catch {
    res.status(400).send({ errors: [{ msg: "could not find user" }] });
  }
};
exports.getCurrent = async (req, res) => {
  try {
    const getUser = await User.findById(req.user._id)
      .populate({
        path: "books",
        populate: { path: "author_id" },
      })
      .exec();
    res
      .status(200)
      .send({ msg: "user found and populated and auth", user: getUser });
  } catch {
    res.status(400).send({ errors: [{ msg: "not authorized" }] });
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
    res.status(200).send({ msg: "role is changed", user: updateUser });
    // console.log(updateUser)
  } catch (error) {
    console.log(error);
    res.status(400).send({ errors: [{ msg: "could not change userRole" }] });
  }
};

//get author of a certain book
exports.getAuthor = async (req, res) => {
  try {
    // const { _id } = req.body;
    //check if email exists in the db or not
    const findUser = await User.findById(req.params.author_id)
      .populate("books")
      .exec();
    // .populate("posts");

    // if (!findBook) {
    //   return res.status(404).send({ errors: [{ msg: "book does not exist" }] });
    // }
    // console.log(findUser);
    res.status(200).send({ msg: "author is found", user: findUser });
  } catch (error) {
    console.log(error);
    res.status(400).send({ errors: [{ msg: "could not find author" }] });
  }
};
exports.searchAuthors = async (req, res) => {
  try {
    const { author } = req.body;
    //check if email exists in the db or not
    const findUser = await User.find({
      $or: [{ first_name: `/${author}/i` }, { last_name: `/${author}/i` }],
    })
      .populate({
        path: "books",
        populate: { path: "author_id" },
      })
      .exec();
    // .populate("posts");

    // if (!findBook) {
    //   return res.status(404).send({ errors: [{ msg: "book does not exist" }] });
    // }
    // console.log(findUser);
    res.status(200).send({ msg: "authors are found", users: findUser });
  } catch (error) {
    console.log(error);
    res.status(400).send({ errors: [{ msg: "could not find authors" }] });
  }
};
// exports.searchAuthors = async (req, res) => {
//   const { name } = req.body;
//   const regex = new RegExp(name, "i");
//   // const regex2 = new RegExp(isbn, "i");
//   try {
//     const getAllAuthors = await User.find({
//       $or: [
//         // { [author_id.last_name]: `/${author}/i ` },
//         { first_name: { $regex: regex } },
//         { last_name: { $regex: regex } },
//       ],
//       role: "author",
//     }).populate("books");
//     res
//       .status(200)
//       .send({ msg: "found filtered authors", users: getAllAuthors });
//   } catch (error) {
//     console.log(`filtered${error}`);
//     res
//       .status(400)
//       .send({ errors: [{ msg: "could not find filtered authors" }] });
//   }
// };
