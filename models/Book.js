const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  isbn: String,
  cover: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  price_currency: {
    type: String,
    enum: ["USD", "EURO", "TND"],
    required: true,
    default: "USD",
  },
  tags: { type: Array, required: true },

  description: {
    type: String,
    required: true,
  },
  file: {
    type: String,
  },
  date_of_release: Date,
  rating: Number,
  author_id: [{ type: Schema.Types.ObjectId, ref: "User" }],
  reader_id: [{ type: Schema.Types.ObjectId, ref: "User" }],
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  number_of_review: Number,
});

module.exports = mongoose.model("Book", bookSchema);
