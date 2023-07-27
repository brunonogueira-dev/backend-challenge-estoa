"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("users", {
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
      email: {
        allowNull: false,
        type: Sequelize.STRING(255),
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING(255),
      },
      typeUser: {
        allowNull: false,
        type: Sequelize.STRING(255),
      },
      createdAt: { 
        allowNull: false, 
        type: Sequelize.DATE, 
       },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable("users");
  },
};
