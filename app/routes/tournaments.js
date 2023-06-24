const express = require("express");
const { errorCatcher } = require("../utils/errors/errorCatcher");

const router = express.Router();

//Middlewares
const auth = require("../middlewares/auth");

//Controllers
const TournamentsController = require("../controllers/tournaments");

router.get(
  "/api/external/tournaments",
  auth,
  errorCatcher(TournamentsController.getExternalTournaments)
);
router.post(
  "/api/tournaments",
  auth,
  errorCatcher(TournamentsController.createTournaments)
);
router.get(
  "/api/tournaments",
  auth,
  errorCatcher(TournamentsController.getTournaments)
);
router.get(
  "/api/tournaments/:code",
  auth,
  errorCatcher(TournamentsController.getTournamentByCode)
);
router.delete(
  "/api/tournaments/:id",
  auth,
  errorCatcher(TournamentsController.deleteTournamentById)
);

module.exports = router;
