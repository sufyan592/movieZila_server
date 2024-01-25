"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn(
      "userPermissions",
      "perId",
      "permissionId"
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn(
      "userPermissions",
      "permissionId",
      "perId"
    );
  },
};
