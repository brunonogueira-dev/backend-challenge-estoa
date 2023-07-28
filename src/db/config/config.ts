import { Options } from "sequelize";

const config: Options = {
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_NAME || "desafio",
    host: process.env.DB_HOST || "db",
    port: Number(process.env.DB_PORT) || 3306,
    dialect: "mysql",
    logging: false,
};
export = config;
