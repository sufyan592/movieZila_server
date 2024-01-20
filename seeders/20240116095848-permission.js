"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("permissions", [
      {
        name: "create",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "edit",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "delete",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("permissions", {
      name: ["create", "edit", "delete"],
    });
  },
};
