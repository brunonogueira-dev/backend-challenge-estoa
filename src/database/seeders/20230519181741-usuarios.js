module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert(
      'usuarios',
      [{
        id: 1,
        nome: 'Eduardo',
        email: 'eduardo@challeng.com',
        senha: 'senha',
        tipo: 'Grátis',
        dataDeCriacao: '2023-05-05',
      },
      ],

      { timestamps: true },
    );
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('usuarios', null, {});
  },
};
