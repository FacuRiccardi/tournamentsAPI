const { ValidationError } = require("sequelize");
const AppError = require("../utils/errors/AppError");
const {
  VALIDATION_ERROR,
  SERVER_ERROR,
} = require("../utils/constants/customErrors");

const errorHandler = (error, req, res, next) => {
  if (error instanceof ValidationError) {
    let msg = "";

    if (error.name == "SequelizeUniqueConstraintError" && error.parent) {
      msg = [`The ${error.parent.constraint.split("_")[1]} is already in use`];
    } else {
      msg = error.errors.map((err) => {
        if (err.type == "notNull Violation")
          return `The ${err.path} is required`;
        return err.message;
      });
    }

    return res.status(VALIDATION_ERROR.code).json({
      statusCode: VALIDATION_ERROR.code,
      message: VALIDATION_ERROR.message,
      errors: msg,
    });
  }

  if (error instanceof AppError) {
    return res.status(error.code).json({
      statusCode: error.code,
      message: error.message,
    });
  }

  return res.status(SERVER_ERROR.code).json({ SERVER_ERROR, error });
};

module.exports = errorHandler;
