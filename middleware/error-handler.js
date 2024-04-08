const CustomAPIError = require("../errors/custom-error");
const { StatusCodes } = require("http-status-codes");
const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ message: err.message });
  } else {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((val) => val.message);
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: messages,
      });
    } else if (err.name === "CastError") {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Resource not found",
      });
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
  }
};

module.exports = errorHandlerMiddleware;
