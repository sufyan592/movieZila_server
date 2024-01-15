const express = require("express");
const router = express.Router();
const movieController = require("../controller/movieController");
const userController = require("../controller/userController");

router
  .route("/")
  .post(movieController.upload.single("file"), movieController.createMovie)
  .get(movieController.getAllMovies);

router.put(
  "/:movieId",
  movieController.upload.single("file"),
  movieController.editMovie
);
router.get(
  "/favMovies/:userId",
  userController.auth,
  movieController.getAllFavourites
);

module.exports = router;
