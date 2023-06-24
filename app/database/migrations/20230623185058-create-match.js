"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Matches", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      utcDate: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      homeTeamName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      homeTeamCrest: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      homeTeamScore: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      awayTeamName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      awayTeamCrest: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      awayTeamScore: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      tournamentId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "Tournaments",
          key: "id",
          as: "tournamentId",
        },
        onDelete: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Matches");
  },
};
