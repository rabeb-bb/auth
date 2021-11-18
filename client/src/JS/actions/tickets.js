import axios from "axios";
import {
  DELETE_TICKET,
  EDIT_TICKET,
  FAIL_TICKET,
  GET_ALL_TICKETS,
  POST_TICKET,
  GET_TICKET,
  LOAD_TICKET,
} from "../constants/ticket-types";

// get all Tickets
export const getAllTickets = (book_id) => async (dispatch) => {
  dispatch({ type: LOAD_TICKET });
  try {
    let result = await axios.get(`/api/support/all`);

    dispatch({ type: GET_ALL_TICKETS, payload: result.data });
  } catch (error) {
    console.log(error.response);
    dispatch({ type: FAIL_TICKET, payload: error.response.data });
  }
};
// get Ticket
export const getTicket = (_id) => async (dispatch) => {
  dispatch({ type: LOAD_TICKET });
  try {
    let result = await axios.get(`/api/support/ticket/${_id}`);
    console.log(result.data);
    dispatch({ type: GET_TICKET, payload: result.data });
  } catch (error) {
    console.log(error.response.data);
    dispatch({ type: FAIL_TICKET, payload: error.response.data });
  }
};
// get Ticket for author only
export const deleteTicket =
  ({ ticket }) =>
  async (dispatch) => {
    const config = {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    };
    try {
      let result = await axios.delete(
        `/api/support/author/delete/${ticket._id}`,
        config
      );
      console.log(result);
      dispatch({ type: DELETE_TICKET, payload: result.data });
      dispatch(getAllTickets());
    } catch (error) {
      dispatch({ type: FAIL_TICKET, payload: error.response.data });
    }
  };
//Edit Ticket
export const editTicket = (ticket) => async (dispatch) => {
  const config = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };
  try {
    let result = await axios.put(
      `/api/support/admin/update/${ticket._id}`,
      ticket,
      config
    );
    console.log(result);
    dispatch({ type: EDIT_TICKET, payload: result.data });
    dispatch(getAllTickets());
  } catch (error) {
    dispatch({ type: FAIL_TICKET, payload: error.response.data });
  }
};
//Edit Ticket
export const postTicket = (ticket) => async (dispatch) => {
  const config = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };
  try {
    let result = await axios.post(`/api/support/post`, ticket, config);
    console.log(result);
    dispatch({ type: POST_TICKET, payload: result.data });
  } catch (error) {
    dispatch({ type: FAIL_TICKET, payload: error.response.data });
  }
};
