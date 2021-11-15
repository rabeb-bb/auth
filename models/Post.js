const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },

  description: {
    type: String,
    required: true,
  },
  date_of_release: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Post", postSchema);
