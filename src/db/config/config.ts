import { Dialect, Sequelize } from "sequelize";
require("dotenv").config();

const dbName = (process.env.DB_NAME as string) || "desafio";
const dbUser = (process.env.DB_USERNAME as string) || "root";
const dbHost = (process.env.DB_HOST as string) || "localhost";
const dbDriver = (process.env.DB_DRIVER as Dialect) || "mysql";
const dbPassword = (process.env.DB_PASSWORD as string) || "password";

const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: dbDriver,
    logging: false,
});

export default sequelizeConnection;
