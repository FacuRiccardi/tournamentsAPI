const { Tournament, Match } = require("../models/index");
const AppError = require("../utils/errors/AppError");
const { TOURNAMENT_NOT_FOUND } = require("../utils/constants/customErrors");
const HTTP_STATUS = require("../utils/constants/httpStatus");
const competitionMapper = require("../utils/mappers/competitionsMapper");

//Services
const FootballDataService = require("../services/footballData");

const getExternalTournaments = async (req, res) => {
  let response = await FootballDataService.getCompetitions();

  let competitions = response.competitions;

  res.json(competitionMapper(competitions));
};

const createTournaments = async (req, res) => {
  let reqTournaments = req.body;

  let tournaments = await Tournament.bulkCreate(reqTournaments, {
    ignoreDuplicates: true,
  });

  res.json({ tournaments });
};

const getTournaments = async (req, res) => {
  let { limit = 10, page = 1 } = req.query;

  let tournaments = await Tournament.findAll({
    limit: limit,
    offset: (page - 1) * limit,
  });

  res.json({ tournaments });
};

const getTournamentByCode = async (req, res) => {
  let { code } = req.params;

  let tournament = await Tournament.findOne({
    where: {
      code,
    },
    include: ["matches"],
  });

  if (!tournament) {
    throw new AppError(TOURNAMENT_NOT_FOUND);
  } else {
    res.json({ tournament });
  }
};

const deleteTournamentById = async (req, res) => {
  let { id } = req.params;

  let tournament = await Tournament.findOne({
    where: {
      id: id,
    },
  });

  if (!tournament) {
    throw new AppError(TOURNAMENT_NOT_FOUND);
  } else {
    await tournament.destroy();

    res.status(HTTP_STATUS.NO_CONTENT).json({});
  }
};

module.exports = {
  getExternalTournaments,
  createTournaments,
  getTournaments,
  getTournamentByCode,
  deleteTournamentById,
};
