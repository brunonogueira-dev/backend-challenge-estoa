import UserCreator from "../../../controllers/user/create";
import Plan from "../../../models/plan";
import Signature from "../../../models/signature";
import User from "../../../models/user";


describe("User creation", () => {
    beforeEach(async() => {
        await User.destroy({ where: {} });
    });

    test("test ok user is created inside the database", async() => {
        const email = "test@example.com";
        const name = "Test User";
        const password = "testpassword";
        const type = "regular";

        const userCreator = new UserCreator(email, name, password, type);
        const user = await userCreator.create();

        expect(user).toBeTruthy();
        expect(user?.name).toBe(name);
        expect(user?.email).toBe(email);
        expect(user?.type).toBe(type);
    }, 100000);

    test("test ok user is created and have signature free", async() => {
        const email = "test@example.com";
        const name = "Test User";
        const password = "testpassword";
        const type = "regular";

        const userCreator = new UserCreator(email, name, password, type);
        const user = await userCreator.create();
        const freePlan = await Plan.findOne({ where: { name: "free" } });

        const sigs = await Signature.findAll();

        if (user && freePlan) {
            expect(sigs).toHaveLength(1);
            expect(sigs[0].userId).toBe(user.id);
            expect(sigs[0].planId).toBe(freePlan.id);

            const now = Date.now();
            const SigExpire = sigs[0].expiration?.getTime() || 0;
            const differenceInMilliseconds = SigExpire - now;
            const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));

            expect(differenceInDays).toBeGreaterThanOrEqual(29);
        } else {
            fail("fail to find user and free plan");
        }
    }, 100000);

    test("test ok user receive user from object", async() => {
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
    }, 100000);

    test("test ok user password is encrypted", async() => {
        const email = "test@example.com";
        const name = "Test User";
        const password = "testpassword";
        const type = "regular";

        const userCreator = new UserCreator(email, name, password, type);
        const user = await userCreator.create();

        expect(user).toBeTruthy();
        expect(user?.password).not.toBe(password);
    }, 100000);

    test("test fail because email is in the wrong format", async() => {
        const email = "invalidemail";
        const name = "Test User";
        const password = "testpassword";
        const type = "regular";

        const userCreator = new UserCreator(email, name, password, type);
        const user = await userCreator.create();

        expect(user).toBeNull();
    }, 100000);

    test("test fail because user with given email already exists", async() => {
        const email = "test@example.com";
        const name = "Test User";
        const password = "testpassword";
        const type = "regular";

        await User.create({ email, name: "Other User", password: "otherpassword", type: "other" });

        const userCreator = new UserCreator(email, name, password, type);
        const user = await userCreator.create();

        expect(user).toBeNull();
    }, 100000);

    test("test fail because email was not given", async() => {
        const name = "Test User";
        const password = "testpassword";
        const type = "regular";

        const userCreator = new UserCreator("", name, password, type);
        const user = await userCreator.create();

        expect(user).toBeNull();
    }, 100000);

    test("test fail because name was not given", async() => {
        const email = "test@example.com";
        const password = "testpassword";
        const type = "regular";

        const userCreator = new UserCreator(email, "", password, type);
        const user = await userCreator.create();

        expect(user).toBeNull();
    }, 100000);

    test("test fail because password was not given", async() => {
        const email = "test@example.com";
        const name = "Test User";
        const type = "regular";

        const userCreator = new UserCreator(email, name, "", type);
        const user = await userCreator.create();

        expect(user).toBeNull();
    }, 100000);

    test("test fail because type was not given", async() => {
        const email = "test@example.com";
        const name = "Test User";
        const password = "testpassword";

        const userCreator = new UserCreator(email, name, password, "");
        const user = await userCreator.create();

        expect(user).toBeNull();
    }, 100000);
});