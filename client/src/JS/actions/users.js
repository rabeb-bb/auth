import axios from "axios";
import {
  LOAD_USER,
  REGISTER_USER,
  FAIL_USER,
  LOGIN_USER,
  CURRENT_USER,
  LOGOUT_USER,
  GET_ALL_USERS,
  DELETE_USER,
  GET_USER,
  EDIT_USER,
  LOGIN_ADMIN,
  CURRENT_ADMIN,
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
    let { data } = await axios.get("/api/user/current", config);
    if (data.user.role === "admin") {
      dispatch({ type: CURRENT_ADMIN, payload: data }); //{msg , user}
    } else {
      dispatch({ type: CURRENT_USER, payload: data }); //{msg , user}
    }
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

// get all users for admin only
export const getAllUsers = () => async (dispatch) => {
  dispatch({ type: LOAD_USER });
  const config = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };
  try {
    let result = await axios.get("/api/admin", config);
    console.log(result);
    dispatch({ type: GET_ALL_USERS, payload: result.data });
  } catch (error) {
    dispatch({ type: FAIL_USER, payload: error.response.data });
  }
};
// get user for admin only
export const getUser =
  ({ user }) =>
  async (dispatch) => {
    dispatch({ type: LOAD_USER });
    const config = {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    };
    try {
      let result = await axios.get(`/api/admin/${user._id}`, config);
      console.log(result.data);
      dispatch({ type: GET_USER, payload: result.data });
    } catch (error) {
      console.log(error.response.data);
      dispatch({ type: FAIL_USER, payload: error.response.data });
    }
  };
// get user for admin only
export const deleteUser =
  ({ user }) =>
  async (dispatch) => {
    const config = {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    };
    try {
      let result = await axios.delete(`/api/admin/delete/${user._id}`, config);
      console.log(result);
      dispatch({ type: DELETE_USER, payload: result.data });
      dispatch(getAllUsers());
    } catch (error) {
      dispatch({ type: FAIL_USER, payload: error.response.data });
    }
  };
//Edit user
export const editUser = (id, user) => async (dispatch) => {
  const config = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };
  try {
    let result = await axios.put(`/api/admin/update/${id}`, user);
    console.log(result);
    dispatch({ type: EDIT_USER, payload: result.data });
  } catch (error) {
    dispatch({ type: FAIL_USER, payload: error.response.data });
  }
};
