import { Filter } from "../../../controllers/user/filter";
import User from "../../../models/user";


describe("User filter", () => {
    beforeEach(async () => {
        await User.destroy({ where: {} });
    });

    test('test filter by name', async () => {
        await User.bulkCreate([
            { email: 'user1@example.com', name: "User One", password: "password1", type: "regular" },
            { email: 'user2@example.com', name: "User Two", password: "password2", type: "regular" },
            { email: 'user3@example.com', name: "User Three", password: "password3", type: "regular" },
        ]);

        const filter = new Filter();
        const filteredUsers = await filter.filter({
            name: "User One"
        });

        expect(filteredUsers).toHaveLength(1);
        expect(filteredUsers[0].name).toBe("User One");
    });

    test('test filter by createdAt without operator', async () => {
        await User.bulkCreate([
            { email: 'user1@example.com', name: "User One", password: "password1", type: "regular"},
            { email: 'user2@example.com', name: "User Two", password: "password2", type: "regular"},
            { email: 'user3@example.com', name: "User Three", password: "password3", type: "regular"},
        ]);

        const users = await User.findAll();

        const filter = new Filter();
        const filteredUsers = await filter.filter({
            createdAt: users[0].createdAt?.toISOString()
        });

        expect(filteredUsers).toHaveLength(3);
    });

    test('test filter by createdAt with operator', async () => {
        await User.bulkCreate([
            { email: 'user1@example.com', name: "User One", password: "password1", type: "regular"},
            { email: 'user2@example.com', name: "User Two", password: "password2", type: "regular"},
            { email: 'user3@example.com', name: "User Three", password: "password3", type: "regular"},
        ]);

        await new Promise(resolve => setTimeout(resolve, 1000));
        const userMeio = await User.create({ 
            email: 'user4@example.com', 
            name: "User Four", 
            password: "password4", 
            type: "regular"
        });

        await new Promise(resolve => setTimeout(resolve, 1000));
        const userFinal = await User.create({ 
            email: 'user5@example.com', 
            name: "User Five", 
            password: "password5", 
            type: "regular"
        });


        const users = await User.findAll();

        const filter = new Filter();
        const filteredUsersComCreationIgualAoPrimerosCriados = await filter.filter({
            createdAt: `eq__${users[0].createdAt?.toISOString()}`
        });
        const filteredUsersComCreationIgualAoUserMeio = await filter.filter({
            createdAt: `eq__${userMeio.createdAt?.toISOString()}`
        });
        const filteredUsersComCreationMaior = await filter.filter({
            createdAt: `gt__${userMeio.createdAt?.toISOString()}`
        });
        const filteredUsersComCreationMenor = await filter.filter({
            createdAt: `lt__${userMeio.createdAt?.toISOString()}`
        });
        const filteredUsersComCreationIgualOuMaior = await filter.filter({
            createdAt: `gte__${userMeio.createdAt?.toISOString()}`
        });
        const filteredUsersComCreationIgualOuMenor = await filter.filter({
            createdAt: `lte__${userMeio.createdAt?.toISOString()}`
        });

        expect(filteredUsersComCreationIgualAoPrimerosCriados).toHaveLength(3);
        expect(filteredUsersComCreationIgualAoUserMeio).toHaveLength(1);
        expect(filteredUsersComCreationMaior).toHaveLength(1);
        expect(filteredUsersComCreationMenor).toHaveLength(3);
        expect(filteredUsersComCreationIgualOuMaior).toHaveLength(2);
        expect(filteredUsersComCreationIgualOuMenor).toHaveLength(4);
    });
});