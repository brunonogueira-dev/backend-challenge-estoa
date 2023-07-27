import { Dialect, Sequelize } from "sequelize";
require("dotenv").config();

const dbName = (process.env.DB_NAME as string) || "root";
const dbUser = (process.env.DB_USER as string) || "password";
const dbHost = process.env.DB_HOST || "localhost";
const dbDriver = (process.env.DB_DRIVER as Dialect) || "mysql";
const dbPassword = process.env.DB_PASSWORD || "password";

const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: dbDriver,
});

export default sequelizeConnection;
