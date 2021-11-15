import React from "react";
import { useSelector } from "react-redux";
import Accountsetting from "../../Components/account/Accountsetting";

const Account = () => {
  const user = useSelector((state) => state.userReducer.user);
  const loadUser = useSelector((state) => state.userReducer.user);
  return (
    <div>
      {loadUser ? (
        <div>
          <Accountsetting />
        </div>
      ) : (
        <h3>loading</h3>
      )}
    </div>
  );
};

export default Account;
