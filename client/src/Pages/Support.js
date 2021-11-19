import * as React from "react";

import { useDispatch, useSelector } from "react-redux";
import { getAllTickets, editTicket } from "../JS/actions/tickets";
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

export default function Support() {
  //handle popup
  const [open, setOpen] = React.useState(false);
  const [ticket, setTicket] = React.useState({
    id: "",
    type: "",
    content: "",
    // date: "",
    // user_id: {},
    // reportedReview: {},
    reportedUserId: "",
    status: "",
  });
  // useEffect(() => {
  //   if (ticket.status === "open") {
  //     setClose(false);
  //   } else {
  //     setClose(true);
  //   }
  // }, [ticket])
  const handleOpen = (el) => {
    setOpen(true);
    setTicket(el);
  };
  const handleClose = () => setOpen(false);

  const tickets = useSelector((state) => state.ticketReducer.tickets);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getAllTickets());
    if (ticket.status === "open") {
      setClose(true);
    }
  }, [dispatch, ticket]);

  //editing
  const [close, setClose] = React.useState(false);

  const handleStatus = () => {
    let confirm = window.confirm("are you sure you want to block this user?");
    if (confirm) {
      if (ticket.status === "open") {
        dispatch(editTicket({ ...ticket, status: "closed" }));
      } else {
        dispatch(editTicket({ ...ticket, status: "open" }));
      }
    }
    setClose(!close);
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <div className="table-responsive">
        <table className="table table-hover">
          <thead style={{ backgroundColor: "#c6c8c9", width: "30px" }}>
            <td>N</td>
            <td>ID</td>
            <td>Email</td>
            <td>Type</td>
            <td>Status</td>
            {/* <td>Date</td> */}
            <td>check</td>
          </thead>
          <tbody>
            {tickets &&
              tickets.length &&
              tickets.map((el, i) => (
                <tr key={i}>
                  <td className="number text-center">{i}</td>
                  <td className="product">{el._id}</td>
                  <td className="product">
                    <strong>{el.user_id.email}</strong>
                  </td>
                  <td className="text-right">{el.type}</td>
                  <td className="text-right">{el.status}</td>
                  {/* <td className="text-right">{el.date}</td> */}

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
                                    ticket Information
                                  </h5>
                                </div>
                                <div className="modal-body">
                                  <div className="row g-0">
                                    <div className="col-md-10 border-right">
                                      <div className="status p-3">
                                        <table className="table table-borderless">
                                          <tbody>
                                            <tr>
                                              <td className="col-md-2">
                                                <div className="profile">
                                                  {" "}
                                                  <img
                                                    src={
                                                      ticket &&
                                                      ticket.user_id &&
                                                      ticket.user_id
                                                        .profile_picture
                                                        ? ticket._id
                                                            .profile_picture
                                                        : "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
                                                    }
                                                    width={70}
                                                    className="rounded-circle img-thumbnail"
                                                    alt={ticket.first_name}
                                                  />
                                                </div>
                                              </td>
                                              <td className="col-md-2">
                                                <div className="d-flex flex-column">
                                                  {" "}
                                                  <span className="heading d-block">
                                                    Name
                                                  </span>{" "}
                                                  <span className="subheadings">
                                                    {`${
                                                      ticket &&
                                                      ticket.user_id &&
                                                      ticket.user_id.first_name
                                                    } ${
                                                      ticket &&
                                                      ticket.user_id &&
                                                      ticket.user_id.last_name
                                                    }`}
                                                  </span>{" "}
                                                </div>
                                              </td>
                                              <td className="col-md-2">
                                                <div className="d-flex flex-column">
                                                  {" "}
                                                  <span className="heading d-block">
                                                    Email
                                                  </span>{" "}
                                                  <span className="subheadings">
                                                    {ticket &&
                                                      ticket.user_id &&
                                                      ticket.user_id.email}
                                                  </span>{" "}
                                                </div>
                                              </td>
                                              <td className="col-md-2">
                                                <div className="d-flex flex-column">
                                                  {" "}
                                                  <span className="heading d-block">
                                                    Type
                                                  </span>{" "}
                                                  <span className="subheadings">
                                                    {/* <i className="dots" />{" "} */}
                                                    {ticket && ticket.type}
                                                  </span>{" "}
                                                </div>
                                              </td>
                                            </tr>
                                            <tr>
                                              <td className="col-md-2">
                                                <div className="d-flex flex-column">
                                                  {" "}
                                                  <span className="heading d-block">
                                                    Date
                                                  </span>{" "}
                                                  <span className="subheadings">
                                                    {/* <i className="dots" />{" "} */}
                                                    {ticket.date}
                                                  </span>{" "}
                                                </div>
                                              </td>
                                              <td className="col-md-2">
                                                <div className="d-flex flex-column">
                                                  {" "}
                                                  <span className="heading d-block">
                                                    Status
                                                  </span>{" "}
                                                  <span className="subheadings">
                                                    {/* <i className="dots" />{" "} */}
                                                    {ticket.status}
                                                  </span>{" "}
                                                </div>
                                              </td>
                                              <td className="col-md-2">
                                                <div className="d-flex flex-column">
                                                  {" "}
                                                  <span className="heading d-block">
                                                    Topic
                                                  </span>{" "}
                                                  <span className="subheadings">
                                                    {/* <i className="dots" />{" "} */}
                                                    {ticket.topic}
                                                  </span>{" "}
                                                </div>
                                              </td>
                                            </tr>
                                            <tr className="col-md-8">
                                              <div className="d-flex flex-column">
                                                {" "}
                                                <span className="heading d-block">
                                                  Content
                                                </span>{" "}
                                                <span className="subheadings">
                                                  {/* <i className="dots" />{" "} */}
                                                  {ticket.content}
                                                </span>{" "}
                                              </div>
                                            </tr>
                                            <tr>
                                              <td>
                                                <div className="d-flex flex-column">
                                                  {" "}
                                                  <span className="heading d-block">
                                                    Reported Review
                                                  </span>{" "}
                                                  <span className="subheadings">
                                                    {/* <i className="dots" />{" "} */}
                                                    {ticket.reportedReview &&
                                                      "-"}
                                                  </span>{" "}
                                                </div>
                                              </td>
                                              <td>
                                                <div className="d-flex flex-column">
                                                  {" "}
                                                  <span className="heading d-block">
                                                    Reported User
                                                  </span>{" "}
                                                  <span className="subheadings">
                                                    {/* <i className="dots" />{" "} */}
                                                    {ticket.reportedUserId &&
                                                      "-"}
                                                  </span>{" "}
                                                </div>
                                              </td>
                                              <td>
                                                <button
                                                  className="btn btn-primary"
                                                  onClick={() => handleStatus()}
                                                >
                                                  {close ? "close" : "open"}
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
