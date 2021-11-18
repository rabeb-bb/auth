import axios from "axios";
import {
  DELETE_REVIEW,
  EDIT_REVIEW,
  FAIL_REVIEW,
  GET_ALL_REVIEWS,
  POST_REVIEW,
  GET_REVIEW,
  LOAD_REVIEW,
} from "../constants/review-types";

// get all reviews
export const getAllReviews = (book_id) => async (dispatch) => {
  dispatch({ type: LOAD_REVIEW });
  try {
    let result = await axios.get(`/api/review//book_reviews/${book_id}`);

    dispatch({ type: GET_ALL_REVIEWS, payload: result.data });
  } catch (error) {
    console.log(error.response);
    // dispatch({ type: FAIL_REVIEW, payload: error.response.data });
  }
};
// get review
export const getReview = (_id) => async (dispatch) => {
  dispatch({ type: LOAD_REVIEW });
  try {
    let result = await axios.get(`/api/review/review/${_id}`);
    console.log(result.data);
    dispatch({ type: GET_REVIEW, payload: result.data });
  } catch (error) {
    console.log(error.response.data);
    dispatch({ type: FAIL_REVIEW, payload: error.response.data });
  }
};
// get review for author only
export const deleteReview =
  ({ review }) =>
  async (dispatch) => {
    const config = {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    };
    try {
      let result = await axios.delete(
        `/api/review/author/delete/${review._id}`,
        config
      );
      console.log(result);
      dispatch({ type: DELETE_REVIEW, payload: result.data });
      dispatch(getAllReviews());
    } catch (error) {
      dispatch({ type: FAIL_REVIEW, payload: error.response.data });
    }
  };
//Edit review
export const editReview = (review) => async (dispatch) => {
  const config = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };
  try {
    let result = await axios.put(
      `/api/review/user/update/${review._id}`,
      review,
      config
    );

    dispatch({ type: EDIT_REVIEW, payload: result.data });
  } catch (error) {
    console.log(error);
    // dispatch({ type: FAIL_REVIEW, payload: error.response.data });
  }
};
//Edit review
export const postReview = (review) => async (dispatch) => {
  const config = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };
  try {
    let result = await axios.post(`/api/review/post`, review, config);
    console.log(result);
    dispatch({ type: POST_REVIEW, payload: result.data });
  } catch (error) {
    dispatch({ type: FAIL_REVIEW, payload: error.response.data });
  }
};
