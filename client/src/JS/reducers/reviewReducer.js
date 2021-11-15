// import types

import { EMPTY_ERRORS } from "../constants/action-types";

const {
  GET_ALL_REVIEWS,
  GET_REVIEW,
  DELETE_REVIEW,
  EDIT_REVIEW,
  POST_REVIEW,
  LOAD_REVIEW,
  FAIL_REVIEW,
} = require("../constants/review-types");

// initialstate
const initialState = {
  reviews: [],
  review: {},

  errors: [],

  load: false,
};

// pure function=> (state, {type,payload})=>
const reviewReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_REVIEW:
      return { ...state, load: true };
    case FAIL_REVIEW:
      return { ...state, errors: payload, load: false };
    case GET_ALL_REVIEWS:
      return { ...state, reviews: payload.reviews, load: false };
    case GET_REVIEW:
      return { ...state, review: payload.review, load: false };

    case DELETE_REVIEW:
      return {
        ...state,
        reviews: state.reviews.filter((el) => el.id !== payload.review._id),
      };
    case EDIT_REVIEW:
      return {
        ...state,
        review: payload.review,

        load: false,
      };
    case POST_REVIEW:
      return {
        ...state,
        review: payload.review,
        reviews: [...state.reviews, payload.review],
        load: false,
      };
    case EMPTY_ERRORS:
      return { ...state, errors: [] };
    default:
      return state;
  }
};

export default reviewReducer;
