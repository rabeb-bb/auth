import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import BookInfo from "../Components/BookInfo/BookInfo";
import Reviews from "../Components/Reviews/Reviews";
import { getAllReviews } from "../JS/actions/reviews";
import { getBook } from "../JS/actions/books";
const Book = () => {
  const book = useSelector((state) => state.bookReducer.book);
  const { _id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllReviews(_id));
    dispatch(getBook(_id));
  }, [dispatch]);
  return (
    <div>
      <BookInfo />
      <Reviews />
    </div>
  );
};

export default Book;
