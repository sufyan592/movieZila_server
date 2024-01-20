const { Movie } = require("../models");
const { sendError } = require("../constant/error-handler");
const { sendSuccess } = require("../constant/success-handler");

// =============================== Create a new Movie =============================

// exports.createMovie = async (req, res) => {
//   try {
//     const { title, publish_year } = req.body;
//     const img = req.file ? req.file.filename : null;

//     if (!title || !publish_year || !img) {
//       return res.status(400).json({
//         status: "Fail",
//         message: "Please enter a all Details",
//       });
//     }

//     const newMovie = await Movie.create({
//       img,
//       title,
//       publish_year,
//     });

//     res.status(201).json({
//       status: "Success",
//       message: "New Movie created successfully",
//       data: newMovie,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       status: "Fail",
//       error,
//     });
//   }
// };

exports.createMovie = async (req, res) => {
  try {
    const { title, publish_year } = req.body;
    const img = req.file ? req.file.filename : null;

    if (!title || !publish_year || !img) {
      return sendError(res, 400, "Fail", "Please enter all deatails.");
    }

    const newMovie = await Movie.create({
      img,
      title,
      publish_year,
    });

    // res.status(201).json({
    //   status: "Success",
    //   message: "New Movie created successfully",
    //   data: newMovie,
    // });

    return sendSuccess(
      res,
      201,
      "Success",
      "New Movie created successfully.",
      newMovie
    );
  } catch (error) {
    return sendError(res, 500, "Fail", "Internel Server Error.");
  }
};

// =============================== All Movies =============================

exports.getAllMovies = async (req, res) => {
  try {
    const { page = 1, pageSize = 8 } = req.query;
    const offset = (page - 1) * pageSize;

    const movies = await Movie.findAll({
      limit: parseInt(pageSize),
      offset: offset,
    });

    // res.status(200).json({
    //   status: "Success",
    //   message: "All movies fetched successfully!",
    //   count: movies.length || 0,
    //   data: movies,
    // });
    return sendSuccess(
      res,
      200,
      "Success",
      "All movies fetched successfully.",
      movies
    );
  } catch (error) {
    return sendError(res, 500, "Fail", "Internel Server Error.");
  }
};
// =============================== Single Movie =============================

exports.getSingleMovie = async (req, res) => {
  try {
    const movieId = parseInt(req.params.movieId);
    const movie = await Movie.findByPk(movieId);

    if (!movie) {
      return sendError(res, 404, "Fail", "Movie not found.");
    }

    // return res.json({
    //   status: "Success",
    //   message: "Movie Found Successfully.",
    //   movie,
    // });
    return sendSuccess(res, 200, "Success", "Movie Found Successfully.", movie);
  } catch (error) {
    return sendError(res, 500, "Fail", "Internel Server Error.");
  }
};

// =============================== All Movies =============================

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
      return sendError(res, 404, "Fail", "Movie not found.");
    }

    movie.title = title || movie.title;
    movie.publish_year = publish_year || movie.publish_year;

    if (imageUrl) {
      movie.img = imageUrl;
    }

    await movie.save();

    // res.status(200).json({
    //   status: "Success",
    //   message: "Movie updated successfully!",
    //   data: movie,
    // });
    return sendSuccess(
      res,
      200,
      "Success",
      "Movie updated successfully.",
      movie
    );
  } catch (error) {
    return sendError(res, 500, "Fail", "Internel Server Error.");
  }
};
