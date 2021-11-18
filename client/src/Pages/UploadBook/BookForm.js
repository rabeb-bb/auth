import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../Components/Notification";
import { postBook } from "../../JS/actions/books";

const BookForm = ({ history }) => {
  const [genre, setGenre] = useState([]);
  const [tag, setTag] = useState("");
  const [cover, setCover] = useState("");
  // const [file, setFile] = useState("");
  const [book, setBook] = useState({
    title: "",
    isbn: "",
    cover: "",
    tags: "",
    description: "",
    date_of_release: Date.now,
    price: 0,
    // price_currency: "",
    rating: 0,
  });
  const errors = useSelector((state) => state.bookReducer.errors);
  const user = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();
  const onChangeCover = (e) => {
    setCover(e.target.files[0]);
  };
  // const onChangeFile = (e) => {
  //   setFile(e.target.files[1]);
  // };
  const handleUpload = (e) => {
    const formData = new FormData();
    formData.append("title", book.title);
    formData.append("isbn", book.isbn);
    formData.append("cover", cover);
    formData.append("tags", genre);
    // formData.append("price_currency", book.price_currency);
    formData.append("description", book.description);
    // formData.append("file", file);
    formData.append("price", book.price);
    formData.append("rating", book.rating);
    formData.append("author_id", user._id);

    dispatch(postBook(formData, history));
    e.preventDefault();
    setBook({
      title: "",
      isbn: "",
      cover: "",
      tags: "",
      price_currency: "",
      description: "",
      date_of_release: "",
      price: 0,
      rating: 0,
    });
  };
  const handleRemoveTag = (e, elmt) => {
    e.preventDefault();
    setBook({
      ...book,
      tags: genre.filter((el) => el === elmt),
    });
  };
  const handleTag = (e) => {
    setTag(e.target.value);
  };
  const handleGenre = (e) => {
    setGenre([...genre, tag]);
    e.preventDefault();
    setTag("");
  };
  const handleBook = (e) => {
    e.preventDefault();

    setBook({
      ...book,
      [e.target.name]: e.target.value,
      author_id: user._id,
    });
  };

  return (
    <div style={{ textAlign: "center" }}>
      {!errors ? errors.map((el) => <Notification error={el} />) : null}

      <h2>Upload new book</h2>
      <form
        onSubmit={handleUpload}
        encType="multipart/form-data"
        // className="register-form"
        className="p-3 py-5 "
      >
        <label>Book title</label>
        <input
          className="form-control"
          name="title"
          type="string"
          placeholder="Enter the title of your book"
          required
          onChange={(e) => handleBook(e)}
          value={book.title}
        />
        <label>ISBN:</label>
        <input
          className="form-control"
          name="isbn"
          type="string"
          placeholder="Enter your book's isbn"
          required
          onChange={(e) => handleBook(e)}
          value={book.isbn}
        />
        <label>Date of release</label>
        <input
          className="form-control"
          name="date_of_release"
          type="date"
          placeholder="Enter your date of birth"
          onChange={(e) => handleBook(e)}
          value={book.date_of_release}
        />
        <label>Tags:</label>
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            className="form-control"
            name="tag"
            placeholder="Enter book tags"
            onChange={(e) => handleTag(e)}
            value={tag}
          />
          <button
            onClick={(e) => handleGenre(e)}
            className="btn btn-light "
            style={{ height: "5%" }}
          >
            Add
          </button>

          {/* {genre.map((el) => (
            <p>{el}</p>
          ))} */}
        </div>
        {genre.map((el, i) => (
          <span style={{ margin: "1%" }}>
            {" "}
            {el}
            {/* <button
              className="btn btn-light "
              onClick={(e) => handleRemoveTag(el)}
            >
              <i className="fa fa-trash"></i>
            </button> */}
          </span>
        ))}
        <label>Synopsis</label>
        <textarea
          className="form-control"
          name="description"
          placeholder="Enter book Synopsis"
          onChange={(e) => handleBook(e)}
          value={book.description}
        />
        <label>Book Cover</label>
        <input
          className="form-control"
          type="file"
          name="cover"
          placeholder="upload book cover"
          onChange={onChangeCover}
        />
        {/* <label>Upload File</label>
        <input
          className="form-control"
          type="file"
          name="file"
          placeholder="Upload file"
          onChange={onChangeFile}
        /> */}
        <label>Price</label>
        <input
          type="number"
          className="form-control"
          name="price"
          placeholder="Upload file"
          onChange={(e) => handleBook(e)}
          value={book.price}
        />
        {/* <label>Currency</label>
        <select name="price_currency" onChange={(e) => handleBook(e)}>
          <option value="USD">US dollar</option>
          <option value="EURO">Euro</option>
          <option value="TND">Tunisian dinar</option>
        </select> */}
        <input type="submit" className="btn btn-info" />
      </form>
    </div>
  );
};

export default BookForm;
