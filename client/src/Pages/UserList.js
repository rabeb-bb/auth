import * as React from "react";

import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, editUser } from "../JS/actions/users";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 10,
  p: "1 1",
};

export default function UsersList() {
  //handle popup
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = React.useState({
    memberSince: "",
    id: "",
    email: "",
    first_name: "",
    last_name: "",
    role: "",
    status: "",
  });
  //editing
  const [block, setBlock] = React.useState(false);
  const handleOpen = (el) => {
    setOpen(true);
    setUser(el);
  };
  const handleClose = () => setOpen(false);

  const users = useSelector((state) => state.userReducer.users);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getAllUsers());
    if (user.status === "blocked") {
      setBlock(false);
    } else {
      setBlock(true);
    }
  }, [dispatch, user]);

  const handleRole = (e) => {
    // console.log(user);
    dispatch(editUser({ ...user, role: e.target.value }));
  };
  const handleStatus = () => {
    let confirm = window.confirm("are you sure you want to block this user?");
    if (confirm) {
      if (block) {
        // console.log(`this the value of block: ${block}`);
        dispatch(editUser({ ...user, status: "blocked" }));
      } else {
        dispatch(editUser({ ...user, status: "active" }));
      }
    }
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <div className="table-responsive">
        <table className="table table-hover">
          <thead style={{ backgroundColor: "#c6c8c9", width: "30px" }}>
            <td>N</td>
            <td>ID</td>
            <td>Email</td>
            <td>Role</td>
            <td>Status</td>
            <td>Edit</td>
          </thead>
          <tbody>
            {users &&
              users.map((el, i) => (
                <tr key={i}>
                  <td className="number text-center">{i}</td>
                  <td className="product">{el._id}</td>
                  <td className="product">
                    <strong>{el.email}</strong>
                  </td>
                  <td className="text-right">{el.role}</td>
                  <td className="text-right">{el.status}</td>
                  {/* <td className="text-right">{el.memberSince}</td> */}

                  <td className="text-right">
                    <IconButton
                      aria-label="edit"
                      onClick={() => handleOpen(el)}
                    >
                      <EditIcon />
                    </IconButton>

                    <div>
                      <Modal
                        open={open}
                        onClose={() => handleClose()}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box sx={style}>
                          <div>
                            <div className="modal-dialog modal-lg">
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h5
                                    className="modal-title"
                                    id="exampleModalLabel"
                                  >
                                    User Information
                                  </h5>
                                </div>
                                <div className="modal-body">
                                  <div className="row g-0">
                                    <div className="col-md-10 border-right">
                                      <div className="status p-3">
                                        <table className="table table-borderless">
                                          <tbody>
                                            <tr>
                                              <td className="col-md-4">
                                                <div className="profile">
                                                  {" "}
                                                  <img
                                                    src={
                                                      user.profile_picture
                                                        ? user.profile_picture
                                                        : "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
                                                    }
                                                    width={70}
                                                    className="rounded-circle img-thumbnail"
                                                    alt={user.first_name}
                                                  />
                                                </div>
                                              </td>
                                              <td className="col-md-4">
                                                <div className="d-flex flex-column">
                                                  {" "}
                                                  <span className="heading d-block">
                                                    Name
                                                  </span>{" "}
                                                  <span className="subheadings">
                                                    {`${user.first_name} ${user.last_name}`}
                                                  </span>{" "}
                                                </div>
                                              </td>
                                              <td className="col-md-4">
                                                <div className="d-flex flex-column">
                                                  {" "}
                                                  <span className="heading d-block">
                                                    Birth Date
                                                  </span>{" "}
                                                  <span className="subheadings">
                                                    {user.date_of_birth}
                                                  </span>{" "}
                                                </div>
                                              </td>
                                            </tr>
                                            <tr>
                                              <td className="col-md-4">
                                                <div className="d-flex flex-column">
                                                  {" "}
                                                  <span className="heading d-block">
                                                    Status
                                                  </span>{" "}
                                                  <span className="subheadings">
                                                    {/* <i className="dots" />{" "} */}
                                                    {user.status}
                                                  </span>{" "}
                                                </div>
                                              </td>
                                              <td className="col-md-4">
                                                <div className="d-flex flex-column">
                                                  {" "}
                                                  <span className="heading d-block">
                                                    Role
                                                  </span>{" "}
                                                  <span className="subheadings">
                                                    {/* <i className="dots" />{" "} */}
                                                    {user.role}
                                                  </span>{" "}
                                                </div>
                                              </td>
                                            </tr>
                                            <tr>
                                              <td className="col-md-4">
                                                <div className="d-flex flex-column">
                                                  {" "}
                                                  <span className="heading d-block">
                                                    Change User Role:
                                                  </span>{" "}
                                                  <select
                                                    className="form-control "
                                                    // style={{ width: "100%" }}
                                                    onChange={(e) =>
                                                      handleRole(e)
                                                    }
                                                  >
                                                    <option>choose role</option>
                                                    <option value="reader">
                                                      reader
                                                    </option>
                                                    <option value="author">
                                                      author
                                                    </option>
                                                    <option value="admin">
                                                      admin
                                                    </option>
                                                  </select>
                                                </div>
                                              </td>

                                              <td>
                                                <button
                                                  className="btn btn-primary"
                                                  onClick={() => handleStatus()}
                                                >
                                                  {block ? "block" : "unblock"}
                                                </button>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Box>
                      </Modal>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {/* END TABLE RESULT */}
      {/* BEGIN PAGINATION */}
      <ul className="pagination">
        {/* <li
          className={page <= 0 ? "page-item disabled" : "page-item"}
          onClick={setPage(page - 1)}
        >
          «
        </li>
        <li className="active page-item">{page}</li>
        <li className="active page-item" onClick={setPage(page + 1)}>
          »
        </li> */}
      </ul>
      {/* END PAGINATION */}

      {/* END RESULT */}
      {/* modal */}
    </div>
  );
}
