import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Notification from "../../Components/Notification";
import { emptyErrors, login } from "../../JS/actions/users";
import "./Login.css";

const Login = ({ history }) => {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState({});
  const errors = useSelector((state) => state.userReducer.errors);
  const dispatch = useDispatch();
  const handleLogin = (e) => {
    dispatch(login(user, history));

    e.preventDefault();
  };
  const handleUser = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  // useEffect(() => {
  //   dispatch(emptyErrors());
  // }, [errors, dispatch]);

  return (
    <div>
      {errors && errors.map((el, i) => <Notification error={el} key={i} />)}
      <h2>Login</h2>
      <p>you don't have an account?</p>
      <p>
        <Link to="/register">
          <span style={{ textDecorationStyle: "solid" }}>sign up for free</span>
        </Link>
      </p>

      <form className="login-form">
        <input
          label="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          required
          onChange={(e) => handleUser(e)}
          value={user.email}
        />
        <input
          label="Password"
          name="password"
          type={show ? "text" : "password"}
          placeholder="Enter your password"
          onChange={(e) => handleUser(e)}
          value={user.password}
        />
        <input type="checkbox" onClick={() => setShow(!show)} />
        Show Password
        <input
          type="submit"
          className="submit-btn"
          onClick={(e) => handleLogin(e)}
        />
      </form>
    </div>
  );
};

export default Login;
