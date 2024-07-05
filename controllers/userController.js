const User = require("../models/userModel");

module.exports.getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.status(200).json({ status: "success", data: users });
};

module.exports.createUser = async (req, res) => {
  const { name, age } = req.body;
  const user = new User({ name, age });
  await user.save();
  res
    .status(200)
    .json({ status: "success", message: "successfuly added a user." });
};

module.exports.getUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.status(200).json({ status: "success", data: user });
};

module.exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, age } = req.body;
  const updatedUser = await User.findByIdAndUpdate(
    id,
    { name, age },
    { returnDocument: "after" }
  );
  res.status(200).json({ status: "success", data: updatedUser });
};

module.exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  res
    .status(200)
    .json({ status: "success", message: "successfuly deleted a user." });
};
