import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import UserCard from "../../Components/Usercard/UserCard";
// import { getAllUsers } from "../../JS/actions/users";
// import Sidebar from "../../Components/Sidebar";
// import Users from "../../Components/Users";

const Admin = () => {
  // const users = useSelector((state) => state.userReducer.users);
  const user = useSelector((state) => state.userReducer.user);
  // const loadUser = useSelector((state) => state.userReducer.user);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getAllUsers());
  // }, [dispatch]);
  return (
    <div style={{ display: "flex" }}>
      {/* <Sidebar /> */}

      <div>
        <h2>Admin</h2>
        <p>
          {user.first_name} has a role of {user.role}
        </p>
        <div>{/* <Users /> */}</div>
      </div>
    </div>
  );
};

export default Admin;
