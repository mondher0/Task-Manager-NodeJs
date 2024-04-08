require("./db/connect");
const express = require("express");
const taskRouter = require("./routes/tasks");
const connectDB = require("./db/connect");
require("dotenv").config();
const app = express();

const port = 3000;

app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/tasks", taskRouter);

const start = async () => {
  await connectDB(process.env.MONGO_URI);
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
};

start();
