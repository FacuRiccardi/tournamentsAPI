const { Match, Tournament } = require("../models/index");
const AppError = require("../utils/errors/AppError");
const {
  TOURNAMENT_NOT_FOUND,
  MATCH_NOT_FOUND,
} = require("../utils/constants/customErrors");
const HTTP_STATUS = require("../utils/constants/httpStatus");
const matchesMapper = require("../utils/mappers/matchesMapper");

//Services
const FootballDataService = require("../services/footballData");

const getExternalMatchesByTournamentCode = async (req, res) => {
  let { code } = req.params;
  let { limit = 30, page = 0 } = req.query;

  let tournament = Tournament.findOne({
    where: {
      code,
    },
  });

  if (!tournament) {
    throw new AppError(TOURNAMENT_NOT_FOUND);
  } else {
    let response = await FootballDataService.getMatchesByCompetitionCode(code);

    let matches = response.matches.slice(
      page * limit,
      page * limit + Number.parseInt(limit)
    );

    res.json(matchesMapper(matches));
  }
};

const createMatches = async (req, res) => {
  let { code } = req.params;
  let reqMatches = req.body;

  let tournament = await Tournament.findOne({
    where: {
      code,
    },
  });

  if (!tournament) {
    throw new AppError(TOURNAMENT_NOT_FOUND);
  } else {
    let matches = await Match.bulkCreate(
      reqMatches.map((match) => ({
        ...match,
        tournamentId: tournament.id,
      })),
      {
        ignoreDuplicates: true,
      }
    );

    res.json({ matches });
  }
};

const getMatchesByTournamentCode = async (req, res) => {
  let { code } = req.params;

  let tournament = await Tournament.findOne({
    where: {
      code,
    },
  });

  if (!tournament) {
    throw new AppError(TOURNAMENT_NOT_FOUND);
  } else {
    let matches = await Match.findAll({
      where: {
        tournamentId: tournament.id,
      },
    });

    res.json({ matches });
  }
};

const deleteMatchesByIds = async (req, res) => {
  await Match.destroy({
    where: {
      id: req.body.ids,
    },
  });

  res.status(HTTP_STATUS.NO_CONTENT).json({});
};

const deleteMatchesByTournamentCode = async (req, res) => {
  let { code } = req.params;

  let tournament = await Tournament.findOne({
    where: {
      code,
    },
  });

  if (!tournament) {
    throw new AppError(TOURNAMENT_NOT_FOUND);
  } else {
    await Match.destroy({
      where: {
        tournamentId: tournament.id,
      },
    });

    res.status(HTTP_STATUS.NO_CONTENT).json({});
  }
};

module.exports = {
  getExternalMatchesByTournamentCode,
  createMatches,
  getMatchesByTournamentCode,
  deleteMatchesByIds,
  deleteMatchesByTournamentCode,
};
