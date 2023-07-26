import PlanCreator from "../../../src/controllers/plan/create";
import Plan from "../../../src/models/plan";



describe("Pan creation", () => {
    beforeEach(async () => {
        await Plan.destroy({ where: {} });
    });

    test('test ok plan is created inside the database', async () => {
        const name = "Test plan";
        const price = 2000;
        const expiration = 2;

        const planCreator = new PlanCreator(name, price, expiration);
        const plan = await planCreator.create();
        expect(plan).toBeTruthy();
        expect(plan?.name).toBe(name);
        expect(plan?.price).toBe(price);
        expect(plan?.expiration).toBe(expiration);
    }, 100000);

    test('test ok plan receive plan from object', async () => {
        const name = "Test plan";
        const price = 2000;
        const expiration = 2;

        const planCreator = new PlanCreator(name, price, expiration);
        const plan = await planCreator.create();

        const foundPlan = await Plan.findByPk(plan?.id);

        expect(foundPlan).toBeTruthy();
        expect(foundPlan?.name).toBe(name);
        expect(foundPlan?.price).toBe(price);
        expect(foundPlan?.expiration).toBe(expiration);
    }, 100000);

    test('test fail because name was not given', async () => {
        const name = "";
        const price = 2000;
        const expiration = 2;

        const planCreator = new PlanCreator(name, price, expiration);
        const plan = await planCreator.create();

        expect(plan).toBeNull();
    }, 100000);

    test('test fail because price cant be zero', async () => {
        const name = 'Test plan';
        const price = 0;
        const expiration = 2;

        const planCreator = new PlanCreator(name, price, expiration);
        const plan = await planCreator.create();

        expect(plan).toBeNull();
    }, 100000);

    test('test fail because expiration cant be zero', async () => {
        const name = 'Test plan';
        const price = 2000;
        const expiration = 0;

        const planCreator = new PlanCreator(name, price, expiration);
        const plan = await planCreator.create();

        expect(plan).toBeNull();
    }, 100000);
});