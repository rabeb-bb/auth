import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { emptyErrors } from "../JS/actions/users";

toast.configure();
const Notification = ({ error }) => {
  const [show, setShow] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      setShow(false);
      dispatch(emptyErrors());
    }, 3000);
  }, [show, dispatch]);
  return (
    // {show? null : (
    <div>
      {/* {" "}
      {toast.error(error.msg)}
      <ToastContainer /> */}
      {/* {show && {toas.error(error.msg)}} */}
      {show &&
        toast.error(error.msg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })}
    </div>
    // )}
  );
};

export default Notification;
