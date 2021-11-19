import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem("token");
  const isAuth = useSelector((state) => state.userReducer.isAuth);
  const user = useSelector((state) => state.userReducer.user);
  if (!token && !isAuth) {
    return <Redirect to="/login" />;
  }
  if (user.status === "blocked") {
    return <Redirect to="/blocked" />;
  }

  return <Route component={Component} {...rest} />;
};

export default PrivateRoute;
