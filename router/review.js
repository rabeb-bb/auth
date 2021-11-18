const express = require("express");
const {
  postReview,
  getUserReviews,
  getReviews,
  reviewUpdate,
  reviewDelete,
  getReviewById,
} = require("../controllers/review.controllers");
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

//get book reviews
router.get("/book_reviews/:book_id", getReviews);
//get user reviews
router.get("/user_reviews/:user_id", isAuth, getUserReviews);
//delete review
router.get("/user/:_id", isAuth, getReviewById);

//user
// Post review
router.post("/post", isAuth, postReview);
//update review
router.put("/user/update/:_id", isAuth, reviewUpdate);
//delete review
router.delete("/user/delete/:_id", isAuth, reviewDelete);

//export
module.exports = router;
