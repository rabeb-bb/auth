import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../JS/actions/users";

const Admin = () => {
  const users = useSelector((state) => state.userReducer.users);
  const loadUser = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();
  //   useEffect(() => {
  //     dispatch(getAllUsers());
  //   }, [dispatch]);
  return (
    <div>
      <h2>Admin</h2>

      <div>{/* <h4>{users && users.map((el) => el.first_name)}</h4> */}</div>
    </div>
  );
};

export default Admin;
