import React from "react";
import Reviews from "./Reviews";
import ThumbUpAltTwoToneIcon from "@mui/icons-material/ThumbUpAltTwoTone";
import SmsTwoToneIcon from "@mui/icons-material/SmsTwoTone";
import ShareTwoToneIcon from "@mui/icons-material/ShareTwoTone";
import "./Reviews.css";
import Rating from "@mui/material/Rating";

const Review = ({ review }) => {
  return (
    <div className="d-flex justify-content-start row review">
      <div className="col-md-9">
        <div className="d-flex flex-column  comment-section">
          <div className="bg-white p-2">
            <div className="d-flex flex-row user-info">
              <img
                className="rounded-circle"
                src={
                  review.user_id.profile_picture
                    ? review.user_id.profile_picture
                    : "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
                }
                width="40"
              />
              <div className="d-flex flex-column justify-content-start ml-2">
                <span className="d-block font-weight-bold name">
                  {review.user_id.first_name}
                </span>
                <span className="date text-black-50">
                  {review.date_of_release}
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
              <Rating name="read-only" value={review.rating} />

              <p className="comment-text">{review.description}</p>
            </div>
          </div>
          <div className="bg-white">
            <div className="d-flex flex-row fs-12">
              <div className="like p-2 cursor">
                <i className="fa fa-thumbs-o-up"></i>
                <span className="ml-1">Like</span>
              </div>
              <div className="like p-2 cursor">
                <i className="fa fa-commenting-o"></i>
                <span className="ml-1">Comment</span>
              </div>
              <div className="like p-2 cursor">
                <i className="fa fa-share"></i>
                <span className="ml-1">Share</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
