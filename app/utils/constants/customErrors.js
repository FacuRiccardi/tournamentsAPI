const HTTP_STATUS = require("./httpStatus");

module.exports = {
  VALIDATION_ERROR: {
    code: HTTP_STATUS.BAD_REQUEST,
    message: "Validation error",
  },
  USER_NOT_FOUND: { code: HTTP_STATUS.NOT_FOUND, message: "User not found" },
  WRONG_PASSWORD: { code: HTTP_STATUS.BAD_REQUEST, message: "Wrong password" },
  NOT_AUTHORIZED: {
    code: HTTP_STATUS.NOT_AUTHORIZED,
    message: "Not authorized",
  },
  TOKEN_VALIDATION_ERROR: {
    code: HTTP_STATUS.SERVER_ERROR,
    message: "Something went wrong with the validation of the token",
  },
  SERVER_ERROR: {
    code: HTTP_STATUS.SERVER_ERROR,
    message: "Something went wrong",
  },
};
