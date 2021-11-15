import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import PHeader from "../Components/Profile/PHeader";

const Profile = () => {
  const user = useSelector((state) => state.userReducer.user);
  const loadUser = useSelector((state) => state.userReducer.user);
  return (
    <div>
      {loadUser ? (
        <div>
          <PHeader user={user} />
        </div>
      ) : (
        <h3>loading</h3>
      )}
    </div>
  );
};

export default Profile;
