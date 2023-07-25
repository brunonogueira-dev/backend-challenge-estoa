import { Dialect, Sequelize } from "sequelize";
import dotenv from "dotenv/config.js";

const dbType = process.env.DB;
const dbName = process.env.DB_NAME || "";
const dbUser = process.env.DB_USER || "";
const dbHost = process.env.DB_HOST || "";
const dbPassword = process.env.DB_PASSWORD || "";

const db = new Sequelize(dbName, dbUser, dbPassword, {
    dialect: dbType as Dialect,
    host: dbHost,
});

db.authenticate();

export default db;