import React from "react";
import { useSelector } from "react-redux";
// import { useParams } from "react-router";
import BookInfo from "../Components/BookInfo/BookInfo";
import Reviews from "../Components/Reviews/Reviews";

const Book = () => {
  const book = useSelector((state) => state.bookReducer.book);

  return (
    <div>
      <BookInfo />
      <Reviews />
    </div>
  );
};

export default Book;
