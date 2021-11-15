import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editAccount } from "../../JS/actions/users";

const Accountsetting = ({ user }) => {
  const [userEdit, setUserEdit] = useState(user);
  const [previewSource, setPreviewSource] = useState("");

  const dispatch = useDispatch();
  const handleEdit = (e) => {
    e.preventDefault();
    dispatch(editAccount(user._id, userEdit));
  };

  const handleChange = (e) => {
    if (e.target.name === "profile_picture") {
      const reader = new FileReader();
      if (e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0]);
        reader.onloadend = () => {
          setPreviewSource(reader.result);
        };
        console.log(previewSource);
      }
      setUserEdit({
        ...userEdit,
        profile_picture: previewSource,
      });
    } else {
      setUserEdit({ ...userEdit, [e.target.name]: e.target.value });
    }
  };

  return (
    <div>
      <div className="container rounded bg-white mt-5 mb-5">
        <div className="row">
          <div className="col-md-3 border-right">
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
          <div className="col-md-5 border-right">
            <div className="p-3 py-5">
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
                    name="profile_picture"
                    type="file"
                    className="form-control"
                    // onChange={(e) => handleChange(e)}
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
                <div className="col-md-12">
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
                </div>
              </div>
              <div className="mt-5 text-center">
                <button
                  className="btn btn-primary profile-button"
                  type="button"
                  onClick={(e) => handleEdit(e)}
                >
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accountsetting;
