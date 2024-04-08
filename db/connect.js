const mongoose = require("mongoose");

const connectDB = async (url) => {
  try {
    await mongoose.connect(url);
    console.log("Connected to the database");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
