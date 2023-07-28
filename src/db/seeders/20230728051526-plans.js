module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            "plans",
            [
                {
                    id: "0f8ee519-e29c-4145-ab6f-3f0f64b99f7e",
                    name: "free",
                    price: 0,
                    expires_in: 1,
                    created_at: Sequelize.literal("CURRENT_DATE"),
                },
                {
                    id: "90d0c4a8-721f-429a-a36f-953a9b8e5b2f",
                    name: "basic",
                    price: 9.99,
                    expires_in: 3,
                    created_at: Sequelize.literal("CURRENT_DATE"),
                },
            ],
            { timestamps: true }
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("plans", null, {});
    },
};
