const Task = require("../models/task");

// get all tasks
const getTasks = async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({
    success: true,
    tasks,
  });
};

// create a task
const createTask = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide a name" });
    }
    const task = await Task.create({ name });
    console.log(req.body);
    res.status(201).json({
      success: true,
      data: task,
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// get a task
const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: `No task with id : ${id}` });
    }
    res.status(200).json({ success: true, task });
  } catch (error) {
    console.log(error);
  }
};

// update a task
const updateTask = (req, res) => {
  const { id } = req.params;
  res.send(`update task with id ${id}`);
};

// delete a task
const deleteTask = (req, res) => {
  const { id } = req.params;
  res.send(`delete task with id ${id}`);
};

module.exports = {
  getTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
