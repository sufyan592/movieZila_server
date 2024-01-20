const { sendSuccess } = require("../constant/success-handler");
const { favourite_Movies, Movie, User } = require("../models");

// =============================== Faviroute Movies =============================

exports.getAllFavourites = async (req, res) => {
  try {
    const userId = req.params.userId;
    // const permissions = req.permissions;
    // console.log(permissions);

    const user = await User.findByPk(userId);
    if (!user) {
      return sendError(res, 400, "Fail", "User not found.");
    }

    const favourites = await favourite_Movies.findAll({
      where: { userId: userId },
      // include: Movie,
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
    console.error(err);
    return sendError(res, 500, "Fail", "Internel Server Error.");
  }
};

// =============================== Assign & Remove Faviroute Movies =============================

exports.updateFavirouteMovie = async (req, res, next) => {
  try {
    const { userId, movieId } = req.body;
    const existingFavorite = await favourite_Movies.findOne({
      where: { userId, movieId },
    });

    if (!existingFavorite) {
      await favourite_Movies.create({
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
      await favourite_Movies.destroy({
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
    return sendError(res, 500, "Fail", "Internel Server Error.");
  }
};
