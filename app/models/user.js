"use strict";

const { Model } = require("sequelize");

const bcrypt = require("bcrypt");
const authConfig = require("../../config/auth");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: {
            msg: "Your name can only have letters",
          },
          len: {
            args: [1, 150],
            msg: "The length of your name must be between 1 and 150",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: {
            msg: "The email is not valid",
          },
          len: {
            args: [1, 200],
            msg: "The length of your email must be lower than 200 characters",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [8, 16],
            msg: "The length of your password must be between 8 and 16",
          },
        },
      },
    },
    {
      hooks: {
        beforeCreate: async (user, options) => {
          user.password = await bcrypt.hash(
            user.password,
            Number.parseInt(authConfig.rounds)
          );
          user.dataValues.createdAt = new Date()
            .toISOString()
            .replace(/T/, " ")
            .replace(/\..+/g, "");
          user.dataValues.updatedAt = new Date()
            .toISOString()
            .replace(/T/, " ")
            .replace(/\..+/g, "");
        },
        beforeUpdate: (user, options) => {
          user.dataValues.updatedAt = new Date()
            .toISOString()
            .replace(/T/, " ")
            .replace(/\..+/g, "");
        },
      },
      sequelize,
      modelName: "User",
    }
  );

  User.prototype.validPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

  return User;
};
