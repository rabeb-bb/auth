// import types

import { EMPTY_ERRORS } from "../constants/action-types";

const {
  GET_ALL_BOOKS,
  GET_BOOK,
  ADD_BOOK,
  DELETE_BOOK,
  REMOVE_BOOK,
  EDIT_BOOK,
  LOAD_BOOK,
  FAIL_BOOK,
  POST_BOOK,
  MY_BOOKS,
} = require("../constants/book-types");

// initialstate
const initialState = {
  books: [],
  book: null,
  myBooks: [],
  shelf: [],
  auth: false,
  isAuth: false,
  load: false,
  errors: [],
};

// pure function=> (state, {type,payload})=>
const bookReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_BOOK:
      return { ...state, load: true };
    case FAIL_BOOK:
      return { ...state, errors: payload, load: false };
    case GET_ALL_BOOKS:
      return { ...state, books: payload.books, load: false };
    case GET_BOOK:
      return { ...state, book: payload.book, isAuth: true, load: false };
    case MY_BOOKS:
      return { ...state, myBooks: payload.results, isAuth: true, load: false };
    case DELETE_BOOK:
      return {
        ...state,
        myBooks: state.myBooks.filter((el) => el.id !== payload.book._id),
      };
    case REMOVE_BOOK:
      return {
        ...state,
        shelf: state.shelf.filter((el) => el.id !== payload.book._id),
      };
    case ADD_BOOK:
      return {
        ...state,

        shelf: [...state.shelf, payload.book],
        load: false,
      };
    case POST_BOOK:
      return { ...state, book: payload.book, load: false };
    case EDIT_BOOK:
      return { ...state, book: payload.book, load: false };
    case EMPTY_ERRORS:
      return { ...state, errors: [] };
    default:
      return state;
  }
};

export default bookReducer;
