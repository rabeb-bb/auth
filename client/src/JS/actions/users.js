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
  EDIT_USER_ACCOUNT,
  // LOGIN_ADMIN,
  CURRENT_ADMIN,
  GET_AUTHOR,
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
    // console.log(result);
    dispatch({ type: GET_ALL_USERS, payload: result.data });
  } catch (error) {
    console.log(error);
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
export const editUser = (user) => async (dispatch) => {
  const config = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };
  try {
    let result = await axios.put(`/api/admin/update/${user._id}`, user, config);
    // console.log(result);
    dispatch({ type: EDIT_USER, payload: result.data });
    dispatch(getAllUsers());
  } catch (error) {
    dispatch({ type: FAIL_USER, payload: error.response.data });
  }
};

//get author
export const getAuthor = (author_id) => async (dispatch) => {
  try {
    let result = await axios.get(`/api/user/author/${author_id}`);
    dispatch({ type: GET_AUTHOR, payload: result.data });
  } catch (error) {
    dispatch({ type: FAIL_USER, payload: error.response.data });
  }
};

//edit your info
export const editAccount = (data, history) => async (dispatch) => {
  const config = {
    headers: {
      authorization: localStorage.getItem("token"),
      "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
    },
  };
  const user_id = localStorage.getItem("userID");
  try {
    let result = await axios.put(`/api/user/edit/${user_id}`, data, config);
    // console.log(result);

    dispatch({ type: EDIT_USER_ACCOUNT, payload: result.data });
    // history.go("/profile");
  } catch (error) {
    console.log(error);
    dispatch({ type: FAIL_USER, payload: error.response.data });
  }
};
export const searchUsers = (author) => async (dispatch) => {
  dispatch({ type: LOAD_USER });
  try {
    let result = await axios.post(`/api/user/authors/search`, author);
    console.log(result);
    dispatch({ type: GET_ALL_USERS, payload: result.data });
  } catch (error) {
    console.log(error.response);
    dispatch({ type: FAIL_USER, payload: error.response });
  }
};
