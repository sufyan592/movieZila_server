"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class userPermission extends Model {
    static associate(models) {
      userPermission.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      });
      userPermission.belongsTo(models.Permission, {
        foreignKey: "perId",
        onDelete: "CASCADE",
      });
    }
  }

  userPermission.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      perId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      sequelize,
      modelName: "userPermission",
    }
  );

  return userPermission;
};
