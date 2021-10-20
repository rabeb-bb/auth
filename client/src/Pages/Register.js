import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Notification from "../Components/Notification";
import { register } from "../JS/actions/users";
import "./Register.css";

const Register = ({ history }) => {
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    password: "",
    password2: "",
    email: "",
    date_of_birth: "",
    role: "",
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
        <label for="first_name">First name</label>
        <input
          className="text-input"
          name="first_name"
          type="string"
          placeholder="Enter your first name"
          required
          onChange={(e) => handleUser(e)}
          value={user.first_name}
        />
        <label for="last_name">Last name</label>
        <input
          className="text-input"
          name="last_name"
          type="string"
          placeholder="Enter your last name"
          required
          onChange={(e) => handleUser(e)}
          value={user.last_name}
        />
        <label>Date of birth</label>
        <input
          className="text-input"
          name="date_of_birth"
          type="date"
          placeholder="Enter your date of birth"
          onChange={(e) => handleUser(e)}
          value={user.date_of_birth}
        />
        <label>Email</label>
        <input
          className="text-input"
          name="email"
          type="email"
          placeholder="Enter your email"
          required
          onChange={(e) => handleUser(e)}
          value={user.email}
        />
        <label>Password</label>
        <input
          className="text-input"
          label="Password"
          name="password"
          type={show ? "text" : "password"}
          placeholder="Enter your password"
          onChange={(e) => handleUser(e)}
          value={user.password}
        />
        <span>
          <input type="checkbox" onClick={() => setShow(!show)} />
          <span>Show Password</span>
        </span>
        <label>Confirm Password</label>
        <input
          className="text-input"
          label="Confirm Password"
          name="password2"
          type={show2 ? "text" : "password"}
          placeholder="ReEnter your password"
          onChange={(e) => handleUser(e)}
          value={user.password2}
        />
        <span>
          <input type="checkbox" onClick={() => setShow2(!show2)} />
          <span>Show Password</span>
        </span>
        <label>Register as</label>
        <select name="role" onChange={(e) => handleUser(e)}>
          <option value="reader">Reader</option>
          <option value="author">Author</option>
        </select>
        <input
          type="submit"
          className="submit-btn"
          onClick={(e) => handleRegister(e)}
        />
      </form>
      <p>you already have an account?</p>
      <p>
        <Link to="/login">
          <span style={{ textDecorationStyle: "solid" }}>sign in here</span>
        </Link>
      </p>
    </div>
  );
};

export default Register;
