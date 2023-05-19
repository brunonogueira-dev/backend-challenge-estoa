module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('assinaturas', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      idPlano: { allowNull: false,
        type: Sequelize.INTEGER,
        field: 'id_plano',
        references: { model: 'planos', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE' },
      idUsuario: { allowNull: false,
        type: Sequelize.INTEGER,
        field: 'id_usuario',
        references: { model: 'usuarios', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      dataDeCriacao: { type: Sequelize.DATE },
      dataDeExpiracao: { type: Sequelize.DATE },
    });
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('assinaturas');
  },
};
