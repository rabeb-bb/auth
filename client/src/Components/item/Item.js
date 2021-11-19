import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Rating from "@mui/material/Rating";
import { getAuthor } from "../../JS/actions/users";
import { Link } from "react-router-dom";
import { getBook } from "../../JS/actions/books";
import { getAllReviews } from "../../JS/actions/reviews";

const Item = ({ el, i }) => {
  const author = useSelector((state) => state.userReducer.author);
  const reviews = useSelector((state) => state.reviewReducer.reviews);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllReviews(el._id));
  }, [dispatch]);
  return (
    <tr>
      <td className="number text-center">{i + 1}</td>
      <td className="image">
        <img src={el.cover} alt="book cover" />
      </td>
      <td className="product">
        <strong>
          <Link
            to={`/book/${el._id}`}
            onClick={() => dispatch(getBook(el._id))}
          >
            {el.title}
          </Link>
        </strong>
        <br />
        <Link
          to="/author"
          onClick={() => dispatch(getAuthor(el.author_id._id))}
        >{`${el.author_id.first_name} ${el.author_id.last_name}`}</Link>
      </td>
      <td className="rate text-right">
        <span>
          <Rating
            name="read-only"
            value={
              reviews &&
              reviews.length &&
              (
                reviews.map((el) => el.rating).reduce((acc, v) => acc + v) /
                reviews.length
              ).toFixed(2)
            }
            readOnly
            precision={0.1}
          />
        </span>
      </td>
      <td className="price text-right">${el.price}</td>
    </tr>
  );
};

export default Item;
