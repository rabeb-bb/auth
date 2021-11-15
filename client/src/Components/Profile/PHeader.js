import React, { useEffect } from "react";
import "./Profile.css";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAuthorBooks, getBook, getmyBooks } from "../../JS/actions/books";
import { getAuthor } from "../../JS/actions/users";
import Rating from "@mui/material/Rating";

const PHeader = () => {
  const load = useSelector((state) => state.bookReducer.load);
  const myBooks = useSelector((state) => state.bookReducer.myBooks);
  // const books = useSelector((state) => state.bookReducer.books);
  const user = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();
  const { author_id } = useParams();
  useEffect(() => {
    dispatch(getmyBooks());
    // dispatch(getAuthor(author_id));
    dispatch(getAuthorBooks(user._id));
  }, [dispatch]);
  const handleBook = (id) => {
    dispatch(getBook(id));
  };
  return (
    <div id="profile" style={{ minWidth: "800px", height: "100%" }}>
      {load ? (
        "please wait..."
      ) : (
        <div className="row py-5 px-4">
          <div className="col-md-11 mx-auto">
            {/* Profile widget */}
            <div className="bg-white shadow rounded overflow-hidden">
              <div className="px-4 pt-0 pb-4 coverpro">
                <div className="media align-items-end profile-head">
                  <div
                    className="profile mr-3"
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <img
                      src={
                        user.profile_picture
                          ? user.profile_picture
                          : "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
                      }
                      alt="profile"
                      width={130}
                      className="rounded mb-2 img-thumbnail"
                    />
                    {user._id === localStorage.getItem("authorID") ? (
                      <Link to="/account">
                        <button className="btn btn-outline-dark btn-sm btn-block">
                          Edit profile
                        </button>
                      </Link>
                    ) : user.role === "author" ? (
                      <button className="btn btn-outline-dark btn-sm btn-block">
                        Follow
                      </button>
                    ) : null}
                  </div>
                  <div className="media-body mb-5 text-white">
                    <h4 className="m-2">{`${user.first_name} ${user.last_name}`}</h4>
                  </div>
                </div>
              </div>
              <div className="bg-light p-4 d-flex justify-content-end text-center">
                <ul className="list-inline mb-0">
                  <li className="list-inline-item">
                    <h5 className="font-weight-bold mb-0 d-block">
                      {myBooks && myBooks.length}
                    </h5>
                    <small className="text-muted">Books</small>
                  </li>
                  {/* <li className="list-inline-item">
                    <h5 className="font-weight-bold mb-0 d-block">745</h5>
                    <small className="text-muted">Read</small>
                  </li> */}
                  {/* <li className="list-inline-item">
                  <h5 className="font-weight-bold mb-0 d-block">745</h5>
                  <small className="text-muted">
                    {" "}
                    <i className="fas fa-author mr-1" />
                    Followers
                  </small>
                </li>
                <li className="list-inline-item">
                  <h5 className="font-weight-bold mb-0 d-block">340</h5>
                  <small className="text-muted">
                    {" "}
                    <i className="fas fa-author mr-1" />
                    Following
                  </small>
                </li> */}
                </ul>
              </div>
              <div className="px-4 py-3">
                <h5 className="mb-0">About</h5>
                <div className="p-4 rounded shadow-sm bg-light">
                  <p className="font-italic mb-0">{user.about_me}</p>
                </div>
              </div>
              <div className="py-4 px-4">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <h5 className="mb-0">Books</h5>
                  <Link to="/upload">
                    <button className="btn btn-outline-dark btn-sm btn-block">
                      Upload Book
                    </button>
                  </Link>
                  {/* <a href="#" className="btn btn-link text-muted">
                  Show all
                </a> */}
                </div>
                <div className="table-responsive">
                  <table className="table table-hover">
                    <tbody>
                      {load
                        ? "loading"
                        : myBooks
                        ? myBooks.map((el, i) => (
                            <tr>
                              <td className="number text-center">{i + 1}</td>
                              <td className="image">
                                <img
                                  src={el.cover}
                                  alt="book cover"
                                  width="100px"
                                />
                              </td>
                              <td className="product">
                                <Link
                                  to={`/Book/${el._id}`}
                                  onClick={() => handleBook(el._id)}
                                >
                                  {" "}
                                  <strong>{el.title}</strong>
                                </Link>
                                <br />
                                {/* {el.description} */}
                              </td>
                              <td className="rate text-right">
                                <span>
                                  <Rating
                                    name="read-only"
                                    value={el.count ? el.score / el.count : "0"}
                                    readOnly
                                  />
                                </span>
                              </td>
                              <td className="price text-right">${el.price}</td>
                            </tr>
                          ))
                        : "no books"}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PHeader;
