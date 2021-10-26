const express = require("express");
const {
  bookUpload,
  getBookById,
  getBookByName,
  getBooks,
  bookUpdate,
  bookDelete,
  getAuthorBooks,
} = require("../controllers/book.controllers");
const {
  registerValidate,
  loginValidate,
  validation,
} = require("../middleware/validateUser");
const isAuth = require("../middleware/isAuth");
const author = require("../middleware/author");
const router = express.Router();

// router.get("/", (req, res) => {
//   res.send("test");
// }); =====>works
// *****************

//author
// Upload Book
router.post("/author/upload", bookUpload);
//update book information
router.put("/author/update/:_id", bookUpdate);
//update book information
router.delete("/author/delete/:_id", bookDelete);

//all users
//get book by id
router.get("/book/:_id", getBookById);
//get book by author id
router.get("/author/:author_id", getAuthorBooks);

//get all books
router.get("/all", getBooks);

//get something
// router.get("/current", isAuth, (req, res) => {
//   res.send({ msg: `authorized`, user: req.user });
// });

//export
module.exports = router;
