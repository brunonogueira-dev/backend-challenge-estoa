const sequelize = require('sequelize');
const conn = new sequelize(
    'estoadb',
    'azuredev',
    'Faculdade,22', { host: 'pim-paulista.mysql.database.azure.com', dialect: 'mysql' });

conn.authenticate().then(() => {
    console.log("Conexão com o banco de dados estabelecida! ✅");
}).catch(() => {
    console.log("Error ao se conectar ao banco de dados! ❌");
});

module.exports = conn;