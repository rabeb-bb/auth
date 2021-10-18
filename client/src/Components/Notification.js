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
      {" "}
      {toast.error(error.msg)}
      <ToastContainer />
    </div>
    // )}
  );
};

export default Notification;
