import { Op } from "sequelize";
import PlanCreator from "../../../controllers/plan/create";
import SignatureCreator from "../../../controllers/signatures/create";
import ChangeSignature from "../../../controllers/signatures/update";
import UserCreator from "../../../controllers/user/create";
import Plan from "../../../models/plan";
import Signature from "../../../models/signature";
import User from "../../../models/user";


const __createPlan__ = async(n: number) => {
    const name = `Test plan ${n}`;
    const price = 2000;
    const expiration = 2;

    const planCreator = new PlanCreator(name, price, expiration);
    return await planCreator.create();
}; 

const __createUser__ = async(n: number) => {
    const email = `test${n}@example.com`;
    const name = `Test User${n}`;
    const password = "testpassword";
    const type = "regular";

    const userCreator = new UserCreator(email, name, password, type);
    return await userCreator.create();
};

describe("Signature change plan", () => {
    beforeEach(async() => {
        await Signature.destroy({ where: {} });
        await Plan.destroy({ where: {
            name: {
                [Op.not]: "free"
            }
        } }); 
        await User.destroy({ where: {} });

        for (let i = 0; i < 2; i++) {
            await __createPlan__(i);
        }
    
        for (let i = 0; i < 2; i++) {
            await __createUser__(i);
        }
    });

    test("test plan changed", async() => {
        const plans = await Plan.findAll({ where: {
            name: {
                [Op.not]: "free"
            }
        } });
        const users = await User.findAll();

        const creator = new SignatureCreator(users[0], plans[0]);
        const sig = await creator.create();

        if (sig) {
            const updater = new ChangeSignature(sig.id, plans[1]);
            const sigUpdated = await updater.change();

            expect(sigUpdated.planId).toBe(plans[1].id);
        } else {
            fail("Failed trying to create signature");
        }
    }, 100000);

    test("test fail because cant find signature", async() => {
        const plans = await Plan.findAll({ where: {
            name: {
                [Op.not]: "free"
            }
        } });
        const users = await User.findAll();

        const creator = new SignatureCreator(users[0], plans[0]);
        const sig = await creator.create();

        if (sig) {
            const updater = new ChangeSignature(sig.id + 5, plans[1]);
            try {
                await updater.change();
                fail("Expected update to fail, but it succeeded.");
            } catch (error: any) {
                expect(error.message).toBe("Signature not found");
            }
        } else {
            fail("Failed trying to create signature");
        }
    }, 100000);
});