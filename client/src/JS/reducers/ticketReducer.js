// import types

import { EMPTY_ERRORS } from "../constants/action-types";

const {
  GET_ALL_TICKETS,
  GET_TICKET,
  DELETE_TICKET,
  EDIT_TICKET,
  POST_TICKET,
  LOAD_TICKET,
  FAIL_TICKET,
} = require("../constants/ticket-types");

// initialstate
const initialState = {
  tickets: [],
  ticket: {},

  errors: [],

  load: false,
};

// pure function=> (state, {type,payload})=>
const ticketReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_TICKET:
      return { ...state, load: true };
    case FAIL_TICKET:
      return { ...state, errors: payload, load: false };
    case GET_ALL_TICKETS:
      return { ...state, tickets: payload.tickets, load: false };
    case GET_TICKET:
      return { ...state, ticket: payload.ticket, load: false };

    case DELETE_TICKET:
      return {
        ...state,
        tickets: state.tickets.filter((el) => el.id !== payload.ticket._id),
      };
    case EDIT_TICKET:
      return {
        ...state,
        ticket: payload.ticket,

        load: false,
      };
    case POST_Ticket:
      return {
        ...state,
        ticket: payload.ticket,
        tickets: [...state.tickets, payload.ticket],
        load: false,
      };
    case EMPTY_ERRORS:
      return { ...state, errors: [] };
    default:
      return state;
  }
};

export default ticketReducer;
