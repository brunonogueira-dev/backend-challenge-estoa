module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert(
      'planos',
      [{
        id: 1,
        nome: 'Grátis',
        preco: 0,
        periodo: 1,
        dataDeCriacao: '2021-04-12' },
      {
        id: 2,
        nome: 'Básico',
        preco: 1000,
        periodo: 12,
        dataDeCriacao: '2021-04-12' },
      ],

      { timestamps: true },
    );
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('planos', null, {});
  },
};
