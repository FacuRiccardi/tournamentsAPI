const jwt = require("jsonwebtoken");

const { User } = require("../models/index");
const AppError = require("../utils/errors/AppError");
const authConfig = require("../../config/auth");
const {
  USER_NOT_FOUND,
  WRONG_PASSWORD,
} = require("../utils/constants/customErrors");
const HTTP_STATUS = require("../utils/constants/httpStatus");

const signIn = async (req, res) => {
  let { email, password } = req.body;

  let user = await User.findOne({
    where: {
      email: email,
    },
  });

  if (!user) {
    throw new AppError(USER_NOT_FOUND);
  } else {
    if (!(await user.validPassword(password))) {
      throw new AppError(WRONG_PASSWORD);
    } else {
      let token = jwt.sign({ user: user }, authConfig.secret, {
        expiresIn: authConfig.expires,
      });

      res.json({
        user,
        token,
      });
    }
  }
};

const signUp = async (req, res) => {
  let { name, email, password } = req.body;

  let user = await User.create({
    name,
    email,
    password,
  });

  let token = jwt.sign({ user: user }, authConfig.secret, {
    expiresIn: authConfig.expires,
  });

  res.json({
    user,
    token,
  });
};

const getUser = async (req, res) => {
  let { id } = req.user;

  let user = await User.findOne({
    where: {
      id: id,
    },
  });

  if (!user) {
    throw new AppError(USER_NOT_FOUND);
  } else {
    res.json({
      user,
    });
  }
};

const deleteUser = async (req, res) => {
  let { id } = req.user;

  let user = await User.findOne({
    where: {
      id: id,
    },
  });

  if (!user) {
    throw new AppError(USER_NOT_FOUND);
  } else {
    await user.destroy();

    res.status(HTTP_STATUS.NO_CONTENT).json({});
  }
};

module.exports = {
  signIn,
  signUp,
  getUser,
  deleteUser,
};
