import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editAccount } from "../../JS/actions/users";
import { useHistory } from "react-router-dom";

const Accountsetting = () => {
  const user = useSelector((state) => state.userReducer.user);
  const [userEdit, setUserEdit] = useState({ ...user });
  // console.log(userEdit);
  // const [previewSource, setPreviewSource] = useState({});
  const dispatch = useDispatch();
  let history = useHistory();
  const handleEdit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("first_name", userEdit.first_name);
    data.append("last_name", userEdit.last_name);
    data.append("date_of_birth", userEdit.date_of_birth);
    // data.append("password", userEdit.password);
    data.append("aboud_me", userEdit.aboud_me);
    data.append("profile_picture", userEdit.profile_picture);
    dispatch(editAccount(data));
    history.push("/profile");
  };

  const handleChange = (e) => {
    setUserEdit({ ...userEdit, [e.target.name]: e.target.value });
  };
  const handleImage = (e) => {
    setUserEdit({ ...userEdit, profile_picture: e.target.files[0] });
  };

  return (
    <div style={{ margin: "5% 10%" }}>
      <div className="container rounded bg-white mt-5 mb-5">
        <div className="row">
          <div className="col-md-4 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
              <img
                className="rounded-circle mt-5"
                width="150px"
                src={
                  user.profile_picture
                    ? user.profile_picture
                    : "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
                }
              />
              <span className="font-weight-bold">
                {user.first_name} {user.last_name}
              </span>
              <span className="text-black-50">{user.email}</span>
              <span> </span>
            </div>
          </div>
          <div className="col-md-7 border-right">
            <form
              onSubmit={handleEdit}
              encType="multipart/form-data"
              className="p-3 py-5"
            >
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-right">Profile Settings</h4>
              </div>
              <div className="row mt-2">
                <div className="col-md-6">
                  <label className="labels">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="first name"
                    name="first_name"
                    value={userEdit.first_name}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="col-md-6">
                  <label className="labels">Surname</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="surname"
                    name="last_name"
                    value={userEdit.last_name}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-12">
                  <label className="labels">Upload a new profile photo</label>
                  <input
                    accept=".png, .jpg, .jpeg"
                    name="profile_picture"
                    type="file"
                    className="form-control"
                    onChange={handleImage}
                  />
                  {/* <button onClick={(e) => handleUpload(e)}>save image</button> */}
                </div>
                <div className="col-md-12">
                  <label className="labels">About me</label>
                  <textarea
                    name="about_me"
                    type="text"
                    className="form-control"
                    placeholder="enter bio"
                    value={userEdit.about_me}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="col-md-12">
                  <label className="labels">Date of birth</label>
                  <input
                    name="date_of_birth"
                    type="date"
                    className="form-control"
                    placeholder="enter address line 2"
                    value={userEdit.date_of_birth}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                {/* <div className="col-md-12">
                  <label className="labels">Change password</label>
                  <input
                    name="password"
                    type="password"
                    className="form-control"
                    placeholder="enter new password"
                    value={userEdit.password}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="col-md-12">
                  <label className="labels">Confirm new password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="reenter new password"
                  />
                </div> */}
              </div>
              <div className="mt-5 text-center">
                <input
                  className="btn btn-primary profile-button"
                  type="submit"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accountsetting;
