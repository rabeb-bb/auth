import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Rating from "@mui/material/Rating";
import "./Books.css";
import { searchBooks } from "../JS/actions/books";
import Item from "../Components/item/Item";
const Books = () => {
  const load = useSelector((state) => state.bookReducer.load);
  const books = useSelector((state) => state.bookReducer.books);

  // const [searchTerm, setSearchTerm] = useState("");
  // const [genre, setGenre] = useState("");
  // const [author, setAuthor] = useState("");
  // const [isbn, setIsbn] = useState("");
  const [filters, setFilters] = useState({
    title: "",
    genre: "",
    author: "",
    isbn: "",
    year: "",
  });
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getAllBooks());
  // }, [dispatch]);
  const handleFilters = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };
  const handleSearch = (e) => {
    dispatch(searchBooks(filters));
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
                              <option value="Sience">Sience</option>
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
                          onChange={(e) => handleFilters(e)}
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
                    <h4>By date:</h4>
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
                    <input type="hidden" id="dtp_input2" defaultValue />
                    {/* END FILTER BY DATE */}
                    <div className="padding" />
                  </div>
                  {/* END FILTERS */}
                  {/* BEGIN RESULT */}
                  <div className="col-md-8">
                    <h2>Browse Books</h2>
                    <hr />
                    {/* BEGIN SEARCH INPUT */}
                    <div className="input-group">
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
                          {/* <ul className="dropdown-menu" role="menu">
                            <li>
                              <a href="#">Name</a>
                            </li>
                            <li>
                              <a href="#">Date</a>
                            </li>
                            <li>
                              <a href="#">View</a>
                            </li>
                            <li>
                              <a href="#">Rating</a>
                            </li>
                          </ul> */}
                        </div>
                      </div>
                      {/* END ORDER RESULT */}
                      <div className="col-md-6 text-right">
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
                      </div>
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
                                <Item el={el} key={i} />
                                // <tr>
                                //   <td className="number text-center">
                                //     {i + 1}
                                //   </td>
                                //   <td className="image">
                                //     <img src={el.cover} alt="book cover" />
                                //   </td>
                                //   <td className="product">
                                //     <strong>{el.title}</strong>
                                //     <br />
                                //     {el.description}
                                //   </td>
                                //   <td className="rate text-right">
                                //     <span>
                                //       <Rating
                                //         name="read-only"
                                //         value={
                                //           el.count ? el.score / el.count : "0"
                                //         }
                                //         readOnly
                                //       />
                                //     </span>
                                //   </td>
                                //   <td className="price text-right">
                                //     ${el.price}
                                //   </td>
                                // </tr>
                              ))
                            : " no books"}
                        </tbody>
                      </table>
                    </div>
                    {/* END TABLE RESULT */}
                    {/* BEGIN PAGINATION */}
                    {/* <ul className="pagination">
                      <li className="disabled">
                        <a>«</a>
                      </li>
                      <li className="active">
                        <a>1</a>
                      </li>
                      <li>
                        <a >2</a>
                      </li>
                      <li>
                        <a >3</a>
                      </li>
                      <li>
                        <a >4</a>
                      </li>
                      <li>
                        <a href="#">5</a>
                      </li>
                      <li>
                        <a href="#">»</a>
                      </li>
                    </ul> */}
                    {/* END PAGINATION */}
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
