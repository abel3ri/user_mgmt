const router = require("express").Router();
const userController = require("../controllers/userController");

router
  .route("/users")
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route("/users/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
