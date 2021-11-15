const express = require("express");
const {
  bookUpload,
  getBookById,
  getBookByName,
  searchBooks,
  shelveBook,
  getBooks,
  bookUpdate,
  bookDelete,
  getAuthorBooks,
  removeBook,
} = require("../controllers/book.controllers");
const { validation } = require("../middleware/validateUser");
const isAuth = require("../middleware/isAuth");
const author = require("../middleware/author");
const router = express.Router();
// const cloudinary = require("../config/cloudinary");
const upload = require("../config/multer");

const { bookValidate } = require("../middleware/validateBook");
// const Book = require("../models/Book");
// const paginatedResults = require("../middleware/paginate");
// router.get("/", (req, res) => {
//   res.send("test");
// }); =====>works
// *****************

//author
// Upload Book
router.post(
  "/author/upload",
  // upload.single("cover"),
  bookUpload,
  isAuth,
  validation,
  bookValidate
);
//update book information
router.put("/author/update/:_id", isAuth, bookUpdate);
//add book to shelf
router.put("user/add/:_id", isAuth, shelveBook);
//add book to shelf
router.put("user/remove/:_id", isAuth, removeBook);
//update book information
router.delete("/author/delete/:_id", isAuth, bookDelete);

//all users
//get book by id
router.get("/book/:_id", getBookById);
//get book by author id
router.get("/author/:author_id", getAuthorBooks);

//get all books
// router.get("/all", paginatedResults(Book), (req, res) => {
//   res.json(res.paginatedResults);
// });
router.get("/all", getBooks);
//search books
router.post("/search", searchBooks);

//export
module.exports = router;
