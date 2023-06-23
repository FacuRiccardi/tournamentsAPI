const express = require("express");
const { errorCatcher } = require("../utils/errors/errorCatcher");

const router = express.Router();

//Middlewares
const auth = require("../middlewares/auth");

//Controllers
const UserController = require("../controllers/users");

router.post("/api/signin", errorCatcher(UserController.signIn));
router.post("/api/signup", errorCatcher(UserController.signUp));
router.get("/api/user", auth, errorCatcher(UserController.getUser));
router.delete("/api/user", auth, errorCatcher(UserController.deleteUser));

module.exports = router;
