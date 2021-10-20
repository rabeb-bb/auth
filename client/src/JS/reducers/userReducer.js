// import types

const {
  REGISTER_USER,
  LOGIN_USER,
  FAIL_USER,
  LOAD_USER,
  CURRENT_USER,
  LOGOUT_USER,
  EMPTY_ERRORS,
  GET_ALL_USERS,
} = require("../constants/action-types");

// initialstate
const initialState = {
  users: [],
  user: {},
  errors: [],
  isAuth: false,
  load: false,
};

// pure function=> (state, {type,payload})=>
const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_USER:
      return { ...state, load: true };
    //   payload:{token , msg , user }
    case REGISTER_USER:
      localStorage.setItem("token", payload.token);
      return { ...state, user: payload.user, load: false, isAuth: true };
    //   payload: {token , msg , user}
    case LOGIN_USER:
      localStorage.setItem("token", payload.token);
      return { ...state, user: payload.user, load: false, isAuth: true };
    case FAIL_USER:
      return { ...state, errors: payload, load: false };
    case CURRENT_USER:
      return { ...state, user: payload.user, isAuth: true, load: false };
    case GET_ALL_USERS:
      return { ...state, users: payload.users, isAuth: true, load: false };
    case LOGOUT_USER:
      localStorage.removeItem("token");
      return { ...state, user: {}, isAuth: false };
    case "EMPTY_ERRORS":
      return { ...state, errors: [] };
    default:
      return state;
  }
};

export default userReducer;
