const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  cover: {
    type: String,
    required: true,
  },
  tags: { type: Array, required: true },

  description: {
    type: String,
    required: true,
  },
  date_of_release: Date,
  rating: Number,
});

module.exports = mongoose.model("Book", bookSchema);
