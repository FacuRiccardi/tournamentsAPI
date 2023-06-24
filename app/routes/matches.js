const express = require("express");
const { errorCatcher } = require("../utils/errors/errorCatcher");

const router = express.Router();

//Middlewares
const auth = require("../middlewares/auth");

//Controllers
const MatchesController = require("../controllers/matches");

router.get(
  "/api/external/:code/matches",
  auth,
  errorCatcher(MatchesController.getExternalMatchesByTournamentCode)
);
router.post(
  "/api/:code/matches",
  auth,
  errorCatcher(MatchesController.createMatches)
);
router.get(
  "/api/:code/matches",
  auth,
  errorCatcher(MatchesController.getMatchesByTournamentCode)
);
router.delete(
  "/api/matches",
  auth,
  errorCatcher(MatchesController.deleteMatchesByIds)
);
router.delete(
  "/api/:code/matches",
  auth,
  errorCatcher(MatchesController.deleteMatchesByTournamentCode)
);

module.exports = router;
