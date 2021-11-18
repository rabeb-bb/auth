import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editBook } from "../JS/actions/books";
import Notification from "./Notification";

const BookEdit = ({ book, setShow }) => {
  const [genre, setGenre] = useState([]);
  const [tag, setTag] = useState("");
  const [cover, setCover] = useState("");
  // const [file, setFile] = useState("");
  const [book2Edit, setBook2Edit] = useState(book);
  const errors = useSelector((state) => state.bookReducer.errors);
  const dispatch = useDispatch();
  const onChangeCover = (e) => {
    setCover(e.target.files[0]);
    setBook2Edit({ ...book2Edit, cover: cover });
  };
  // const onChangeFile = (e) => {
  //   setFile(e.target.files[1]);
  // };
  const handleEdit = (e) => {
    const formData = new FormData();
    formData.append("title", book2Edit.title);
    formData.append("isbn", book2Edit.isbn);
    formData.append("cover", cover);
    formData.append("tags", genre);
    // formData.append("price_currency", book2Edit.price_currency);
    formData.append("description", book2Edit.description);
    // formData.append("file", file);
    formData.append("price", book2Edit.price);
    formData.append("rating", book2Edit.rating);
    setShow(false);
    dispatch(editBook(formData, book2Edit._id));
    setShow(false);
    e.preventDefault();
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

    setBook2Edit({
      ...book2Edit,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      {!errors
        ? errors.map((el, i) => <Notification error={el} key={i} />)
        : null}

      <h2>Upload new book</h2>
      <form
        onSubmit={handleEdit}
        encType="multipart/form-data"
        className="register-form"
      >
        <label>Book title</label>
        <input
          className="text-input"
          name="title"
          type="string"
          placeholder="Enter the title of your book"
          required
          onChange={(e) => handleBook(e)}
          value={book2Edit.title}
        />
        <label>ISBN:</label>
        <input
          className="text-input"
          name="isbn"
          type="string"
          placeholder="Enter your book's isbn"
          required
          onChange={(e) => handleBook(e)}
          value={book2Edit.isbn}
        />
        <label>Date of release</label>
        <input
          className="text-input"
          name="date_of_release"
          type="date"
          placeholder="Enter your date of birth"
          onChange={(e) => handleBook(e)}
          value={book2Edit.date_of_release}
        />
        <label>Tags:</label>
        <input
          className="text-input"
          name="email"
          placeholder="Enter book tags"
          required
          onChange={(e) => handleTag(e)}
          //   value={tag}
        />
        <button onClick={(e) => handleGenre(e)}>Add</button>
        <label>Synopsis</label>
        <textarea
          className="text-input"
          name="description"
          placeholder="Enter book Synopsis"
          onChange={(e) => handleBook(e)}
          value={book2Edit.description}
        />
        <label>Book Cover</label>
        <input
          className="text-input"
          type="file"
          name="cover"
          placeholder="upload book cover"
          onChange={onChangeCover}
        />
        {/* <label>Upload File</label>
        <input
          className="text-input"
          type="file"
          name="file"
          placeholder="Upload file"
          onChange={onChangeFile}
        /> */}
        <label>Price</label>
        <input
          type="number"
          className="text-input"
          name="price"
          placeholder="Upload file"
          onChange={(e) => handleBook(e)}
          value={book2Edit.price}
        />
        {/* <label>Currency</label>
        <select name="price_currency" onChange={(e) => handleBook(e)}>
          <option value="USD">US dollar</option>
          <option value="EURO">Euro</option>
          <option value="TND">Tunisian dinar</option>
        </select> */}
        <input type="submit" className="submit-btn" />
      </form>
    </div>
  );
};

export default BookEdit;
