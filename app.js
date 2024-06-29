const express = require("express");
const mongoose = require("mongoose");
const User = require("./userModel");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

(async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/usersDB");
    console.log("db connected!");
  } catch (error) {
    console.log(error.message);
  }
})();

app.use("*", (req, res) => {
  res.status(404).json({ status: "fail", message: "route not found." });
});

app.listen(3000, () => {
  console.log("running on port 3000");
});
