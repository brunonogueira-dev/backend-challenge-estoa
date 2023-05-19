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
      createdAt: { allowNull: false, type: Sequelize.DATE, field: 'created_at' },
    });
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('planos');
  },
};
