const express = require("express");
const router = express.Router();
const {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasks");
const { createUser, findUser, FindUserById } = require("../controllers/users");

router.route("/login").post(findUser).get(FindUserById);
router.route("/signup").post(createUser);
router.route("/").get(getAllTasks).post(createTask);
router.route("/:id").get(getTask).patch(updateTask).delete(deleteTask);

module.exports = router;
