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

app.get("/users", async (req, res) => {
  const users = await User.find({});
  res.status(200).json({ status: "success", data: users });
});

app.post("/users", async (req, res) => {
  const { name, age } = req.body;
  const user = new User({ name, age });
  await user.save();
  res
    .status(200)
    .json({ status: "success", message: "successfuly added a user." });
});

app.patch("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name, age } = req.body;
  const updatedUser = await User.findByIdAndUpdate(
    id,
    { name, age },
    { returnDocument: "after" }
  );
  res.status(200).json({ status: "success", data: updatedUser });
});

app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  res
    .status(200)
    .json({ status: "success", message: "successfuly deleted a user." });
});

app.use("*", (req, res) => {
  res.status(404).json({ status: "fail", message: "route not found." });
});

app.listen(3000, () => {
  console.log("running on port 3000");
});
