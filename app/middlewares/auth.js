const jwt = require("jsonwebtoken");
const authConfig = require("../../config/auth");
const {
  NOT_AUTHORIZED,
  TOKEN_VALIDATION_ERROR,
} = require("../utils/constants/customErrors");

module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(NOT_AUTHORIZED.code).json(NOT_AUTHORIZED);
  } else {
    let token = req.headers.authorization.split(" ")[1];

    jwt.verify(token, authConfig.secret, (err, decoded) => {
      if (err) {
        res.status(TOKEN_VALIDATION_ERROR.code).json(TOKEN_VALIDATION_ERROR);
      } else {
        req.user = decoded.user;
        next();
      }
    });
  }
};
