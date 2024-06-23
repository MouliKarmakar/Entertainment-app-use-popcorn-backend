require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = require("./app"); // Correctly require app
const port = process.env.PORT || 10000;

// Connect to DATABASE
// || "mongodb://localhost:27017/popcornuser"
mongoose.connect(process.env.DBURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (err) => console.log(err));
db.once("open", () => console.log("Connected to database", process.env.DBURI));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
