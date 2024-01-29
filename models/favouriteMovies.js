"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class favirote_Movies extends Model {
    static associate(models) {
      favirote_Movies.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      favirote_Movies.belongsTo(models.Movie, {
        foreignKey: "movieId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  favirote_Movies.init(
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
      modelName: "favirote_Movies",
    }
  );
  return favirote_Movies;
};
