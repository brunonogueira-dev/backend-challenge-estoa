const date = new Date();

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            "subscriptions",
            [
                {
                    id: "4aa95197-0685-4bbf-a758-5fe142d443c1",
                    plan_id: "0f8ee519-e29c-4145-ab6f-3f0f64b99f7e",
                    user_id: "bfece7e2-1d5c-489c-80be-5b2750f89b2b",
                    created_at: Sequelize.literal("CURRENT_DATE"),
                    expiration_date: new Date(
                        date.setMonth(date.getMonth() + 1)
                    ),
                },
            ],
            { timestamps: true }
        );
    },

    down: async (queryInterface, _Sequelize) => {
        await queryInterface.bulkDelete("subscriptions", null, {});
    },
};
