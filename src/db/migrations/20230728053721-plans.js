module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("plans", {
            id: {
                primaryKey: true,
                type: Sequelize.STRING,
            },
            name: { type: Sequelize.STRING, allowNull: false },
            price: { type: Sequelize.FLOAT(5, 2), allowNull: false },
            expiresIn: {
                type: Sequelize.INTEGER,
                allowNull: false,
                field: "expires_in",
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATEONLY,
                field: "created_at",
            },
        });
    },

    async down(queryInterface, _Sequelize) {
        await queryInterface.dropTable("plans");
    },
};
