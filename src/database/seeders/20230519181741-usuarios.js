module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'usuarios',
      [{
        id: 1,
        nome: 'Eduardo',
        email: 'eduardo@challeng.com',
        senha: 'senha',
        tipo: 'Grátis',
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      ],

      { timestamps: true },
    );
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('usuarios', null, {});
  },
};
