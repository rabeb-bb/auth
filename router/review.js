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
router.get("/user_reviews/:user_id", getUserReviews);
//delete review
router.get("/user/:_id", getReviewById);

//user
// Post review
router.post("/post", postReview);
//update review
router.put("/user/update/:_id", reviewUpdate);
//delete review
router.delete("/user/delete/:_id", reviewDelete);

//export
module.exports = router;
