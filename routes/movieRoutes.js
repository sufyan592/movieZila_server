const express = require("express");
const router = express.Router();
const movieController = require("../controller/movieController");
const userController = require("../controller/userController");

router
  .route("/")
  .post(movieController.upload.single("file"), movieController.createMovie)
  .get(movieController.getAllMovies)
  .get(movieController.getSingleMovie);

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
router.route("/:movieId").get(movieController.getSingleMovie);

module.exports = router;
