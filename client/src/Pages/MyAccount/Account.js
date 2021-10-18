import React from "react";
import { useSelector } from "react-redux";

const Account = () => {
  const user = useSelector((state) => state.userReducer.user);
  const loadUser = useSelector((state) => state.userReducer.user);
  return (
    <div>
      {loadUser ? (
        <div>
          <h2>Account</h2>
          <h4>{user.first_name}</h4>
        </div>
      ) : (
        <h3>loading</h3>
      )}
    </div>
  );
};

export default Account;
