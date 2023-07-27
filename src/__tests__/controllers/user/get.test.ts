import { GetterAll, GetterByPk } from "../../../controllers/user/get";
import User from "../../../models/user";


describe("User retrive", () => {
    beforeEach(async () => {
        await User.destroy({ where: {} });
    });

    test('test get all retrive an empty list', async () => {
        const getter = new GetterAll();
        const users = await getter.get();
        expect(users).toHaveLength(0);
    }, 100000);

    test('test get all retrive the two created users', async () => {
        await User.bulkCreate([
            { 
                email: 'user1@example.com', 
                name: "User One", 
                password: "password1", 
                type: "regular" 
            },
            { 
                email: 'user2@example.com', 
                name: "User Two", 
                password: "password2", 
                type: "regular" 
            },
        ]);

        const getter = new GetterAll();
        const users = await getter.get();
        expect(users).toHaveLength(2);
    }, 100000);

    test('test get user by pk fail because user does not exist', async () => {
        const user = await User.create({ 
            email: 'test@example.com', 
            name: "Test User", 
            password: "testpassword", 
            type: "regular" 
        });
        
        const getter = new GetterByPk(user.id + 1);
        const retrivedUser = await getter.get();
        expect(retrivedUser).toBeNull();
    }, 100000);

    test('test get user by pk retrived user instance', async () => {
        const user = await User.create({ 
            email: 'test@example.com', 
            name: "Test User", 
            password: "testpassword", 
            type: "regular" 
        });
    
        const getter = new GetterByPk(user.id);
        const retrievedUser = await getter.get();
        expect(retrievedUser).toEqual(expect.objectContaining({ 
            id: user.id, 
            name: "Test User", 
            email: 'test@example.com', 
            type: 'regular'
        }));
    }, 100000);
});