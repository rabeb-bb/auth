import axios from "axios";
import {
  LOAD_USER,
  REGISTER_USER,
  FAIL_USER,
  LOGIN_USER,
  CURRENT_USER,
  LOGOUT_USER,
  GET_ALL_USERS,
} from "../constants/action-types";

export const register = (user, history) => async (dispatch) => {
  dispatch({ type: LOAD_USER });
  try {
    let { data } = await axios.post("/api/user/register", user);
    //success action
    dispatch({ type: REGISTER_USER, payload: data }); //{user,token,msg}
    history.push("/profile");
  } catch (error) {
    // fail
    dispatch({ type: FAIL_USER, payload: error.response.data.errors });
  }
};

export const login = (user, history) => async (dispatch) => {
  dispatch({ type: LOAD_USER });

  try {
    let { data } = await axios.post("/api/user/login", user);
    dispatch({ type: LOGIN_USER, payload: data }); //{msg,token,user}
    if (data.user.role === "admin") {
      history.push("/admin");
    } else {
      history.push("/profile");
    }
  } catch (error) {
    dispatch({ type: FAIL_USER, payload: error.response.data.errors });
  }
};

export const current = () => async (dispatch) => {
  const config = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };
  dispatch({ type: LOAD_USER });
  try {
    let result = await axios.get("/api/user/current", config);
    dispatch({ type: CURRENT_USER, payload: result.data }); //{msg , user}
  } catch (error) {
    dispatch({ type: FAIL_USER, payload: error.response.data });
  }
};

// logout
export const logout = () => {
  return {
    type: LOGOUT_USER,
  };
};

//clear erros list
export const emptyErrors = () => {
  return {
    type: "EMPTY_ERRORS",
  };
};

//get all users for admin only
export const getAllUsers = () => async (dispatch) => {
  dispatch({ type: LOAD_USER });
  try {
    let result = await axios.get("/api/admin");

    dispatch({ type: GET_ALL_USERS, payload: result.data });
  } catch (error) {
    dispatch({ type: FAIL_USER, payload: error.response.data });
  }
};
