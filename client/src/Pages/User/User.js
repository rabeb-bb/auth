import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { editUser, getUser } from "../../JS/actions/users";

const User = () => {
  const [edit, setEdit] = useState(false);
  const [user, setUser] = useState({});
  //   const errors = useSelector((state) => state.userReducer.errors);
  const client = useSelector((state) => state.userReducer.client);

  const dispatch = useDispatch();
  setUser(client);
  useEffect(() => {
    setUser(localStorage.getItem("user"));
    dispatch(getUser(user._id));
  }, []);
  const handleUser = (e) => {
    setUser({ ...client, [e.target.name]: e.target.value });
  };
  const handleEdit = (e) => {
    e.preventDefault();
    setEdit(!edit);
    dispatch(editUser(user._id, user));
  };
  return (
    <div>
      <p>
        {!edit ? (
          `Name: ${client.first_name} ${client.last_name}
     Email: ${client.email} 
     Role: ${client.role}`
        ) : (
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
            <label>Change Role</label>
            <select name="role" onChange={(e) => handleUser(e)}>
              <option value="reader">Reader</option>
              <option value="author">Author</option>
              <option value="author">Admin</option>
            </select>
            {/* <input
          type="submit"
          className="submit-btn"
          onClick={(e) => handleEdit(e)}
        /> */}
            <button className="submit-btn" onClick={(e) => handleEdit(e)}>
              {!edit ? "edit" : "save changes"}
            </button>
          </form>
        )}
      </p>
    </div>
  );
};

export default User;
