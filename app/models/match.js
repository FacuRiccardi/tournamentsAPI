"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Match extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Match.belongsTo(models.Tournament, {
        as: "tournament",
        foreignKey: "tournamentId",
        onDelete: "CASCADE",
      });
    }
  }
  Match.init(
    {
      status: DataTypes.STRING,
      utcDate: DataTypes.DATE,
      homeTeamName: DataTypes.STRING,
      homeTeamCrest: DataTypes.STRING,
      homeTeamScore: DataTypes.INTEGER,
      awayTeamName: DataTypes.STRING,
      awayTeamCrest: DataTypes.STRING,
      awayTeamScore: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Match",
    }
  );
  return Match;
};
