import { Op } from "sequelize";
import PlanCreator from "../../../controllers/plan/create";
import SignatureCreator from "../../../controllers/signatures/create";
import { GetSignatureByUserPk, GetUserSignaturePk } from "../../../controllers/signatures/get";
import UserCreator from "../../../controllers/user/create";
import Plan from "../../../models/plan";
import Signature from "../../../models/signature";
import User from "../../../models/user";


export const __createPlan__ = async (n: number) => {
    const name = `Test plan ${n}`;
    const price = 2000;
    const expiration = 2;

    const planCreator = new PlanCreator(name, price, expiration);
    return await planCreator.create();
} 

export const __createUser__ = async (n: number) => {
    const email = `test${n}@example.com`;
    const name = `Test User${n}`;
    const password = "testpassword";
    const type = "regular";

    const userCreator = new UserCreator(email, name, password, type);
    return await userCreator.create();
}

describe("Signature retrive", () => {
    beforeEach(async () => {
        await Signature.destroy({ where: {} });
        await Plan.destroy({ where: {
            name: {
                [Op.not]: 'free'
            }
        }});
        await User.destroy({ where: {} });

        for (let i = 0; i < 2; i++) {
            await __createPlan__(i);
        }
    
        for (let i = 0; i < 2; i++) {
            await __createUser__(i);
        }
    });

    test('test get by user and retrive users and plans', async () => {
        const plans = await Plan.findAll({ where: {
            name: {
                [Op.not]: 'free'
            }
        }});
        const users = await User.findAll();

        const creator1 = new SignatureCreator(users[0], plans[0]);
        await creator1.create();

        const creator2 = new SignatureCreator(users[0], plans[1]);
        await creator2.create();

        const creator3 = new SignatureCreator(users[1], plans[0]);
        await creator3.create();

        const freePlan = await Plan.findAll({ where: {
            name: 'free'
        }});

        const getter1 = new GetSignatureByUserPk(users[0].id);
        let signatures1 = await getter1.get();

        expect(signatures1).toHaveLength(3);
        
        signatures1 = signatures1.filter(sig => sig.planId !== freePlan[0].id);

        const getter2 = new GetSignatureByUserPk(users[1].id);
        let signatures2 = await getter2.get();

        expect(signatures2).toHaveLength(2);

        signatures2 = signatures2.filter(sig => sig.planId !== freePlan[0].id);

        expect(signatures1).toHaveLength(2);
        expect(signatures2).toHaveLength(1);
        expect(signatures1[0].userId).toBe(users[0].id);
        expect(signatures1[1].userId).toBe(users[0].id);
        expect(signatures2[0].userId).toBe(users[1].id);
        expect(signatures1[0].planId).toBe(plans[0].id);
        expect(signatures1[1].planId).toBe(plans[1].id);
        expect(signatures2[0].planId).toBe(plans[0].id);
    }, 100000);

    test('test get user by signature pk', async () => {
        const plans = await Plan.findAll();
        const users = await User.findAll();

        const creator1 = new SignatureCreator(users[0], plans[0]);
        const sig = await creator1.create();

        if (sig) {

            const getter = new GetUserSignaturePk(sig.id);
            const user = await getter.get();

            expect(user).toBeTruthy();
            expect(user).toEqual(users[0]);
        } else {
            fail("Failed trying to create signature");
        }

        const getter2 = new GetUserSignaturePk(-1);
        try {
            const user = await getter2.get();

            if (user) {
                fail("Should have thrown an error");
            }
        } catch(_) {
        }
    }, 100000);
});