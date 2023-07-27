import request from 'supertest';
import { Op } from "sequelize";
import PlanCreator from "../controllers/plan/create";
import Plan from "../models/plan";
import { app } from "../server";

const expressApp = app;
const plansUrl = '/plans/';
const usersUrl = '/users/';

describe('Delete plan route', () => {

    beforeEach(async () => {
        await Plan.destroy({ where: {
            name: {
                [Op.not]: 'free'
            }
        }});
    }, 1000000);

    test('test all ok', async () => {
        const name = "Test plan";
        const price = 2000;
        const expiration = 2;

        const planCreator = new PlanCreator(name, price, expiration);
        const plan = await planCreator.create();
        
        if (plan) {
            const res = await request(expressApp).delete(`${plansUrl}/${plan.id}`).send();

            expect(res).toBeTruthy()
            expect(res.status).toBe(201)
            expect(res.body.message).toBe('plan deleted')

            const res2 = await request(expressApp).delete(`${plansUrl}/${plan.id}`).send();

            expect(res2).toBeTruthy()
            expect(res2.status).toBe(404)
            expect(res2.body.message).toBe('Plan not found')
        } else {
            fail('error');
        }
    }, 100000);
});

describe('Get plan route', () => {
    beforeEach(async () => {
        await Plan.destroy({ where: {
            name: {
                [Op.not]: 'free'
            }
        }});
    }, 1000000);

    test('Get all', async () => {
        const name = "Test plan";
        const price = 2000;
        const expiration = 2;

        const planCreator = new PlanCreator(name, price, expiration);
        const plan = await planCreator.create();
       

        if (plan) {
            const res = await request(expressApp).get(`${plansUrl}/`);

            expect(res).toBeTruthy()
            expect(res.status).toBe(200)
            expect(res.body.plans).toHaveLength(2);
        } else {
            fail('error');
        }
    }, 100000);

    test('Get one', async () => {
        const name = "Test plan";
        const price = 2000;
        const expiration = 2;

        const planCreator = new PlanCreator(name, price, expiration);
        const plan = await planCreator.create();
       

        if (plan) {
            const res = await request(expressApp).get(`${plansUrl}/${plan.id}`);
            const planJson = await JSON.parse(JSON.stringify(await plan.reload()));

            expect(res).toBeTruthy()
            expect(res.status).toBe(200)
            expect(res.body.plan).toEqual(planJson);

            const res2 = await request(expressApp).get(`${plansUrl}/${plan.id+1}`);

            expect(res2).toBeTruthy()
            expect(res2.status).toBe(404)
            expect(res2.body.message).toEqual('Plan not found');
        } else {
            fail('error');
        }
    }, 100000);
});

describe('Create plan route', () => {

    beforeEach(async () => {
        await Plan.destroy({ where: {
            name: {
                [Op.not]: 'free'
            }
        }});
    }, 1000000);

    test('test all ok', async () => {
        const payload = {
            name: 'test plan',
            price: 1000,
            expiration: 3
        }

        const res = await request(expressApp).post(plansUrl).send(payload);

        expect(res).toBeTruthy()
        expect(res.status).toBe(202)
        expect(res.body.plan['name']).toEqual(payload.name);
        expect(res.body.plan['price']).toEqual(payload.price);
        expect(res.body.plan['expiration']).toEqual(payload.expiration);

        const plans = await Plan.findAll({ where: {
            name: {
                [Op.not]: 'free'
            }
        }});

        expect(plans).toHaveLength(1);

        const planFromDB = JSON.parse(JSON.stringify(plans[0]));
        expect(planFromDB).toEqual(res.body.plan);
    }, 100000);

    test('test fail because name was not given', async () => {
        const payload = {
            price: 1000,
            expiration: 3
        }

        const res = await request(expressApp).post(plansUrl).send(payload);

        expect(res).toBeTruthy();
        expect(res.status).toBe(400);
        expect(res.body.message).toEqual('cant create plan');
    }, 100000);

    test('test fail because price was not given', async () => {
        const payload = {
            name: 'test plan',
            expiration: 3
        }

        const res = await request(expressApp).post(plansUrl).send(payload);

        expect(res).toBeTruthy();
        expect(res.status).toBe(400);
        expect(res.body.message).toEqual('cant create plan');
    }, 100000);

    test('test fail because expiration was not given', async () => {
        const payload = {
            name: 'test plan',
            price: 1000
        }

        const res = await request(expressApp).post(plansUrl).send(payload);

        expect(res).toBeTruthy();
        expect(res.status).toBe(400);
        expect(res.body.message).toEqual('cant create plan');
    }, 100000);
});

describe('Update plan route', () => {
    beforeEach(async () => {
        await Plan.destroy({ where: {
            name: {
                [Op.not]: 'free'
            }
        }});
    }, 1000000);

    test('test ok', async () => {
        const name = "Test plan";
        const price = 2000;
        const expiration = 2;

        const planCreator = new PlanCreator(name, price, expiration);
        const plan = await planCreator.create();
       

        if (plan) {
            const payload: any = {
                name: 'Updated plan',
                price: 5000,
                expiration: 5
            };

            const res = await request(expressApp).put(`${plansUrl}/${plan.id}`).send(payload);

            const planJson = JSON.parse(JSON.stringify(plan));

            payload.createdAt = planJson.createdAt;
            payload.id = planJson.id;
            delete res.body.plan.updatedAt;

            expect(res).toBeTruthy()
            expect(res.status).toBe(200)
            expect(res.body.plan).toEqual(payload);
        } else {
            fail('error');
        }
    }, 100000);
});