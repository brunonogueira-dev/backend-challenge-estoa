const sequelize = require('sequelize');
const db = require('../data/sql');

const plan = db.define('Plans', {
    PlanID: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    PlanName: {
        type: sequelize.STRING,
        allowNull: false
    },
    PlanPrice: {
        type: sequelize.FLOAT,
        allowNull: false
    },
    PlanPeriod: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    UserCreatedOn: {
        type: sequelize.DATE,
        allowNull: false
    },
}, { timestamps: false });

module.exports = plan