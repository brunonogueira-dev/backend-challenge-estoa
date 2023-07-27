"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("signature", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        references: {
          key: "id",
          model: "users"
        },
        type: Sequelize.DataTypes.INTEGER,
      },
      planId: {
        references: {
          key: "id",
          model: "plans"
        },
        type: Sequelize.DataTypes.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      expiryDate: {
        allowNull: false,
        type: Sequelize.STRING(10),
      }
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable("signature");
  },
};