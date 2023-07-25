import { Sequelize } from "sequelize";
import 'dotenv/config';

const dbName = process.env.DB_NAME || "";
const dbUser = process.env.DB_USER || "";
const dbHost = process.env.DB_HOST || "";
const dbPassword = process.env.DB_PASSWORD || "";

console.log("ENV", dbName, dbUser, dbPassword, dbHost)

const db = new Sequelize(dbName, dbUser, dbPassword, {
    dialect: "mysql",
    host: dbHost,
    port: 3306
});

db.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

export default db;