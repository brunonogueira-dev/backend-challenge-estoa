"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("plans", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(255),
      },
      price: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      expiryPeriod: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable("plans");
  },
};