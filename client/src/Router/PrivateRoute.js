import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem("token");
  const isAuth = useSelector((state) => state.userReducer.isAuth);
  // const load = useSelector((state) => state.userReducer.load);
  if (!token && !isAuth) {
    return <Redirect to="/login" />;
  }

  return <Route component={Component} {...rest} />;
};

export default PrivateRoute;
