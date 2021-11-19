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
  },
  price: {
    type: Number,
    required: true,
  },
  price_currency: {
    type: String,
    enum: ["USD", "EURO", "TND"],
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
  date_of_release: { type: Date },
  score: { type: Number, default: 0 },
  count: { type: Number, default: 0 },
  author_id: { type: Schema.Types.ObjectId, ref: "User" },
  reader_id: [{ type: Schema.Types.ObjectId, ref: "User" }],
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  number_of_review: Number,
  cloudinary_id: String,
});

module.exports = mongoose.model("Book", bookSchema);
