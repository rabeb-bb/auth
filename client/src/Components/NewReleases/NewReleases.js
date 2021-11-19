import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllBooks } from "../../JS/actions/books";
import BookCard from "../../Components/BookCard";
import "./NewReleases.css";

const NewReleases = () => {
  const books = useSelector((state) => state.bookReducer.books);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllBooks());
  }, [dispatch]);
  //  const handleBook=()=>{
  //     dispatch(getBookById())
  //   }
  return (
    <div
      style={{
        maxHeight: "100%",
        overflow: "scroll",
        overflowX: "hidden",
        margin: "3%",
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
      }}
    >
      <h3>Books</h3>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {books &&
          books.map((el, i) => (
            <BookCard book={el} key={i} />
            // <div className="box">
            //   <img src={el.cover} />
            //   <span>
            //     <Link to={`/book/${el._id}`}>{el.title}</Link>
            //     <Link to={`/author`}>{el.author_id[0].first_name}</Link>
            //   </span>
            // </div>
          ))}
      </div>
    </div>
  );
};

export default NewReleases;
