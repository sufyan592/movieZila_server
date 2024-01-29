const { sendSuccess } = require("../helpers/response");
const { favirote_Movies, Movie, User } = require("../models");

// =============================== Faviroute Movies =============================

exports.getAllFavourites = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findByPk(userId);
    if (!user) {
      return sendError(res, 400, "Error", "User not found.");
    }

    const favourites = await favirote_Movies.findAll({
      where: { userId: userId },
      include: [{ model: Movie, attributes: ["title", "publish_year", "img"] }],
    });

    return sendSuccess(
      res,
      200,
      "Success",
      "Movie added to favorites successfully.",
      favourites
    );
  } catch (err) {
    return sendError(res, 500, "Error", "Internel Server Error.");
  }
};

// =============================== Assign & Remove Faviroute Movies =============================

exports.updateFavirouteMovie = async (req, res, next) => {
  try {
    const { userId, movieId } = req.body;
    const existingFavorite = await favirote_Movies.findOne({
      where: { userId, movieId },
    });

    if (!existingFavorite) {
      await favirote_Movies.create({
        userId,
        movieId,
      });

      return sendSuccess(
        res,
        200,
        "Success",
        "Movie added to favorites successfully."
      );
    } else {
      await favirote_Movies.destroy({
        where: { userId, movieId },
      });

      return sendSuccess(
        res,
        200,
        "Success",
        "Movie removed from favorites successfully."
      );
    }
  } catch (error) {
    return sendError(res, 500, "Error", "Internel Server Error.");
  }
};
