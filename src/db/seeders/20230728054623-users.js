module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            "users",
            [
                {
                    id: "bfece7e2-1d5c-489c-80be-5b2750f89b2b",
                    name: "Bruno",
                    email: "bruno_signorelli@outlook.com",
                    password: "senhasegura",
                    plan_type: "free",
                    created_at: Sequelize.literal("CURRENT_DATE"),
                },
            ],
            { timestamps: true }
        );
    },

    down: async (queryInterface, _Sequelize) => {
        await queryInterface.bulkDelete("users", null, {});
    },
};
