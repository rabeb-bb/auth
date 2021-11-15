const { cloudinary } = require("../config/cloudinary");
const Book = require("../models/Book");

//Post a new book
exports.bookUpload = async (req, res) => {
  try {
    const isbn = req.body.isbn;
    //check if book already exists in the db or not
    const findBook = await Book.findOne({ isbn: isbn });
    if (findBook) {
      return res.status(400).send({ errors: [{ msg: "book already exists" }] });
    }

    let result;
    if (req.file) {
      result = await cloudinary.uploader.upload(req.file.path);
    }
    console.log(`cloudinary result${result}`);
    //upload a new book
    const newBook = new Book({
      ...req.body,
      cover: result.secure_url,
      cloudinary_id: result.public_id,
    });

    //save book
    await newBook.save();

    res.status(200).send({ msg: "book successfully uploaded", book: newBook });
  } catch (error) {
    console.log(error);
    res.status(400).send({ errors: [{ msg: "could not upload book" }] });
  }
};

//add book to shelf
exports.bookToShelf = async (req, res) => {
  try {
    const book2shelf = await Book.updateOne(
      { _id: req.params._id },
      { $set: { ...req.body } }
    );
    console.log(book2shelf);
    res
      .status(200)
      .send({ msg: "book successfully uploaded", book: book2shelf });
  } catch (error) {
    console.log(error);
    res.status(400).send({ errors: [{ msg: "could not upload book" }] });
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
    res.status(400).send({ errors: [{ msg: "could not update book" }] });
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
    res.status(400).send({ errors: [{ msg: "could not delete book" }] });
  }
};

//get a book
exports.getBookById = async (req, res) => {
  try {
    // const { _id } = req.body;
    //check if email exists in the db or not
    const findBook = await Book.findById(req.params._id)
      .populate(["author_id", "reader_id", "reviews"])
      .exec();

    // if (!findBook) {
    //   return res.status(404).send({ errors: [{ msg: "book does not exist" }] });
    // }
    // console.log(findBook);
    res.status(200).send({ msg: "book is found", book: findBook });
  } catch (error) {
    console.log(`get book by id: ${error}`);
    res.status(400).send({ errors: [{ msg: "could not find book" }] });
  }
};

//get the books of a certain author
exports.getAuthorBooks = async (req, res) => {
  try {
    const findBook = await Book.find({
      author_id: req.params.author_id,
    })
      .populate(["author_id", "reader_id", "reviews"])
      .exec();

    // if (!findBook) {
    //   return res.status(404).send({ errors: [{ msg: "book does not exist" }] });
    // }
    // console.log(findBook);
    res.status(200).send({ msg: " author books are found", books: findBook });
  } catch (error) {
    console.log(`get author books: ${error}`);
    res.status(400).send({ errors: [{ msg: "could not find books" }] });
  }
};

//get all books
exports.getBooks = async (req, res) => {
  try {
    const getAllBooks = await Book.find()
      .populate(["author_id", "reader_id"])
      .exec();
    res.status(200).send({ msg: "found all books", books: getAllBooks });
  } catch (error) {
    console.log(`all${error}`);
    res.status(400).send({ errors: [{ msg: "could not find all books" }] });
  }
};

//get all books
exports.searchBooks = async (req, res) => {
  const { title, genre, year, isbn } = req.body;
  const regex = new RegExp(title, "i");
  try {
    const getAllBooks = await Book.find({
      $or: [
        // { title: `/${title}/i ` },
        { title: { $regex: regex } },
        { isbn: `/${isbn}/i ` },
        { tags: { $in: [genre] } },
      ],
    })
      .populate(["author_id", "reader_id"])
      .exec();
    res.status(200).send({ msg: "found filtered books", books: getAllBooks });
  } catch (error) {
    console.log(`filtered${error}`);
    res
      .status(400)
      .send({ errors: [{ msg: "could not find filtered books" }] });
  }
};

//add book to shelf
exports.shelveBook = async (req, res) => {
  try {
    //check if book already exists in the db or not
    const findBook = await Book.updateOne(
      { _id: req.params._id },
      { $set: { ...req.body } }
    );
    console.log(`book to shelve ${findBook}`);
    res.status(200).send({ msg: "book successfully added", book: findBook });
  } catch (error) {
    console.log(`error shelving${error}`);
    res.status(400).send({ errors: [{ msg: "could not add book" }] });
  }
};
//remove book from shelf
exports.removeBook = async (req, res) => {
  try {
    //check if book already exists in the db or not
    const findBook = await Book.updateOne(
      { _id: req.params._id },
      { $set: { ...req.body } }
    );

    res.status(200).send({ msg: "book successfully removed", book: findBook });
  } catch (error) {
    console.log(error);
    res.status(400).send({ errors: [{ msg: "could not remove book" }] });
  }
};
