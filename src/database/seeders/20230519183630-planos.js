module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'planos',
      [{
        id: 1,
        nome: 'Grátis',
        preco: 0,
        periodo: 1,
        created_at: Sequelize.literal('CURRENT_TIMESTAMP') },
      {
        id: 2,
        nome: 'Básico',
        preco: 1000,
        periodo: 12,
        created_at: Sequelize.literal('CURRENT_TIMESTAMP') },
      ],

      { timestamps: true },
    );
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('planos', null, {});
  },
};
