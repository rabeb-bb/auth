import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllReviews, postReview } from "../../JS/actions/reviews";
import { editBook } from "../../JS/actions/books";
import Review from "./Review";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Reviews = () => {
  const [open, setOpen] = React.useState(false);

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
  const book = useSelector((state) => state.bookReducer.book);
  const [ratedBook, setRatedBook] = useState({ ...book });
  console.log(ratedBook);
  useEffect(() => {
    dispatch(getAllReviews(_id));
    setReview({ ...review, tags: genre });
  }, [dispatch, genre]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // posting review
  const handleTag = (e) => {
    setTag(e.target.value);
  };
  const handleGenre = (e) => {
    setGenre([...genre, tag]);
    e.preventDefault();
    setTag("");
    setGenre([]);
  };
  const handleChange = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value });
  };
  const handleReview = () => {
    setRatedBook({
      ...ratedBook,
      number_of_reviews: book.number_of_reviews + 1,
      count: book.count + 1,
      score: book.score + review.rating,
    });
    dispatch(postReview(review));
    // dispatch(editBook(ratedBook));
    setReview({
      title: "",
      rating: 0,
      description: "",
      date_of_release: Date.now,
      user_id: user._id,
      book_id: _id,
    });
    setTag("");
    setOpen(false);
  };
  return (
    <div>
      <button
        onClick={handleOpen}
        className="btn btn-link btn-sm shadow-none"
        style={{ margin: "0 3%" }}
      >
        write a review
      </button>
      {reviews.map((el, i) => (
        <Review review={el} key={i} />
      ))}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Write a Review
          </Typography>
          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
          <div
            className="bg-white p-2"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              // margin: "1% 20%",
              padding: "2%",
              // width: "30%",
            }}
          >
            <div className="d-flex flex-column align-items-start">
              <div className="d-flex align-items-center">
                <img
                  className="rounded-circle"
                  src={
                    user.profile_picture
                      ? user.profile_picture
                      : "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
                  }
                  width="40"
                />
                <h6>
                  {user.first_name} {user.last_name}
                </h6>
              </div>
              <div className="d-flex flex-column align-items-start">
                <div
                  className="d-flex flex-column align-items-start"
                  style={{ margin: "1% 3%" }}
                >
                  <label style={{ marginBottom: "8%" }}>Rate the book:</label>
                  <Rating
                    name="rating"
                    onChange={(e) => handleChange(e)}
                    value={review.rating}
                  />
                </div>
                <div
                  // style={{ marginLeft: "3%", width: "76%" }}
                  className="d-flex flex-column align-items-start ml-3"
                >
                  <label>Title:</label>
                  <input
                    name="title"
                    className="form-control ml-2 shadow-none"
                    onChange={(e) => handleChange(e)}
                  />
                </div>

                <div
                  style={{ margin: "1% 3%" }}
                  className="d-flex flex-column align-items-start"
                >
                  <label>Tags:</label>
                  <div
                    className="d-flex  align-items-center"
                    // style={{ width: "83%" }}
                  >
                    <input
                      className="form-control ml-1 shadow-none"
                      name="tag"
                      placeholder="Enter book tags"
                      required
                      onChange={(e) => handleTag(e)}
                      value={tag}
                    />

                    <button
                      className="btn btn-primary btn-sm shadow-none"
                      onClick={(e) => handleGenre(e)}
                    >
                      Add
                    </button>
                  </div>
                </div>
                <div
                  style={{ margin: "1% 3%" }}
                  className="d-flex flex-column align-items-start"
                >
                  <label>Review:</label>
                  <textarea
                    name="description"
                    onChange={(e) => handleChange(e)}
                    className="form-control ml-1 shadow-none textarea"
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="mt-2  text-right" style={{ marginLeft: "9%" }}>
              <button
                className="btn btn-primary btn-sm shadow-none"
                type="button"
                onClick={(e) => handleReview(e)}
              >
                Post Review
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Reviews;
