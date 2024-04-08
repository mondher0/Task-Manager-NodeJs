require("./db/connect");
require("express-async-errors");
const express = require("express");
const taskRouter = require("./routes/tasks");
const connectDB = require("./db/connect");
const fileUpload = require("express-fileupload");
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFoundMiddleware = require("./middleware/not-found");
require("dotenv").config();
const app = express();

// middleware
app.use(express.static("./public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  }),
);

// routes
app.use("/api/v1/tasks", taskRouter);

// error handling
app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const port = process.env.PORT || 3000;
const start = async () => {
  await connectDB(process.env.MONGO_URI);
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
};

start();
