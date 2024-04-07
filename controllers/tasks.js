const { get } = require("mongoose");

// get all tasks
const getTasks = (req, res) => {
  res.send("here is the list of tasks");
};

module.exports = {
  getTasks,
};
