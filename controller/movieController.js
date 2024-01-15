const multer = require("multer");
const path = require("path");
const { Movie, User, favourite_Movies } = require("../models");

// =============================== Multer For Image Upload =============================

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join("./public/images"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

exports.upload = multer({ storage: storage });

// =============================== Create a new Movie =============================

exports.createMovie = async (req, res) => {
  try {
    const { title, publish_year } = req.body;
    const img = req.file ? req.file.filename : null;

    const newMovie = await Movie.create({
      img,
      title,
      publish_year,
    });

    res.status(201).json({
      status: "Success",
      message: "New Movie created successfully",
      data: newMovie,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Fail",
      error,
    });
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

    res.status(200).json({
      status: "Success",
      message: "All movies fetched successfully!",
      count: movies.length,
      data: movies,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Fail",
      error: "Internal Server Error",
    });
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
      return res.status(404).json({
        status: "Fail",
        error: "Movie not found",
      });
    }

    if (!title && !publish_year && !imageUrl) {
      return res.status(400).json({
        status: "Fail",
        error: "No fields provided for editing",
      });
    }

    movie.title = title || movie.title;
    movie.publish_year = publish_year || movie.publish_year;

    if (imageUrl) {
      movie.img = imageUrl;
    }

    await movie.save();

    res.status(200).json({
      status: "Success",
      message: "Movie updated successfully!",
      data: movie,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Fail",
      error: "Internal Server Error",
    });
  }
};

// =============================== Faviroute Movies =============================

exports.getAllFavourites = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userFavourites = await favourite_Movies.findAll({
      where: { userId: userId },
      include: Movie,
      include: [{ model: Movie, attributes: ["title", "publish_year", "img"] }],
    });

    res.status(200).json({ favourites: userFavourites });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
