const router = require("express").Router();
const User = require("../models/userModel");

router
  .route("/users")
  .get(async (req, res) => {
    const users = await User.find({});
    res.status(200).json({ status: "success", data: users });
  })
  .post(async (req, res) => {
    const { name, age } = req.body;
    const user = new User({ name, age });
    await user.save();
    res
      .status(200)
      .json({ status: "success", message: "successfuly added a user." });
  });

router
  .route("/users/:id")
  .get(async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json({ status: "success", data: user });
  })
  .patch(async (req, res) => {
    const { id } = req.params;
    const { name, age } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, age },
      { returnDocument: "after" }
    );
    res.status(200).json({ status: "success", data: updatedUser });
  })
  .delete(async (req, res) => {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res
      .status(200)
      .json({ status: "success", message: "successfuly deleted a user." });
  });

module.exports = router;
