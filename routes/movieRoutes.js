const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");
const favMoviesController = require("../controllers/faviroteMoviesController");
const authMiddleware = require("../middlewares/auth");
const fileUploadMiddleware = require("../middlewares/fileUpload");
const checkPermissionMiddleware = require("../middlewares/checkPermissionsMiddleware");

router
  .route("/")
  .post(
    authMiddleware.auth,
    checkPermissionMiddleware.createPermission,
    fileUploadMiddleware.upload.single("file"),
    movieController.createMovie
  )
  .get(movieController.getAllMovies)
  .get(movieController.getSingleMovie);

router
  .route("/add-to-favorites")
  .patch(authMiddleware.auth, favMoviesController.updateFavirouteMovie);

router.get(
  "/favMovies/:userId",
  authMiddleware.auth,
  favMoviesController.getAllFavourites
);

router.put(
  "/:movieId",
  authMiddleware.auth,
  checkPermissionMiddleware.EditPermission,
  fileUploadMiddleware.upload.single("file"),
  movieController.editMovie
);
router.delete(
  "/:movieId",
  authMiddleware.auth,
  checkPermissionMiddleware.deletePermission,
  movieController.deleteMovie
);
router.route("/:movieId").get(movieController.getSingleMovie);

module.exports = router;
