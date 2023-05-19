module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('usuarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nome: { type: Sequelize.STRING },
      email: { type: Sequelize.STRING },
      senha: { type: Sequelize.STRING },
      tipo: { type: Sequelize.STRING },
      createdAt: { allowNull: false, type: Sequelize.DATE, field: 'created_at' },
    });
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('usuarios');
  },
};
