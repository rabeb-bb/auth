const Review = require("../models/Review");

//Post a new review
exports.postReview = async (req, res) => {
  try {
    //post a new review
    const newReview = new Review({ ...req.body });

    //save review
    await newReview.save();

    res
      .status(200)
      .send({ msg: "Review successfully posted", review: newReview });
  } catch (error) {
    console.log(error);
    res.status(400).send({ errors: [{ msg: "could not post review" }] });
  }
};
//update a review
exports.reviewUpdate = async (req, res) => {
  try {
    //check if book already exists in the db or not
    const findReview = await Review.updateOne(
      { _id: req.params._id },
      { $set: { ...req.body } }
    );

    res
      .status(200)
      .send({ msg: "review successfully updated", review: findReview });
  } catch (error) {
    console.log(error);
    res.status(400).send({ errors: [{ msg: "could not update review" }] });
  }
};
//delete a book
exports.reviewDelete = async (req, res) => {
  try {
    //check if review already exists in the db or not
    const deleteReview = await Review.deleteOne({ _id: req.params._id });

    res
      .status(200)
      .send({ msg: "review successfully deleted", review: deleteReview });
  } catch (error) {
    console.log(error);
    res.status(400).send({ errors: [{ msg: "could not delete review" }] });
  }
};

//get a Review
exports.getReviewById = async (req, res) => {
  try {
    // const { _id } = req.body;
    //check if email exists in the db or not
    const findReview = await Review.findById(req.params._id).populate(user_id);

    // if (!findReview) {
    //   return res.status(404).send({ errors: [{ msg: "Review does not exist" }] });
    // }
    console.log(findReview);
    res.status(200).send({ msg: "Review is found", review: findReview });
  } catch (error) {
    console.log(error);
    res.status(400).send({ errors: [{ msg: "could not find book" }] });
  }
};
//get the reviews of a certain book
exports.getReviews = async (req, res) => {
  try {
    const findReviews = await Review.find({
      book_id: req.params.book_id,
    }).populate("user_id");

    res
      .status(200)
      .send({ msg: " book reviews are found", reviews: findReviews });
  } catch (error) {
    console.log(error);
    res.status(400).send({ errors: [{ msg: "could not find book reviews" }] });
  }
};
//get the reviews of a certain user
exports.getUserReviews = async (req, res) => {
  try {
    const findReviews = await Review.find({
      user_id: req.params.user_id,
    }).populate("book_id");

    res
      .status(200)
      .send({ msg: " user reviews are found", reviews: findReviews });
  } catch (error) {
    console.log(error);
    res.status(400).send({ errors: [{ msg: "could not find user reviews" }] });
  }
};


