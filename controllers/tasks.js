const Task = require("../models/Task");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");
//find({data})
//used for searching for a taskes with the data passed in the object in the find function

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

const getTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });
  if (!task) {
    return next(createCustomError("No Tasks with this ID", 404));
    return res.status(404).json({ msg: `no task with ID: ${taskID}` });
  }
  res.status(200).json({ task });
});

const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return next(createCustomError("No Tasks with this ID", 404));
    return res.status(404).json({ msg: `no task with ID: ${taskID}` });
  }
  res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });
  if (!task) {
    return next(createCustomError("No Tasks with this ID", 404));
    return res.status(404).json({ msg: `no task with ID: ${taskID}` });
  }
  res.status(200).json({ msg: "successfully deleted" });
});

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };
