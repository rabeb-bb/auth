import React, { useState } from "react";
import "./Reviews.css";
import Rating from "@mui/material/Rating";
import { useDispatch } from "react-redux";
import { deleteReview, editReview } from "../../JS/actions/reviews";
import { postTicket } from "../../JS/actions/tickets";
import { time_ago } from "../../utilities/time";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

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

const Review = ({ review }) => {
  const [editedReview, setEditedReview] = useState(review);
  const [edit, setEdit] = useState(false);
  const [flag, setFlag] = useState(false);
  const [show, setShow] = useState(false);
  const [likes, setLikes] = useState(false);
  const [genre, setGenre] = useState([]);
  const [tag, setTag] = useState("");
  const [ticket, setTicket] = useState({
    type: "",
    content: "",
    date: Date.now,
    user_id: localStorage.getItem("userID"),
    reportedReview: "",
    reportedUserId: "",
    status: "open",
  });
  const dispatch = useDispatch();
  const handleClose = () => setShow(false);
  const handleEdit = () => {
    setShow(true);
  };
  // const handleSave = () => {
  //   dispatch(editReview(editedReview));
  //   setShow(false);
  // };
  const handleDelete = () => {
    dispatch(deleteReview(review));
  };
  const handleReport = () => {
    setShow(true);
    setFlag(true);
  };
  const handleChangeTicket=(e)=>{
    setTicket({
      ...ticket,
      [e.target.name]: e.target.value,
      reportedReview: review._id,
      reportedUserId: review.user_id._id,
    });
     
  }
  const handleTicket = () => {
   
  
    dispatch(postTicket(ticket));
    setShow(false);
    setFlag(false);
  };
  const handleLike = () => {
    setLikes(!likes);
    if (likes) {
      setEditedReview({ ...editedReview, likes: likes + 1 });
    } else {
      setEditedReview({ ...editedReview, likes: likes - 1 });
    }
    dispatch(editReview(editedReview));
  };
  const handleTag = (e) => {
    setTag(e.target.value);
  };
  const handleGenre = (e) => {
    setGenre([...genre, tag]);
    e.preventDefault();
    setTag("");
  };
  const handleChange = (e) => {
    setEditedReview({ ...editedReview, [e.target.name]: e.target.value });
  };
  const handleReview = () => {
    setEditedReview({ ...editedReview, tags: genre });
    dispatch(editReview(editedReview));
    setTag("");
    setShow(false);
  };
  const handleRemoveTag = (elmt) => {
    setEditedReview({
      ...editedReview,
      tags: editedReview.tags.filter((el) => el === elmt),
    });
  };
  return (
    <div className="d-flex justify-content-start row review">
      <div className="col-md-9">
        <div className="d-flex flex-column  comment-section">
          <div className="bg-white p-2">
            <div className="d-flex flex-row user-info">
              <img
                className="rounded-circle"
                src=
                  // review.user_id.profile_picture
                  //   ? review.user_id.profile_picture:
                  "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
                
                width="40"
              />
              <div className="d-flex flex-column justify-content-start ml-2">
                {/* <span className="d-block font-weight-bold name">
                  {review.user_id.first_name}
                </span> */}
                <span className="date text-black-50">
                  {time_ago(review.date_of_release)}
                </span>
              </div>
            </div>
            <div className="mt-2">
              <h6 className="comment-text">{review.title}</h6>
              <ul className="list-inline list-inline-dotted mb-3 mb-lg-2">
                {review.tags.map((el) => (
                  <li className="list-inline-item">
                    <a href="#" className="text-muted" data-abc="true">
                      {" "}
                      {el}
                    </a>
                  </li>
                ))}
              </ul>
              <Rating name="read-only" value={review.rating} readOnly/>

              <p className="comment-text">{review.description}</p>
            </div>
          </div>
          <div className="bg-white">
            <div className="d-flex flex-row fs-12">
              <div className="like p-2 cursor" onClick={() => handleLike()}>
                <i className="fa fa-thumbs-o-up"></i>
                <span className="ml-1">Like</span>
              </div>
              <div className="like p-2 cursor" onClick={() => handleReport()}>
                <i className="fa fa-flag"></i>
                <span className="ml-1">Report</span>
              </div>
              {review.user_id._id === localStorage.getItem("userID") ? (
                <div className="like p-2 cursor" onClick={() => handleEdit()}>
                  <i className="fa fa-edit"></i>
                  <span className="ml-1">Edit</span>
                </div>
              ) : null}
              {review && review.user && review.user_id._id === localStorage.getItem("userID") && (
                <div className="like p-2 cursor" onClick={() => handleDelete()}>
                  <i className="fa fa-trash"></i>
                  <span className="ml-1">Delete</span>
                </div>
              ) }
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={show}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {flag ? (
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Report
            </Typography>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-helper-label">
                Report
              </InputLabel>
              <Select
                name="type"
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                label="report"
                onChange={handleChangeTicket}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="report_user">Report user</MenuItem>
                <MenuItem value="report_review">Report review</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-helper-label">
                What for?
              </InputLabel>
              <Select
                name="topic"
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                label="reason"
                onChange={handleChangeTicket}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="inappropriate behavior">
                  Inappropriate behavior
                </MenuItem>
                <MenuItem value="spoilers">spoilers</MenuItem>
              </Select>
            </FormControl>
            <button
              className="btn btn-primary btn-sm shadow-none"
              type="button"
              onClick={() => handleTicket()}
            >
              Report
            </button>
            {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              
            </Typography> */}
          </Box>
        ) : (
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Edit Review
            </Typography>
            <div className="d-flex flex-column align-items-start">
              <label>Rate the book:</label>
              <Rating
                name="rating"
                onChange={(e) => handleChange(e)}
                value={editedReview.rating}
              />
              <label>Title:</label>
              <input
                value={editedReview.title}
                name="title"
                className="form-control ml-1 shadow-none"
                onChange={(e) => handleChange(e)}
              />
              <label>Tags:</label>
              {editedReview.tags.map((el, i) => (
                <input
                  className="form-control ml-1 shadow-none"
                  type="checkbox"
                  key={i}
                  onChange={() => handleRemoveTag(el)}
                  value={el}
                />
              ))}
              <input
                className="form-control ml-1 shadow-none"
                name="tag"
                placeholder="Enter book tags"
                required
                onChange={(e) => handleTag(e)}
                //   value={tag}
              />
              <button
                className="btn btn-primary btn-sm shadow-none"
                onClick={(e) => handleGenre(e)}
              >
                Add
              </button>
              <label>Review:</label>
              <textarea
                value={editedReview.description}
                name="description"
                onChange={(e) => handleChange(e)}
                className="form-control ml-1 shadow-none textarea"
              ></textarea>
            </div>
            <button
              className="btn btn-primary btn-sm shadow-none"
              type="button"
              onClick={(e) => handleReview(e)}
            >
              Post Review
            </button>
          </Box>
        )}
      </Modal>
    </div>
  );
};

export default Review;
