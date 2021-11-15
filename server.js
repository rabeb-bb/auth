
const express = require("express");
const connectDB = require("./config/connectDB");
require("dotenv").config();
const cors = require("cors");
const multer = require("multer");
const path = require("path");
// ***************
const app = express();
// ***************
// connect to the DB
connectDB();
//****************

//router
app.use(express.json({ limit: "50mb" }));
app.use(cors());
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use("/api/user", require("./router/user"));
app.use("/api/admin", require("./router/admin"));
app.use("/api/book", require("./router/book"));
app.use("/api/review", require("./router/review"));
app.use("/api/support", require("./router/support"));
app.use(express.static(path.join(__dirname, "client", "build")))
// ***********
PORT = process.env.PORT;
// ***********
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
//************
app.listen(PORT, (err) => {
  err
    ? console.log("could not connect to server", err)
    : console.log(`server is running on port${PORT}`);
});
