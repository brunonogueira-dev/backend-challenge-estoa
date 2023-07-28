import { Op } from "sequelize";
import { DeleteByPk } from "../../../controllers/plan/delete";
import Plan from "../../../models/plan";


describe("Plan deletion", () => {
    beforeEach(async() => {
        await Plan.destroy({ where: {
            name: {
                [Op.not]: "free"
            }
        } });
    });

    test("test delete ok", async() => {
        const plan = await Plan.create({ 
            name: "Test Plan",
            price: 2000,
            expiration: 1
        });

        const deleter = new DeleteByPk(plan.id);
        await deleter.delete();

        const deletedUser = await Plan.findByPk(plan.id);
        expect(deletedUser).toBeNull();
    }, 100000);

    test("test delete fail because plan not found", async() => {
        const freePlan = await Plan.findOne({ where: { name: "free" } });
        const deleter = new DeleteByPk(freePlan ? freePlan.id + 1 : 1);
        try {
            await deleter.delete();
            fail("Expected delete to fail, but it succeeded.");
        } catch (e: any) {
            expect(e.message).toBe("Plan not found");
        }
    }, 100000);
});