const { Movie } = require("../models");
const { sendSuccess, sendError } = require("../helpers/response");

// =============================== Create a new Movie =============================

exports.createMovie = async (req, res) => {
  try {
    const { title, publish_year } = req.body;
    const img = req.file ? req.file.filename : null;

    if (!title || !publish_year || !img) {
      return sendError(res, 400, "Error", "Please enter all deatails.");
    }

    const newMovie = await Movie.create({
      img,
      title,
      publish_year,
    });

    return sendSuccess(
      res,
      201,
      "Success",
      "New Movie created successfully.",
      newMovie
    );
  } catch (error) {
    return sendError(res, 500, "Error", "Internel Server Error.");
  }
};

// =============================== All Movies =============================

// exports.getAllMovies = async (req, res) => {
//   try {
//     const { page = 1, pageSize = 8 } = req.query;
//     const offset = (page - 1) * pageSize;

//     // const movies = await Movie.findAll();
//     const movies = await Movie.findAll({
//       limit: parseInt(pageSize),
//       offset: offset,
//     });

//     // res.status(200).json({
//     //   status: "Success",
//     //   message: "All movies fetched successfully!",
//     //   count: movies.length || 0,
//     //   data: movies,
//     // });
//     return sendSuccess(
//       res,
//       200,
//       "Success",
//       "All movies fetched successfully.",
//       { data: movies, count: movies.length || 0 }
//     );
//   } catch (error) {
//     return sendError(res, 500, "Error", "Internel Server Error.");
//   }
// };
exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.findAll();

    return sendSuccess(
      res,
      200,
      "Success",
      "All movies fetched successfully.",
      { data: movies, count: movies.length || 0 }
    );
  } catch (error) {
    return sendError(res, 500, "Error", "Internel Server Error.");
  }
};
// =============================== Single Movie =============================

exports.getSingleMovie = async (req, res) => {
  try {
    const movieId = parseInt(req.params.movieId);
    const movie = await Movie.findByPk(movieId);

    if (!movie) {
      return sendError(res, 404, "Error", "Movie not found.");
    }

    return sendSuccess(res, 200, "Success", "Movie Found Successfully.", movie);
  } catch (error) {
    return sendError(res, 500, "Error", "Internel Server Error.");
  }
};

// =============================== Edit Single Movie =============================

exports.editMovie = async (req, res) => {
  try {
    const { movieId } = req.params;
    const { title, publish_year } = req.body;

    let imageUrl;
    if (req.file) {
      imageUrl = req.file.filename;
    }

    const movie = await Movie.findByPk(movieId);

    if (!movie) {
      return sendError(res, 404, "Error", "Movie not found.");
    }

    movie.title = title || movie.title;
    movie.publish_year = publish_year || movie.publish_year;

    if (imageUrl) {
      movie.img = imageUrl;
    }

    await movie.save();

    return sendSuccess(
      res,
      200,
      "Success",
      "Movie updated successfully.",
      movie
    );
  } catch (error) {
    return sendError(res, 500, "Error", "Internel Server Error.");
  }
};
// =============================== Delete Single Movie =============================

exports.deleteMovie = async (req, res) => {
  try {
    const { movieId } = req.params;
    // const { userId } = req.user;
    const movie = await Movie.findByPk(movieId);

    if (!movie) {
      return sendError(res, 404, "Error", "Movie not found.");
    }
    await movie.destroy();
    return sendSuccess(
      res,
      200,
      "Success",
      "Movie Deleted successfully.",
      null
    );
  } catch (error) {
    return sendError(res, 500, "Error", "Internel Server Error.");
  }
};
