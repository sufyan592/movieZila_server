"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class faviroteMovies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define association with User and Movie models
      faviroteMovies.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      faviroteMovies.belongsTo(models.Movie, {
        foreignKey: "movieId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  faviroteMovies.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      movieId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "faviroteMovies",
    }
  );
  return faviroteMovies;
};
