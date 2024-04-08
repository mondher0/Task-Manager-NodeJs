const BadRequest = require("../errors/bad-request");
const { StatusCodes } = require("http-status-codes");
const Task = require("../models/task");
const NotFound = require("../errors/not-found");

// get all tasks
const getTasks = async (req, res) => {
  const tasks = await Task.find({});
  res.status(StatusCodes.OK).json({
    success: true,
    tasks,
  });
};

// create a task
const createTask = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    throw new BadRequest("Please provide task name");
  }
  const task = await Task.create({ name });
  res.status(StatusCodes.CREATED).json({
    success: true,
    data: task,
  });
};

// get a task
const getTask = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new BadRequest("Please provide id");
  }
  const task = await Task.findById(id);
  if (!task) {
    throw new NotFound(`No task with id : ${id}`);
  }
  res.status(StatusCodes.OK).json({ success: true, task });
};

// update a task
const updateTask = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new BadRequest("Please provide id");
  }
  const { name, completed } = req.body;
  if (!name) {
    throw new BadRequest("Please provide all required fields");
  }
  const task = await Task.findByIdAndUpdate(
    id,
    { name, completed },
    { new: true, runValidators: true },
  );
  if (!task) {
    throw new NotFound(`No task with id : ${id}`);
  }
  res
    .status(StatusCodes.OK)
    .json({ success: true, message: "Task updated successfully", task });
};

// delete a task
const deleteTask = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new BadRequest("Please provide id");
  }
  const task = await Task.findByIdAndDelete(id);
  if (!task) {
    throw new NotFound(`No task with id : ${id}`);
  }
  res
    .status(StatusCodes.OK)
    .json({ success: true, message: "Task deleted successfully" });
};

module.exports = {
  getTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
