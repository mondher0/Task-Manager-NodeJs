const express = require("express");
const taskRouter = require("./routes/tasks");
const app = express();

const port = 3000;

app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/tasks", taskRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});