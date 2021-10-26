import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem("token");
  const isAuth = useSelector((state) => state.userReducer.isAuth);
  const load = useSelector((state) => state.userReducer.load);
  const admin = useSelector((state) => state.userReducer.admin);
  if (token && isAuth && admin) {
    return <Route component={Component} {...rest} />;
  }
  return <Redirect to="/auth" />;
};

export default PrivateRoute;
