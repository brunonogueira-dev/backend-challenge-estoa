import PlanCreator from "../../../src/controllers/plan/create";
import SignatureCreator from "../../../src/controllers/signatures/create";
import UserCreator from "../../../src/controllers/user/create";
import Plan from "../../../src/models/plan";
import Signature from "../../../src/models/signature";
import User from "../../../src/models/user";

const __createPlan__ = async () => {
    const name = "Test plan";
    const price = 2000;
    const expiration = 2;

    const planCreator = new PlanCreator(name, price, expiration);
    return await planCreator.create();
} 

const __createUser__ = async () => {
    const email = "test@example.com";
    const name = "Test User";
    const password = "testpassword";
    const type = "regular";

    const userCreator = new UserCreator(email, name, password, type);
    return await userCreator.create();
}

describe("Signature creation", () => {
    beforeEach(async () => {
        await Signature.destroy({ where: {} });
        await Plan.destroy({ where: {} });
        await User.destroy({ where: {} });
    });

    test('test ok signature is created', async () => {
        const plan = await __createPlan__();
        const user = await __createUser__();

        if (plan && user) {
            const signatureCreator = new SignatureCreator(user, plan);
            const signature = await signatureCreator.create();

            if (signature) {
                const sigUser = await signature?.userId;
                const sigPlan = await signature?.planId;

                const now = Date.now();
                const expirationDate = signature?.expiration?.getTime() || 0;
                const differenceInMilliseconds = expirationDate - now;
                const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));

                expect(sigPlan).toBe(plan.id);
                expect(sigUser).toBe(user.id);
                expect(differenceInDays).toBeGreaterThanOrEqual(29);
            } else{
                fail("Failed while trying to create signature")
            }
        } else {
            fail('Failed while trying to create plan and user')
        }
    }, 100000);
});