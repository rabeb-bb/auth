import React, { useState } from "react";
import "./Footer.css";
import { useDispatch, useSelector } from "react-redux";
import { postTicket } from "../../JS/actions/tickets";

const Footer = () => {
  const user = useSelector((state) => state.userReducer.user);
  const [ticket, setTicket] = useState({
    type: "",
    content: "",
    date: Date.now,
    user_id: localStorage.getItem("userID"),

    status: "open",
  });
  const [other, setOther] = useState(false);
  const dispatch = useDispatch();
  const handleType = (e) => {
    e.target.value === "other"
      ? setOther(true)
      : setTicket({ ...ticket, [e.target.name]: e.target.value });
  };
  const handleChange = (e) => {
    setTicket({ ...ticket, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postTicket(ticket));
    setOther(false);
    setTicket({
      type: "",
      content: "",
      date: Date.now,

      status: "open",
    });
  };
  return (
    <footer className="footer-08" style={{ bottom: "0" }}>
      <div className="container-fluid px-lg-5">
        <div className="row">
          <div className="col-md-9 py-5">
            <div className="row">
              <div className="col-md-4 mb-md-0 mb-4">
                <h2 className="footer-heading">About us</h2>
                <p>
                  it was supposed to be the mother of all book websites. careful
                  what you think!
                </p>
                <ul className="ftco-footer-social p-0">
                  <li className="ftco-animate">
                    <a
                      href="#"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Twitter"
                    >
                      <span className="ion-logo-twitter" />
                    </a>
                  </li>
                  <li className="ftco-animate">
                    <a
                      href="#"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Facebook"
                    >
                      <span className="ion-logo-facebook" />
                    </a>
                  </li>
                  <li className="ftco-animate">
                    <a
                      href="#"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Instagram"
                    >
                      <span className="ion-logo-instagram" />
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-md-8">
                <div className="row justify-content-center">
                  <div className="col-md-12 col-lg-9">
                    <div className="row">
                      <div className="col-md-6 mb-md-0 mb-4">
                        <h2 className="footer-heading">Discover</h2>
                        <ul className="list-unstyled">
                          <li>
                            <a href="#" className="py-1 d-block">
                              Romance
                            </a>
                          </li>
                          <li>
                            <a href="#" className="py-1 d-block">
                              Fiction
                            </a>
                          </li>
                          <li>
                            <a href="#" className="py-1 d-block">
                              Mystery
                            </a>
                          </li>
                          <li>
                            <a href="#" className="py-1 d-block">
                              Paranormal
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="col-md-6 mb-md-0 mb-4">
                        <h2 className="footer-heading">About</h2>
                        <ul className="list-unstyled">
                          <li>
                            <a href="#" className="py-1 d-block">
                              Become author
                            </a>
                          </li>
                          {/* <li>
                            <a href="#" className="py-1 d-block">
                              Team
                            </a>
                          </li>
                          <li>
                            <a href="#" className="py-1 d-block">
                              Careers
                            </a>
                          </li>
                          <li>
                            <a href="#" className="py-1 d-block">
                              Blog
                            </a>
                          </li> */}
                        </ul>
                      </div>
                      {/* <div className="col-md-4 mb-md-0 mb-4">
                        <h2 className="footer-heading">Resources</h2>
                        <ul className="list-unstyled">
                          <li>
                            <a href="#" className="py-1 d-block">
                              Security
                            </a>
                          </li>
                          <li>
                            <a href="#" className="py-1 d-block">
                              Global
                            </a>
                          </li>
                          <li>
                            <a href="#" className="py-1 d-block">
                              Charts
                            </a>
                          </li>
                          <li>
                            <a href="#" className="py-1 d-block">
                              Privacy
                            </a>
                          </li>
                        </ul>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-md-5">
              <div className="col-md-12">
                <p className="copyright">
                  {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                  Copyright © All rights reserved{" "}
                  <i className="ion-ios-heart" aria-hidden="true" /> <br />
                  <a
                    href="https://everything-books.herokuapp.com"
                    target="_blank"
                  >
                    https://everything-books.herokuapp.com
                  </a>
                  {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-3 py-md-5 py-4 aside-stretch-right pl-lg-5">
            <h2 className="footer-heading footer-heading-white">Contact us</h2>
            <form action="#" className="contact-form">
              <div className="form-group">
                <input
                  type="text"
                  name="user_id"
                  className="form-control"
                  placeholder="Your Name"
                />
              </div>
              <div className="form-group">
                <input
                  name="user_id"
                  type="text"
                  className="form-control"
                  placeholder="Your Email"
                />
              </div>
              <div className="form-group">
                <select
                  name="type"
                  type="text"
                  className="form-control"
                  onChange={(e) => handleType(e)}
                >
                  <option>choose subject</option>
                  <option value="report_bug">report a bug</option>
                  <option value="other">other</option>
                </select>
                {other && (
                  <input
                    name="topic"
                    type="text"
                    className="form-control"
                    placeholder="Specify Subject"
                    onChange={(e) => handleChange(e)}
                  />
                )}
              </div>

              <div className="form-group">
                <textarea
                  name="content"
                  cols={30}
                  rows={3}
                  className="form-control"
                  placeholder="Message"
                  onChange={(e) => handleChange(e)}
                  value={ticket.content}
                />
              </div>
              <div className="form-group">
                <button
                  type="submit"
                  className="form-control submit px-3"
                  onClick={handleSubmit}
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </footer>

    // <div className="ftr">
    //   <div>
    //     <h4>about us</h4>
    //   </div>
    //   <div>
    //     <h4>follow us</h4>
    //   </div>
    //   <div>
    //     <h4>contact us</h4>
    //   </div>
    // </div>
  );
};

export default Footer;
