const sequelize = require('sequelize');
const db = require('../data/sql');

const sub = db.define('Subscribe', {
    SubID: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    UserID: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    PlanID: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    SubCreatedOn: {
        type: sequelize.DATE,
        allowNull: false
    },
    SubExpirationOn: {
        type: sequelize.DATE,
        allowNull: false
    },
}, { timestamps: false });

module.exports = sub