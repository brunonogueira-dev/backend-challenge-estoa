import UserCreator from "../../../src/controllers/user/create";
import User from "../../../src/models/user";


describe("User creation", () => {
    beforeEach(async () => {
        await User.destroy({ where: {} });
    });

    test('test ok user is created inside the database', async () => {
        const email = "test@example.com";
        const name = "Test User";
        const password = "testpassword";
        const type = "regular";

        const userCreator = new UserCreator(email, name, password, type);
        const user = await userCreator.create();
        console.log(user)
        expect(user).toBeTruthy();
        expect(user?.name).toBe(name);
        expect(user?.email).toBe(email);
        expect(user?.type).toBe(type);
    });

    test('test ok user receive user from object', async () => {
        const email = "test@example.com";
        const name = "Test User";
        const password = "testpassword";
        const type = "regular";

        const userCreator = new UserCreator(email, name, password, type);
        const user = await userCreator.create();

        const foundUser = await User.findByPk(user?.id);

        expect(foundUser).toBeTruthy();
        expect(foundUser?.name).toBe(name);
        expect(foundUser?.email).toBe(email);
        expect(foundUser?.type).toBe(type);
    });

    test('test ok user password is encrypted', async () => {
        const email = "test@example.com";
        const name = "Test User";
        const password = "testpassword";
        const type = "regular";

        const userCreator = new UserCreator(email, name, password, type);
        const user = await userCreator.create();

        expect(user).toBeTruthy();
        expect(user?.password).not.toBe(password);
    });

    test('test fail because email is in the wrong format', async () => {
        const email = "invalidemail";
        const name = "Test User";
        const password = "testpassword";
        const type = "regular";

        const userCreator = new UserCreator(email, name, password, type);
        const user = await userCreator.create();

        expect(user).toBeNull();
    });

    test('test fail because user with given email already exists', async () => {
        const email = "test@example.com";
        const name = "Test User";
        const password = "testpassword";
        const type = "regular";

        // Create a user with the same email
        await User.create({ email, name: "Other User", password: "otherpassword", type: "other" });

        const userCreator = new UserCreator(email, name, password, type);
        const user = await userCreator.create();

        expect(user).toBeNull();
    });

    test('test fail because email was not given', async () => {
        const name = "Test User";
        const password = "testpassword";
        const type = "regular";

        const userCreator = new UserCreator("", name, password, type);
        const user = await userCreator.create();

        expect(user).toBeNull();
    });

    test('test fail because name was not given', async () => {
        const email = "test@example.com";
        const password = "testpassword";
        const type = "regular";

        const userCreator = new UserCreator(email, "", password, type);
        const user = await userCreator.create();

        expect(user).toBeNull();
    });

    test('test fail because password was not given', async () => {
        const email = "test@example.com";
        const name = "Test User";
        const type = "regular";

        const userCreator = new UserCreator(email, name, "", type);
        const user = await userCreator.create();

        expect(user).toBeNull();
    });

    test('test fail because type was not given', async () => {
        const email = "test@example.com";
        const name = "Test User";
        const password = "testpassword";

        const userCreator = new UserCreator(email, name, password, "");
        const user = await userCreator.create();

        expect(user).toBeNull();
    });
});