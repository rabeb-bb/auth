const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  password: { type: String, required: true },
  email: {
    type: String,
    required: true,
  },
  date_of_birth: Date,
  role: {
    type: String,
    enum: ["admin", "reader", "author"],
    required: true,
    default: "reader",
  },
  status: {
    type: String,
    enum: ["active", "blocked"],
    required: true,
    default: "active",
  },
  profile_picture: String,
  about_me: String,
  cloudinary_id: String,
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  books: [{ type: Schema.Types.ObjectId, ref: "Book" }],
  shelf: [{ type: Schema.Types.ObjectId, ref: "Book" }],
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  memberSince: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
