import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllReviews } from "../../JS/actions/reviews";
import {
  getBook,
  editBook,
  deleteBook,
  addBook,
  removeBook,
} from "../../JS/actions/books";
import BookEdit from "../../Components/BookEdit";
import Rating from "@mui/material/Rating";
import "./BookInfo.css";
import { Link, useParams, useHistory } from "react-router-dom";
import { time_ago } from "../../utilities/time";
// import { getAuthor } from "../../JS/actions/users";
// import { useParams } from "react-router";

const BookInfo = () => {
  const user = useSelector((state) => state.userReducer.user);
  const book = useSelector((state) => state.bookReducer.book);
  const reviews = useSelector((state) => state.reviewReducer.reviews);

  const load = useSelector((state) => state.userReducer.load);
  const { _id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [shelved, setShelved] = useState(false);
  const [book2Shelve, setBook2Shelve] = useState({ ...book });
  const [book2Edit, setBook2Edit] = useState({ ...book });
  console.log(_id);

  useEffect(() => {
    dispatch(getBook(_id));
    dispatch(getAllReviews(_id));
  }, [dispatch]);

  // console.log(book);
  const handleEdit = () => {
    setShow(true);
  };

  // if (
  //   book.reader_id &&
  //   book.reader_id.filter((el) => el._id === user._id).length
  // ) {
  //   setShelved(true);
  // }
  const handleSave = () => {
    dispatch(editBook(book2Edit));
    setShow(false);
  };
  const handleDelete = () => {
    let confirm = window.confirm("are you sure you want to delete this user?");
    if (confirm) {
      dispatch(deleteBook(_id, history));
    }
  };
  console.log(`this is the loaded book ${book}`);
  const handleShelf = async () => {
    await setBook2Shelve({
      ...book,
      reader_id: [...book.reader_id, user._id],
    });
    console.log(`book ${book}`);
    console.log(`book2Shelve ${book2Shelve}`);
    console.log(`shelved ${shelved}`);
    if (shelved) {
      dispatch(removeBook(book2Shelve));
    } else {
      dispatch(addBook(book2Shelve));
    }

    setShelved(!shelved);
  };
  return (
    <div className="book">
      {load ? (
        "please wait while page loads..."
      ) : (
        <div className="row p-2 bg-white border rounded">
          <div className="col-md-2 mt-1">
            <img
              className="img-fluid img-responsive rounded product-image"
              src={book && book.cover}
              width="100"
              height="250"
              alt="book cover"
            />
          </div>
          <div className="col-md-6 mt-1">
            <h5>{book && book.title}</h5>
            <div className="d-flex flex-row">
              <div className="ratings mr-2">
                <Rating
                  // value={book && (book.count ? book.score / book.count : "0")}
                  value={
                    reviews &&
                    reviews.length &&
                    (
                      reviews
                        .map((el) => el.rating)
                        .reduce((acc, v) => acc + v) / reviews.length
                    ).toFixed(2)
                  }
                  readOnly
                  precision={0.1}
                />{" "}
                {reviews &&
                  reviews.length &&
                  (
                    reviews.map((el) => el.rating).reduce((acc, v) => acc + v) /
                    reviews.length
                  ).toFixed(2)}
                <br />
                {/* {reviews.map((el) => console.log(el.rating))} */}
                {reviews && reviews.length}Reviews
              </div>
              {/* <span> {book.count} reviews</span> */}
            </div>
            <div className="mt-1 mb-1 spec-1">
              <span>
                <Link to="/author">
                  {" "}
                  {book && book.author_id.first_name}{" "}
                  {book && book.author_id.last_name}
                </Link>
                <br />
              </span>
              <span>{book && time_ago(book.date_of_release)}</span>
              <span>
                {/* {book &&
                  book.date_of_release.getMonth() +
                    1 +
                    "/" +
                    book.date_of_release.getDay() +
                    "/" +
                    book.date_of_release.getFullYear()} */}
              </span>
              {/* <span className="dot" />
                <span>Light weight</span>
                <span className="dot" /> */}
            </div>
            <div className="mt-1 mb-1 spec-1">
              <ul className="list-inline list-inline-dotted mb-3 mb-lg-2">
                {book &&
                  book.tags.map((el) => (
                    <li className="list-inline-item">
                      <a href="#" className="text-muted" data-abc="true">
                        {" "}
                        {el}
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
            <p className="text-justify para mb-0">
              {book && book.description}
              <br />
              <br />
            </p>
          </div>
          <div className="align-items-center align-content-center col-md-3 border-left mt-1">
            <div className="d-flex flex-row align-items-center">
              <h4 className="mr-1">${book && book.price}</h4>
              {/* <span className="strike-text">$20.99</span> */}
            </div>
            {/* <h6 className="text-success">Free shipping</h6> */}
            {book && book.author_id._id !== user._id ? (
              <div className="d-flex flex-column mt-4">
                <button type="button" className="btn btn-primary btn-sm">
                  Add to cart
                </button>{" "}
                <button
                  onClick={handleShelf}
                  className="btn btn-outline-primary btn-sm mt-2"
                >
                  {shelved ? "unshelve" : "shelve"}
                </button>
              </div>
            ) : (
              <div>
                <button onClick={handleEdit} className="btn btn-primary btn-sm">
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="btn btn-outline-primary btn-sm mt-2"
                >
                  Delete
                </button>
                {show && <BookEdit book={book} setShow={setShow} />}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookInfo;

//alternative book info card

// /* <div class="col-md-12">
// <div className="card card-body">
//   <div className="media align-items-center align-items-lg-start text-center text-lg-left flex-column flex-lg-row">
//     <div className="mr-2 mb-3 mb-lg-0">
//       <img
//         src={book && book.cover}
//         width="150"
//         height="150"
//         alt="book cover"
//       />{" "}
//     </div>
//     <div className="media-body">
//       <h6 className="media-title font-weight-semibold">
//         {" "}
//         {book && book.title}
//       </h6>
//       <h6 className="font-weight-semibold">
//         {" "}
//         <Link to="/author">
//           {" "}
//           {book && book.author_id.first_name}{" "}
//           {book && book.author_id.last_name}
//         </Link>
//       </h6>
//       <h6> {book && book.date_of_release}</h6>
//       <ul className="list-inline list-inline-dotted mb-3 mb-lg-2">
//         {book &&
//           book.tags.map((el) => (
//             <li className="list-inline-item">
//               <a href="#" className="text-muted" data-abc="true">
//                 {" "}
//                 {el}
//               </a>
//             </li>
//           ))}
//       </ul>
//       <p className="mb-3">{book && book.description}</p>
//     </div>
//     <div className="mt-3 mt-lg-0 ml-lg-3 text-center">
//       <h3 className="mb-0 font-weight-semibold">${book && book.price}</h3>
//       <div>
//         <Rating
//           name="read-only"
//           value={book && (book.count ? book.score / book.count : "0")}
//         />
//       </div>
//       {/* <div className="text-muted">{book && book.reviews.length} reviews</div>{" "} */

// /* for the author */

//         <div>
//           {/* {console.log(book && book.author_id)} */}
//           {/* {console.log(user._id)} */}
//           {book && book.author_id._id !== user._id ? (
//             <div>
//               <button type="button" className="btn btn-warning mt-4 text-white">
//                 Add to cart
//               </button>{" "}
//               <br />
//               <button
//                 onClick={handleShelf}
//                 className="btn btn-warning mt-4 text-white"
//               >
//                 {shelved ? "unshelve" : "shelve"}
//               </button>
//             </div>
//           ) : (
//             <div>
//               <button
//                 onClick={handleEdit}
//                 className="btn btn-warning text-white"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={handleDelete}
//                 className="btn btn-warning text-white"
//               >
//                 Delete
//               </button>
//               {show && <BookEdit book={book} setShow={setShow} />}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   </div>
// </div>; */}
