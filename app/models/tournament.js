"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tournament extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Tournament.hasMany(models.Match, {
        as: "matches",
        foreignKey: "tournamentId",
      });
    }
  }
  Tournament.init(
    {
      code: DataTypes.STRING,
      name: DataTypes.STRING,
      type: DataTypes.STRING,
      emblem: DataTypes.STRING,
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Tournament",
    }
  );
  return Tournament;
};
