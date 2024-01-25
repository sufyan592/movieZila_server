"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Rename the table from old_table to new_table
    await queryInterface.renameTable("favourite_Movies", "faviroteMovies");
  },

  down: async (queryInterface, Sequelize) => {
    // In case you need to rollback the change
    await queryInterface.renameTable("faviroteMovies", "favourite_Movies");
  },
};
