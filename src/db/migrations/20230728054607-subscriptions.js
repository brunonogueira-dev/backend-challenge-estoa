module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("subscriptions", {
            id: {
                primaryKey: true,
                type: Sequelize.STRING,
            },
            planId: {
                type: Sequelize.STRING,
                allowNull: false,
                field: "plan_id",
                references: { model: "plans", key: "id" },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            userId: {
                type: Sequelize.STRING,
                allowNull: false,
                field: "user_id",
                references: { model: "users", key: "id" },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATEONLY,
                field: "created_at",
            },
            expirationDate: {
                type: Sequelize.DATEONLY,
                field: "expiration_date",
            },
        });
    },

    async down(queryInterface, _Sequelize) {
        await queryInterface.dropTable("subscriptions");
    },
};
