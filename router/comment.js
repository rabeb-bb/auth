const express = require("express");
const {
  postComment,
  getUserComments,
  getComments,
  commentUpdate,
  commentDelete,
  getCommentById,
} = require("../controllers/comment.controllers");
const {
  registerValidate,
  loginValidate,
  validation,
} = require("../middleware/validateUser");
const isAuth = require("../middleware/isAuth");
const router = express.Router();

// router.get("/", (req, res) => {
//   res.send("test");
// }); =====>works
// *****************

//get book comments
router.get("/book_comments/:book_id", getComments);
//get user comments
router.get("/user_comments/:user_id", getUserComments);
//delete comment
router.get("/user/:_id", getCommentById);

//user
// Post comment
router.post("/post", postComment);
//update comment
router.put("/user/update/:_id", commentUpdate);
//delete comment
router.delete("/user/delete/:_id", commentDelete);

//export
module.exports = router;