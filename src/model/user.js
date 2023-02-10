const sequelize = require('sequelize');
const db = require('../data/sql');
const plan = require('./plan');
const sub = require('./sub');

const users = db.define('Users', {
    UserID: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    UserName: {
        type: sequelize.STRING,
        allowNull: false
    },
    UserEmail: {
        type: sequelize.STRING,
        allowNull: false
    },
    UserType: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    UserCreatedOn: {
        type: sequelize.DATE,
        allowNull: false
    },
}, { timestamps: false });

users.belongsToMany(plan, {
    through: {
        model: sub
    },
    foreignKey: 'UserID',
    constraint: true
});

plan.belongsToMany(users, {
    through: {
        model: sub
    },
    foreignKey: 'PlanID',
    constraint: true
});

module.exports = users