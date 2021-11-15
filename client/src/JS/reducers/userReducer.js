// import types

const {
  REGISTER_USER,
  LOGIN_USER,
  FAIL_USER,
  LOAD_USER,
  // LOGIN_ADMIN,
  CURRENT_USER,
  LOGOUT_USER,
  EMPTY_ERRORS,
  GET_ALL_USERS,
  GET_USER,
  GET_AUTHOR,
  DELETE_USER,
  EDIT_USER,
  CURRENT_ADMIN,
  EDIT_USER_ACCOUNT,
} = require("../constants/action-types");

// initialstate
const initialState = {
  users: [],
  user: {},
  client: {},
  author: {},
  admin: false,
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
      localStorage.setItem("userID", payload.user._id);
      return { ...state, user: payload.user, load: false, isAuth: true };
    //   payload: {token , msg , user}
    case LOGIN_USER:
      localStorage.setItem("token", payload.token);
      localStorage.setItem("userID", payload.user._id);
      return { ...state, user: payload.user, load: false, isAuth: true };
    case FAIL_USER:
      return { ...state, errors: payload, load: false };
    case CURRENT_USER:
      return { ...state, user: payload.user, isAuth: true, load: false };
    case CURRENT_ADMIN:
      return {
        ...state,
        user: payload.user,
        isAuth: true,
        load: false,
        admin: true,
      };
    case GET_ALL_USERS:
      return { ...state, users: payload.users, isAuth: true, load: false };
    case GET_USER:
      localStorage.setItem("user", payload.user);
      return { ...state, client: payload.user, isAuth: true, load: false };
    case GET_AUTHOR:
      localStorage.setItem("user", payload.user);
      return { ...state, author: payload.user, load: false };

    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter((el) => el.id !== payload.user._id),
      };
    case EDIT_USER:
      return { ...state, client: payload.user, load: false };
    case EDIT_USER_ACCOUNT:
      return { ...state, user: payload.user, isAuth: true, load: false };
    case LOGOUT_USER:
      localStorage.removeItem("token");
      localStorage.removeItem("userID");
      return { ...state, user: {}, isAuth: false, admin: false };
    case EMPTY_ERRORS:
      return { ...state, errors: [] };
    default:
      return state;
  }
};

export default userReducer;
