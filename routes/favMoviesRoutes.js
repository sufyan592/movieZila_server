const express = require("express");
const router = express.Router();
const favMoviesController = require("../controller/favirouteMoviesController");

router.route("/add-to-favorites").patch(favMoviesController.fav_Movies);

module.exports = router;
