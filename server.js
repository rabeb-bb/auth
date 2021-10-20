console.clear();
const express = require("express");
const connectDB = require("./config/connectDB");
require("dotenv").config();
// ***************
const app = express();
// ***************
// connect to the DB
connectDB();
//****************
//router
app.use(express.json());
app.use("/api/user", require("./router/user"));
app.use("/api/admin", require("./router/admin"));
// ***********
PORT = process.env.PORT;
// ***********
app.listen(PORT, (err) => {
  err
    ? console.log("could not connect to server", err)
    : console.log(`server is running on port${PORT}`);
});
