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
    type: {
      type: String,
      // enum: ["admin", "reader", "author"],
    },

    // default: "reader",
  },
});

module.exports = mongoose.model("User", userSchema);
