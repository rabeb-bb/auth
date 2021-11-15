const mongoose = require("mongoose");
const { Schema } = mongoose;

const reviewSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  tags: Array,

  description: {
    type: String,
    required: true,
  },
  likes: Number,
  date_of_release: { type: Date, default: Date.now },
  book_id: { type: Schema.Types.ObjectId, ref: "Book" },
  user_id: { type: Schema.Types.ObjectId, ref: "User" },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

module.exports = mongoose.model("Review", reviewSchema);
