const Book = require("../models/Book");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Post a new book
exports.bookUpload = async (req, res) => {
  try {
    const { isbn } = req.body;
    //check if book already exists in the db or not
    const findBook = await Book.findOne({ isbn: isbn });
    if (findBook) {
      return res.status(400).send({ errors: [{ msg: "book already exists" }] });
    }
    //upload a new book
    const newBook = new Book({ ...req.body });

    //save book
    await newBook.save();

    res.status(200).send({ msg: "book successfully uploaded", book: newBook });
  } catch (error) {
    console.log(error);
    res.status(500).send({ errors: [{ msg: "could not upload book" }] });
  }
};
//update a book
exports.bookUpdate = async (req, res) => {
  try {
    //check if book already exists in the db or not
    const findBook = await Book.updateOne(
      { _id: req.params._id },
      { $set: { ...req.body } }
    );

    res.status(200).send({ msg: "book successfully updated", book: findBook });
  } catch (error) {
    console.log(error);
    res.status(500).send({ errors: [{ msg: "could not update book" }] });
  }
};
//delete a book
exports.bookDelete = async (req, res) => {
  try {
    //check if book already exists in the db or not
    const deleteBook = await Book.deleteOne({ _id: req.params._id });

    res
      .status(200)
      .send({ msg: "book successfully deleted", book: deleteBook });
  } catch (error) {
    console.log(error);
    res.status(500).send({ errors: [{ msg: "could not delete book" }] });
  }
};

//get a book
exports.getBookById = async (req, res) => {
  try {
    // const { _id } = req.body;
    //check if email exists in the db or not
    const findBook = await Book.findById(req.params._id);

    // if (!findBook) {
    //   return res.status(404).send({ errors: [{ msg: "book does not exist" }] });
    // }
    console.log(findBook);
    res.status(200).send({ msg: "book is found", book: findBook });
  } catch (error) {
    console.log(error);
    res.status(500).send({ errors: [{ msg: "could not find book" }] });
  }
};
//get the books of a certain author
exports.getAuthorBooks = async (req, res) => {
  try {
    const findBook = await Book.find({ author_id: req.params.author_id });

    // if (!findBook) {
    //   return res.status(404).send({ errors: [{ msg: "book does not exist" }] });
    // }
    console.log(findBook);
    res.status(200).send({ msg: " author books are found", books: findBook });
  } catch (error) {
    console.log(error);
    res.status(500).send({ errors: [{ msg: "could not find books" }] });
  }
};

//get all books
exports.getBooks = async (req, res) => {
  try {
    const getAllBooks = await Book.find();
    res.status(200).send({ msg: "found all books", books: getAllBooks });
  } catch (error) {
    res.status(500).send({ errors: [{ msg: "could not find all books" }] });
  }
};
