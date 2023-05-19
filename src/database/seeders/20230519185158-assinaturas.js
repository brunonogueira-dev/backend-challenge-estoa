module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert(
      'assinaturas',
      [{
        id: 1,
        id_plano: 1,
        id_usuario: 1,
        dataDeCriacao: '2023-06-12',
        dataDeExpiracao: '2023-07-12', 
      },
      ],

      { timestamps: true },
    );
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('assinaturas', null, {});
  },
};
