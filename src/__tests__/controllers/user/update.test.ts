import { UpdateByPk } from "../../../controllers/user/update";
import User from "../../../models/user";



describe("User update", () => {
    beforeEach(async () => {
        await User.destroy({ where: {} });
    });

    test('test fail because user was not found', async () => {
        const updater = new UpdateByPk(0);

        try {
            await updater.update({
                email: "updated_email@example.com", 
                name: "Updated Name", 
                type: "updated_type", 
                password: "updated_password"
            });
            fail("Expected update to fail, but it succeeded.");
        } catch (error: any) {
            expect(error.message).toBe("User not found");
        }
    }, 100000);

    test('test upated name', async () => {
        const user = await User.create({ 
            email: 'test@example.com', 
            name: "Test User", 
            password: "testpassword", 
            type: "regular" 
        });
    
        const updater = new UpdateByPk(user.id);
        const updatedName = "Updated Name";
        await updater.update({name: updatedName});
    
        const updatedUser = await User.findByPk(user.id);
        expect(updatedUser?.name).toBe(updatedName);
    }, 100000);

    test('test updated email', async () => {
        const user = await User.create({ 
            email: 'test@example.com', 
            name: "Test User", 
            password: "testpassword", 
            type: "regular" 
        });
    
        const updater = new UpdateByPk(user.id);
        const updatedEmail = "updatedEmail@example.com";
        await updater.update({email: updatedEmail});
    
        const updatedUser = await User.findByPk(user.id);
        expect(updatedUser?.email).toBe(updatedEmail);
    }, 100000);

    test('test updated type', async () => {
        const user = await User.create({ 
            email: 'test@example.com', 
            name: "Test User", 
            password: "testpassword", 
            type: "regular" 
        });
    
        const updater = new UpdateByPk(user.id);
        const updatedType = "Updated type";
        await updater.update({type: updatedType});
    
        const updatedUser = await User.findByPk(user.id);
        expect(updatedUser?.type).toBe(updatedType);
    }, 100000);

    test('test updated password', async () => {
        const user = await User.create({ 
            email: 'test@example.com', 
            name: "Test User", 
            password: "testpassword", 
            type: "regular" 
        });
        const oldPassword = user.password;
    
        const updater = new UpdateByPk(user.id);
        const updatedPassword = "updated_password";
        await updater.update({password: updatedPassword});
    
        const updatedUser = await User.findByPk(user.id);
        expect(updatedUser?.password).not.toBe(oldPassword);

        const userAutenticated = User.authenticate(user.email, updatedPassword);
        expect(userAutenticated).toBeTruthy();
    }, 100000);

    test('test updatedAt changed', async () => {
        const user = await User.create({ 
            email: 'test@example.com', 
            name: "Test User", 
            password: "testpassword", 
            type: "regular" 
        });
    
        const initialUpdatedAt = user.updatedAt;
        const updater = new UpdateByPk(user.id);
    
        await new Promise(resolve => setTimeout(resolve, 1000));
    
        await updater.update({ email: "updated_email@example.com" });
    
        const updatedUser = await User.findByPk(user.id);
        expect(updatedUser?.updatedAt).not.toEqual(initialUpdatedAt);
    }, 100000);
});