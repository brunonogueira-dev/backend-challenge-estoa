module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("users", {
            id: {
                primaryKey: true,
                type: Sequelize.STRING,
            },
            name: { type: Sequelize.STRING, allowNull: false },
            email: { type: Sequelize.STRING, allowNull: false },
            password: { type: Sequelize.STRING, allowNull: false },
            planType: { type: Sequelize.STRING, field: "plan_type" },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATEONLY,
                field: "created_at",
            },
        });
    },

    async down(queryInterface, _Sequelize) {
        await queryInterface.dropTable("users");
    },
};
