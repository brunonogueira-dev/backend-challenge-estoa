const date = new Date();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'assinaturas',
      [{
        id: 1,
        id_plano: 1,
        id_usuario: 1,
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        data_de_expiracao: new Date(date.setMonth(date.getMonth() + 1)), 
      },
      ],

      { timestamps: true },
    );
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('assinaturas', null, {});
  },
};
