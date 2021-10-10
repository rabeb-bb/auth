const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("DB is connected");
  } catch (error) {
    console.log("could not connect to the db", error);
  }
};
module.exports = connectDB;
