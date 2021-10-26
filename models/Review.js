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
  date_of_release: Date,
  book_id: [{ type: Schema.Types.ObjectId, ref: "Book" }],
  user_id: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("Review", reviewSchema);
