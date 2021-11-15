const Comment = require("../models/Comment");

//Post a new Comment
exports.postComment = async (req, res) => {
  try {
    //post a new Comment
    const newComment = new Comment({ ...req.body });

    //save Comment
    await newComment.save();

    res
      .status(200)
      .send({ msg: "Comment successfully posted", comment: newComment });
  } catch (error) {
    console.log(error);
    res.status(400).send({ errors: [{ msg: "could not post Comment" }] });
  }
};
//update a Comment
exports.commentUpdate = async (req, res) => {
  try {
    //check if book already exists in the db or not
    const findComment = await Comment.updateOne(
      { _id: req.params._id },
      { $set: { ...req.body } }
    );

    res
      .status(200)
      .send({ msg: "Comment successfully updated", comment: findComment });
  } catch (error) {
    console.log(error);
    res.status(400).send({ errors: [{ msg: "could not update Comment" }] });
  }
};
//delete a book
exports.commentDelete = async (req, res) => {
  try {
    //check if Comment already exists in the db or not
    const deleteComment = await Comment.deleteOne({ _id: req.params._id });

    res
      .status(200)
      .send({ msg: "Comment successfully deleted", comment: deleteComment });
  } catch (error) {
    console.log(error);
    res.status(400).send({ errors: [{ msg: "could not delete Comment" }] });
  }
};

//get a Comment
exports.getCommentById = async (req, res) => {
  try {
    // const { _id } = req.body;
    //check if email exists in the db or not
    const findComment = await Comment.findById(req.params._id).populate(
      user_id
    );

    // if (!findComment) {
    //   return res.status(404).send({ errors: [{ msg: "Comment does not exist" }] });
    // }
    console.log(findComment);
    res.status(200).send({ msg: "Comment is found", comment: findComment });
  } catch (error) {
    console.log(error);
    res.status(400).send({ errors: [{ msg: "could not find book" }] });
  }
};
//get the Comments of a certain book
exports.getComments = async (req, res) => {
  try {
    const findComments = await Comment.find({
      book_id: req.params.book_id,
    }).populate("user_id");

    res
      .status(200)
      .send({ msg: " book Comments are found", comments: findComments });
  } catch (error) {
    console.log(error);
    res.status(400).send({ errors: [{ msg: "could not find book Comments" }] });
  }
};
//get the Comments of a certain user
exports.getUserComments = async (req, res) => {
  try {
    const findComments = await Comment.find({
      user_id: req.params.user_id,
    }).populate("book_id");

    res
      .status(200)
      .send({ msg: " user Comments are found", comments: findComments });
  } catch (error) {
    console.log(error);
    res.status(400).send({ errors: [{ msg: "could not find user Comments" }] });
  }
};
