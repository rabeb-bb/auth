const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  likes: Number,
  date_of_release: { type: Date, default: Date.now },
  review_id: { type: Schema.Types.ObjectId, ref: "Book" },
  user_id: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Comment", commentSchema);
