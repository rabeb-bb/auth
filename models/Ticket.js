const mongoose = require("mongoose");
const { Schema } = mongoose;

const ticketSchema = new Schema({
  content: {
    type: String,
  },
  status: {
    type: String,
    enum: ["open", "closed"],
    required: true,
    default: "open",
  },
  topic: String,
  type: {
    type: String,
    enum: ["report_user", "report_bug", "report_review", "other"],
    required: true,
    default: "active",
  },
  date: { type: Date },
  user_id: { type: Schema.Types.ObjectId, ref: "User" },
  reportedReview: { type: Schema.Types.ObjectId, ref: "Review" },
  reportedUserId: String,
});

module.exports = mongoose.model("Ticket", ticketSchema);
