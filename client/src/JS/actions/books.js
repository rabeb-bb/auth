import axios from "axios";
import {
  DELETE_BOOK,
  EDIT_BOOK,
  FAIL_BOOK,
  GET_ALL_BOOKS,
  GET_BOOK,
  ADD_BOOK,
  LOAD_BOOK,
  MY_BOOKS,
  REMOVE_BOOK,
  POST_BOOK,
} from "../constants/book-types";
import { Redirect } from "react-router-dom";

// get all books
export const getAllBooks = () => async (dispatch) => {
  dispatch({ type: LOAD_BOOK });
  try {
    // let result = await axios.get(`/api/book/all?page=${1}&limit=${20}`);
    let result = await axios.get(`/api/book/all`);
    console.log(result);
    dispatch({ type: GET_ALL_BOOKS, payload: result.data });
  } catch (error) {
    console.log(error.response);
    dispatch({ type: FAIL_BOOK, payload: error.response });
  }
};
// search
export const searchBooks = (filters) => async (dispatch) => {
  dispatch({ type: LOAD_BOOK });
  try {
    // let result = await axios.get(`/api/book/all?page=${1}&limit=${20}`);
    let result = await axios.post(`/api/book/search`, filters);
    console.log(result);
    dispatch({ type: GET_ALL_BOOKS, payload: result.data });
  } catch (error) {
    console.log(error.response);
    dispatch({ type: FAIL_BOOK, payload: error.response });
  }
};
// get book
export const getBook = (_id) => async (dispatch) => {
  dispatch({ type: LOAD_BOOK });
  try {
    let result = await axios.get(`/api/book/book/${_id}`);
    console.log(result.data);
    dispatch({ type: GET_BOOK, payload: result.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: FAIL_BOOK, payload: error.response.data });
  }
};

// get author books
export const getAuthorBooks = (author_id) => async (dispatch) => {
  dispatch({ type: LOAD_BOOK });
  try {
    let result = await axios.get(`/api/book/author/${author_id}`);
    console.log(result.data);
    dispatch({ type: GET_ALL_BOOKS, payload: result.data });
  } catch (error) {
    console.log(error.response.data);
    dispatch({ type: FAIL_BOOK, payload: error.response.data });
  }
};
// get reader books
// export const getReaderBooks = (reader_id) => async (dispatch) => {
//   dispatch({ type: LOAD_BOOK });
//   try {
//     let result = await axios.get(`/api/book/author/${author_id}`);
//     console.log(result.data);
//     dispatch({ type: GET_ALL_BOOKS, payload: result.data });
//   } catch (error) {
//     console.log(error.response.data);
//     dispatch({ type: FAIL_BOOK, payload: error.response.data });
//   }
// };
// get book for author only
export const deleteBook = (id, history) => async (dispatch) => {
  const config = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };
  try {
    let result = await axios.delete(`/api/book/author/delete/${id}`, config);
    console.log(result);
    dispatch({ type: DELETE_BOOK, payload: result.book });
    // dispatch(getmyBooks());

    history.push("/profile");
  } catch (error) {
    console.log(error);
    // dispatch({ type: FAIL_BOOK, payload: error.response.data });
  }
};
//Edit book
export const editBook = (book, id) => async (dispatch) => {
  const config = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };
  try {
    let result = await axios.put(`/api/book/author/update/${id}`, book, config);
    console.log(result);
    dispatch({ type: EDIT_BOOK, payload: result.data });
    dispatch(getBook(id));
  } catch (error) {
    console.log(error);

    dispatch({ type: FAIL_BOOK, payload: error.response.data });
  }
};

//post book
export const postBook = (book, history) => async (dispatch) => {
  dispatch({ type: LOAD_BOOK });
  const config = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };
  try {
    let { data } = await axios.post(`/api/book/author/upload`, book, config);

    dispatch({ type: POST_BOOK, payload: data });
    history.push("/profile");
  } catch (error) {
    dispatch({ type: FAIL_BOOK, payload: error.response.data });
  }
};

//get my books: author
export const getmyBooks = () => async (dispatch) => {
  dispatch({ type: LOAD_BOOK });
  let _id = localStorage.getItem("userID");
  try {
    let result = await axios.get(`/api/book/author/${_id}`);
    console.log(result.data);
    dispatch({ type: MY_BOOKS, payload: result.data });
  } catch (error) {
    console.log(error.response.data);
    dispatch({ type: FAIL_BOOK, payload: error.response.data });
  }
};
//get my books: author
export const addBook = (book) => async (dispatch) => {
  dispatch({ type: LOAD_BOOK });
  console.log(book);
  const config = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };
  try {
    let result = await axios.put(
      `/api/book/user/add/${book._id}`,
      book,
      config
    );
    console.log(result.data);
    dispatch({ type: ADD_BOOK, payload: result.data });
  } catch (error) {
    console.log(error.response);
    dispatch({ type: FAIL_BOOK, payload: error.response.data });
  }
};
//get my books: author
export const removeBook = (book) => async (dispatch) => {
  dispatch({ type: LOAD_BOOK });

  try {
    let result = await axios.put(`/api/book/user/remove/${book._id}`, book);
    console.log(result.data);
    dispatch({ type: REMOVE_BOOK, payload: result.data });
  } catch (error) {
    console.log(error.response.data);
    dispatch({ type: FAIL_BOOK, payload: error.response.data });
  }
};
