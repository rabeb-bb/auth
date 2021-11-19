import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Rating from "@mui/material/Rating";
import "./Books.css";
import { searchBooks, getAllBooks } from "../JS/actions/books";
// import { searchAuthors } from "../JS/actions/users";
import Item from "../Components/item/Item";
import { searchUsers } from "../JS/actions/users";

const Books = () => {
  const load = useSelector((state) => state.bookReducer.load);
  const books = useSelector((state) => state.bookReducer.books);
  const users = useSelector((state) => state.userReducer.users);
  // const [searchTerm, setSearchTerm] = useState("");
  // const [genre, setGenre] = useState("");
  // const [author, setAuthor] = useState("");
  const [authorBooks, setauthorBooks] = useState([]);

  const [filters, setFilters] = useState({
    title: "",
    genre: "",
    author: "",
    isbn: "",
    year: "",
  });
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(getAllBooks());
    for (let index = 0; index < users.length; index++) {
      setauthorBooks([...authorBooks, ...users[index].books]);
    }
  }, [dispatch, users]);
  const handleAuthors = (e) => {
    // dispatch(searchAuthors(e.target.value));
  };
  const handleFilters = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };
  const handleSearch = (e) => {
    dispatch(searchBooks(filters));
    dispatch(searchUsers(filters));
  };
  return (
    <div id="books">
      <div className="container">
        <div className="row">
          {/* BEGIN SEARCH RESULT */}
          <div className="col-md-12">
            <div className="grid search">
              <div className="grid-body">
                <div className="row">
                  {/* BEGIN FILTERS */}
                  <div className="col-md-4">
                    <h2 className="grid-title">
                      <i className="fa fa-filter" /> Filters
                    </h2>
                    <hr />
                    {/* BEGIN FILTER BY CATEGORY */}
                    <h4>By category:</h4>
                    <div className="checkbox">
                      <label>Genre</label>
                      <div className="col-lg-12">
                        <div className="card border-0">
                          <div className="card-body p-0">
                            {/* AUTO COMPLETE DROPDOWN */}
                            <select
                              className="selectpicker form-control  rounded "
                              name="genre"
                              onChange={(e) => handleFilters(e)}
                            >
                              <option>choose genre</option>
                              <option value="Art">Art</option>
                              <option value="Biography">Biography</option>
                              <option value="Business">Business</option>
                              <option value="Children">Children</option>
                              <option value="Classic">Classic</option>
                              <option value="Comedy">Comedy</option>
                              <option value="Contemporary">Contemporary</option>
                              <option value="Cuisine">Cuisine</option>
                              <option value="Fantasy">Fantasy</option>
                              <option value="Historial">Historial</option>
                              <option value="History">History</option>
                              <option value="Horror">Horror</option>
                              <option value="Memoir">Memoir</option>
                              <option value="Mystery">Mystery</option>
                              <option value="Nonfiction">Nonfiction</option>
                              <option value="Paranormal">Paranormal</option>
                              <option value="Philosophy">Philosophy</option>
                              <option value="Poetry">Poetry</option>
                              <option value="Psychology">Psychology</option>
                              <option value="Religion">Religion</option>
                              <option value="Romance">Romance</option>
                              <option value="Science">Science</option>
                              <option value="Sci-fi">Sci-fi</option>
                              <option value="Self-help">Self-help</option>
                              <option value="Sports">Sports</option>
                              <option value="Suspense">Suspense</option>
                              <option value="Travel">Travel</option>
                              <option value="Young-Adult">Young-Adult</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text">
                      <label>
                        Author
                        <input
                          type="text"
                          className="form-control"
                          name="author"
                          onChange={handleFilters}
                        />
                      </label>
                    </div>
                    <div className="text">
                      <label>
                        ISBN
                        <input
                          type="text"
                          className="form-control"
                          name="isbn"
                          onChange={(e) => handleFilters(e)}
                        />
                      </label>
                    </div>
                    {/* END FILTER BY CATEGORY */}
                    <div className="padding" />
                    {/* BEGIN FILTER BY DATE */}
                    {/* <h4>By date:</h4>
                    From
                    <div
                      className="input-group date form_date"
                      data-date-format="yyyy"
                      data-link-field="dtp_input1"
                    >
                      <input type="year" className="form-control" />
                      <span className="input-group-addon bg-blue">
                        <i className="fa fa-th" />
                      </span>
                    </div>
                    <input type="hidden" id="dtp_input1" defaultValue />
                    To
                    <div
                      className="input-group date form_date"
                      data-date="2014-06-14T05:25:07Z"
                      data-date-format="dd-mm-yyyy"
                      data-link-field="dtp_input2"
                    >
                      <input type="text" className="form-control" />
                      <span className="input-group-addon bg-blue">
                        <i className="fa fa-th" />
                      </span>
                    </div>
                    <input type="hidden" id="dtp_input2" defaultValue /> */}
                    {/* END FILTER BY DATE */}
                    <div className="padding" />
                  </div>
                  {/* END FILTERS */}
                  {/* BEGIN RESULT */}
                  <div className="col-md-8">
                    <h2>Browse Books</h2>
                    <hr />
                    {/* BEGIN SEARCH INPUT */}
                    <div className="input-group d-flex align-items-center">
                      <input
                        type="text"
                        name="title"
                        className="form-control"
                        placeholder="search by book title"
                        onChange={(e) => handleFilters(e)}
                      />
                      <span className="input-group-btn">
                        <button
                          className="btn btn-primary"
                          type="button"
                          onClick={() => handleSearch()}
                        >
                          <i className="fa fa-search" />
                        </button>
                      </span>
                    </div>
                    {/* END SEARCH INPUT */}
                    {/* <p>Showing all results matching {searchTerm}</p> */}
                    <div className="padding" />
                    <div className="row">
                      {/* BEGIN ORDER RESULT */}
                      <div className="col-sm-6">
                        <div className="btn-group">
                          {/* <button
                            type="button"
                            className="btn btn-default dropdown-toggle"
                            data-toggle="dropdown"
                          >
                            Order by <span className="caret" />
                          </button> */}
                        </div>
                      </div>
                      {/* END ORDER RESULT */}
                      {/* <div className="col-md-6 text-right">
                        <div className="btn-group">
                          <button
                            type="button"
                            className="btn btn-default active"
                          >
                            <i className="fa fa-list" />
                          </button>
                          <button type="button" className="btn btn-default">
                            <i className="fa fa-th" />
                          </button>
                        </div>
                      </div> */}
                    </div>
                    {/* BEGIN TABLE RESULT */}
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <tbody>
                          {load
                            ? "loading"
                            : books && books.length
                            ? books &&
                              books.map((el, i) => (
                                <Item el={el} key={i} i={i} />
                              ))
                            : null}
                          {load
                            ? "loading"
                            : users && users.length
                            ? authorBooks &&
                              authorBooks.length &&
                              authorBooks.map((el, i) => (
                                <Item el={el} key={i} i={i} />
                              ))
                            : null}
                        </tbody>
                      </table>
                    </div>
                    {/* END TABLE RESULT */}
                  </div>
                  {/* END RESULT */}
                </div>
              </div>
            </div>
          </div>
          {/* END SEARCH RESULT */}
        </div>
      </div>
    </div>
  );
};

export default Books;
