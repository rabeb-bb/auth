import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../Components/Notification";
import { register } from "../JS/actions/users";
import "./Register.css";

const Register = ({ history }) => {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    password: "",
    password2: "",
    email: "",
    date_of_birth: "",
  });
  const errors = useSelector((state) => state.userReducer.errors);
  const dispatch = useDispatch();
  const handleRegister = (e) => {
    dispatch(register(user, history));
    e.preventDefault();
    setUser({
      first_name: "",
      last_name: "",
      password: "",
      password2: "",
      email: "",
      date_of_birth: "",
    });
  };
  const handleUser = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div>
      {errors && errors.map((el) => <Notification error={el} />)}

      <h2>Create an account</h2>
      <form className="register-form">
        <input
          label="First name"
          name="first_name"
          type="string"
          placeholder="Enter your first name"
          required
          onChange={(e) => handleUser(e)}
          value={user.first_name}
        />
        <input
          label="Last name"
          name="last_name"
          type="string"
          placeholder="Enter your last name"
          required
          onChange={(e) => handleUser(e)}
          value={user.last_name}
        />
        <input
          label="Date of birth"
          name="date_of_birth"
          type="date"
          placeholder="Enter your date of birth"
          onChange={(e) => handleUser(e)}
          value={user.date_of_birth}
        />
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
          label="Confirm Password"
          name="password2"
          type={show ? "text" : "password"}
          placeholder="ReEnter your password"
          onChange={(e) => handleUser(e)}
          value={user.password2}
        />
        <input type="checkbox" onClick={() => setShow(!show)} />
        Show Password
        <input
          type="submit"
          className="submit-btn"
          onClick={(e) => handleRegister(e)}
        />
      </form>
    </div>
  );
};

export default Register;
