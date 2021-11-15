import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllReviews, postReview } from "../../JS/actions/reviews";
import Review from "./Review";
import Rating from "@mui/material/Rating";

const Reviews = () => {
  const [genre, setGenre] = useState([]);
  const [tag, setTag] = useState("");
  const reviews = useSelector((state) => state.reviewReducer.reviews);
  const user = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();
  const { _id } = useParams();
  const [review, setReview] = useState({
    title: "",
    rating: 0,
    description: "",
    date_of_release: Date.now,
    user_id: user._id,
    book_id: _id,
  });
  useEffect(() => {
    dispatch(getAllReviews(_id));
  }, [dispatch]);

  // posting review
  const handleTag = (e) => {
    setTag(e.target.value);
  };
  const handleGenre = (e) => {
    setGenre([...genre, tag]);
    e.preventDefault();
    setTag("");
  };
  const handleChange = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value });
  };
  const handleReview = () => {
    setReview({ ...review, tags: genre });
    dispatch(postReview(review));
    setReview({
      title: "",
      rating: 0,
      description: "",
      date_of_release: Date.now,
      user_id: user._id,
      book_id: _id,
    });
    setTag("");
  };
  return (
    <div>
      {reviews.map((el, i) => (
        <Review review={el} key={i} />
      ))}
      <div
        className="bg-light p-2"
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "3%",
          padding: "2%",
        }}
      >
        <div className="d-flex flex-column align-items-start">
          <div className="d-flex">
            <img
              className="rounded-circle"
              src={
                user.profile_picture
                  ? user.profile_picture
                  : "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
              }
              width="40"
            />
            <h5>
              {user.first_name}
              {user.last_name}
            </h5>
          </div>
          <div className="d-flex flex-column align-items-start">
            <label>Rate the book:</label>
            <Rating
              name="rating"
              onChange={(e) => handleChange(e)}
              value={review.rating}
            />
            <label>Title:</label>
            <input
              name="title"
              className="form-control ml-1 shadow-none"
              onChange={(e) => handleChange(e)}
            />
            <label>Tags:</label>
            <input
              className="text-input"
              name="tag"
              placeholder="Enter book tags"
              required
              onChange={(e) => handleTag(e)}
              //   value={tag}
            />
            <button onClick={(e) => handleGenre(e)}>Add</button>
            <label>Review:</label>
            <textarea
              name="description"
              onChange={(e) => handleChange(e)}
              className="form-control ml-1 shadow-none textarea"
            ></textarea>
          </div>
        </div>
        <div className="mt-2 text-right">
          <button
            className="btn btn-primary btn-sm shadow-none"
            type="button"
            onClick={(e) => handleReview(e)}
          >
            Post Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
