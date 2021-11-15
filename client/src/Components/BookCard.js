import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAuthor } from "../JS/actions/users";
import { getAuthorBooks, getBook} from "../JS/actions/books";
export default function BookCard({ book }) {
  const dispatch = useDispatch();
  const handleAuthor = (id) => {
    dispatch(getAuthor(book.author_id._id));
    dispatch(getAuthorBooks(book.author_id._id));
  };
  return (
    <Card sx={{ width: 145, margin: "2%", height: 250 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="180"
          image={book.cover}
          alt={book.title}
        />
        <CardContent>
          <Typography gutterBottom component="div" onClick={()=>getBook(book._id)}>
            <Link to={`/book/${book._id}`} >{book.title}</Link>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <Link
              to={`/author`}
              onClick={() => handleAuthor()}
            >{`${book.author_id.first_name} ${book.author_id.last_name}`}</Link>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
