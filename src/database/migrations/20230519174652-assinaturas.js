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
      createdAt: { allowNull: false, type: Sequelize.DATE, field: 'created_at' },
      dataDeExpiracao: { type: Sequelize.DATE, field: 'data_de_expiracao' },
    });
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('assinaturas');
  },
};
