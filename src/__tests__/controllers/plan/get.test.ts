import { Op } from "sequelize";
import { GetterAll, GetterByPk } from "../../../controllers/plan/get";
import Plan from "../../../models/plan";


describe("Plan retrive", () => {
    beforeEach(async() => {
        await Plan.destroy({ where: {
            name: {
                [Op.not]: "free"
            }
        } });
    });

    test("test get all retrive an empty list", async() => {
        const getter = new GetterAll();
        const plans = await getter.get();
        expect(plans).toHaveLength(1);
        expect(plans[0].name).toBe("free");
    }, 100000);

    test("test get all retrive the two created plans", async() => {
        await Plan.bulkCreate([
            { 
                name: "Test Plan",
                price: 2000,
                expiration: 1
            },
            { 
                name: "Test Plan 2",
                price: 2000,
                expiration: 1
            },
        ]);

        const getter = new GetterAll();
        const plans = await getter.get();
        expect(plans).toHaveLength(3);
    }, 100000);

    test("test get plan by pk fail because user does not exist", async() => {
        const plan = await Plan.create({ 
            name: "Test Plan",
            price: 2000,
            expiration: 1
        });
        
        const getter = new GetterByPk(plan.id + 1);
        const retrivedPlans = await getter.get();
        expect(retrivedPlans).toBeNull();
    }, 100000);

    test("test get plan by pk retrived plan instance", async() => {
        const plan = await Plan.create({ 
            name: "Test Plan",
            price: 2000,
            expiration: 1
        });
    
        const getter = new GetterByPk(plan.id);
        const retrievedPlan = await getter.get();
        expect(retrievedPlan).toEqual(expect.objectContaining({ 
            id: plan.id, 
            name: "Test Plan",
            price: 2000,
            expiration: 1
        }));
    }, 100000);
});