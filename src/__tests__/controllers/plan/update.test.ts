import { Op } from "sequelize";
import { UpdateByPk } from "../../../controllers/plan/update";
import Plan from "../../../models/plan";


describe("Plan update", () => {
    beforeEach(async () => {
        await Plan.destroy({ where: {
            name: {
                [Op.not]: 'free'
            }
        }});
    });

    test('test fail because plan was not found', async () => {
        const updater = new UpdateByPk(0);

        try {
            const updated = await updater.update({
                name: "Updated Name",
                price: 1000,
                expiration: 2
            });
            expect(updated).not.toBeTruthy();
        } catch (error: any) {
            expect(error.message).toBe("Plan not found");
        }
    }, 100000);

    test('test upated name', async () => {
        const plan = await Plan.create({ 
            name: "Test Plan",
            price: 2000,
            expiration: 1
        });
    
        const updater = new UpdateByPk(plan.id);
        const updatedName = "Updated Name";
        await updater.update({name: updatedName});
    
        const updatedPlan = await Plan.findByPk(plan.id);
        expect(updatedPlan?.name).toBe(updatedName);
    }, 100000);

    test('test upated price', async () => {
        const plan = await Plan.create({ 
            name: "Test Plan",
            price: 2000,
            expiration: 1
        });
    
        const updater = new UpdateByPk(plan.id);
        const updatedPrice = 3000;
        await updater.update({price: updatedPrice});
    
        const updatedPlan = await Plan.findByPk(plan.id);
        expect(updatedPlan?.price).toBe(updatedPrice);
    }, 100000);

    test('test upated expire', async () => {
        const plan = await Plan.create({ 
            name: "Test Plan",
            price: 2000,
            expiration: 1
        });
    
        const updater = new UpdateByPk(plan.id);
        const updatedExpire = 3;
        await updater.update({expiration: updatedExpire});
    
        const updatedPlan = await Plan.findByPk(plan.id);
        expect(updatedPlan?.expiration).toBe(updatedExpire);
    }, 100000);

    test('test updatedAt changed', async () => {
        const plan = await Plan.create({ 
            name: "Test Plan",
            price: 2000,
            expiration: 1
        });
    
        const initialUpdatedAt = plan.updatedAt;
        const updater = new UpdateByPk(plan.id);
    
        await new Promise(resolve => setTimeout(resolve, 1000));
    
        await updater.update({ name: "Updated Name" });
    
        const updatedUser = await Plan.findByPk(plan.id);
        expect(updatedUser?.updatedAt).not.toEqual(initialUpdatedAt);
    }, 100000);
});