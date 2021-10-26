import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../JS/actions/users";
import UserCard from "./Usercard/UserCard";

const Users = () => {
  const users = useSelector((state) => state.userReducer.users);
  const user = useSelector((state) => state.userReducer.user);
  const loadUser = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);
  return (
    <div>
      <h3>All Users</h3>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        {users && users.map((el) => <UserCard user={el} key={el._id} />)}
      </div>
    </div>
  );
};

export default Users;
