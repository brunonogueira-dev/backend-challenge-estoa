import { DeleteByPk } from "../../../controllers/user/delete";
import User from "../../../models/user";


describe("User deletion", () => {
    beforeEach(async() => {
        await User.destroy({ where: {} });
    });

    test("test delete ok", async() => {
        const user = await User.create({ 
            email: "test@example.com", 
            name: "Test User", 
            password: "testpassword", 
            type: "regular" 
        });

        const deleter = new DeleteByPk(user.id);
        await deleter.delete();

        const deletedUser = await User.findByPk(user.id);
        expect(deletedUser).toBeNull();
    }, 100000);

    test("test delete fail because user not found", async() => {
        const deleter = new DeleteByPk(1);
        try {
            await deleter.delete();
            fail("Expected delete to fail, but it succeeded.");
        } catch (e: any) {
            expect(e.message).toBe("User not found");
        }
    }, 100000);
});