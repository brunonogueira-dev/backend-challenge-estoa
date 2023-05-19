module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('planos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nome: { type: Sequelize.STRING },
      preco: { type: Sequelize.INTEGER },
      periodo: { type: Sequelize.INTEGER },
      dataDeCriacao: { type: Sequelize.DATE },
    });
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('planos');
  },
};
