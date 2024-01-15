const { favourite_Movies } = require("../models");

// exports.fav_Movies = async (req, res, next) => {
//   try {
//     const { userId, movieId } = req.body;

//     // Check if the user has already added this movie to favorites
//     const existingFavorite = await favourite_Movies.findOne({
//       where: { userId, movieId },
//     });

//     if (!existingFavorite) {
//       // If not, add the movie to the favorites
//       await favourite_Movies.create({
//         userId,
//         movieId,
//       });

//       console.log(
//         `Movie with ID ${movieId} added to favorites for user ${userId}`
//       );
//       return res.status(200).json({
//         success: true,
//         message: "Movie added to favorites successfully",
//       });
//     } else {
//       console.log(
//         `Movie with ID ${movieId} is already in favorites for user ${userId}`
//       );
//       return res
//         .status(200)
//         .json({ success: false, message: "Movie is already in favorites" });
//     }
//   } catch (error) {
//     // Handle any errors that occur during the process
//     console.error("Error adding movie to favorites:", error.message);
//     return res
//       .status(500)
//       .json({ success: false, error: "Internal Server Error" });
//   }

//   next();
// };
exports.fav_Movies = async (req, res, next) => {
  try {
    const { userId, movieId } = req.body;

    // Check if the user has already added this movie to favorites
    const existingFavorite = await favourite_Movies.findOne({
      where: { userId, movieId },
    });

    if (!existingFavorite) {
      // If not, add the movie to the favorites
      await favourite_Movies.create({
        userId,
        movieId,
      });

      console.log(
        `Movie with ID ${movieId} added to favorites for user ${userId}`
      );
      return res.status(200).json({
        success: true,
        message: "Movie added to favorites successfully",
      });
    } else {
      // If matched, remove the movie from favorites
      await favourite_Movies.destroy({
        where: { userId, movieId },
      });

      console.log(
        `Movie with ID ${movieId} removed from favorites for user ${userId}`
      );
      return res.status(200).json({
        success: true,
        message: "Movie removed from favorites successfully",
      });
    }
  } catch (error) {
    // Handle any errors that occur during the process
    console.error(
      "Error adding/removing movie to/from favorites:",
      error.message
    );
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }

  next();
};
