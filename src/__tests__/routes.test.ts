import request from 'supertest';
import { Op } from "sequelize";
import PlanCreator from "../controllers/plan/create";
import Plan from "../models/plan";
import { app } from "../server";
import User from '../models/user';
import UserCreator from '../controllers/user/create';
import Signature from '../models/signature';

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

    test('test fail because plan was not found', async () => {
        const name = "Test plan";
        const price = 2000;
        const expiration = 2;

        const planCreator = new PlanCreator(name, price, expiration);
        const plan = await planCreator.create();
       

        if (plan) {
            const payload: any = {
                price: 5000,
                expiration: 5
            };

            const res = await request(expressApp).put(`${plansUrl}/${plan.id+1}`).send(payload);

            expect(res).toBeTruthy()
            expect(res.status).toBe(404)
            expect(res.body.message).toEqual('Plan not found');
        } else {
            fail('error');
        }
    }, 100000);
});

describe('Delete user route', () => {

    beforeEach(async () => {
        await Plan.destroy({ where: {
            name: {
                [Op.not]: 'free'
            }
        }});
        await User.destroy({ where: {} });
    }, 1000000);

    test('test all ok', async () => {
        const email = "test@example.com";
        const name = "Test User";
        const password = "testpassword";
        const type = "regular";

        const userCreator = new UserCreator(email, name, password, type);
        const user = await userCreator.create();
        
        if (user) {
            const res = await request(expressApp).delete(`${usersUrl}/${user.id}`).send();

            expect(res).toBeTruthy()
            expect(res.status).toBe(201)
            expect(res.body.message).toBe('user deleted')

            const res2 = await request(expressApp).delete(`${usersUrl}/${user.id}`).send();

            expect(res2).toBeTruthy()
            expect(res2.status).toBe(404)
            expect(res2.body.message).toBe('User not found')
        } else {
            fail('error');
        }
    }, 100000);
});

describe('Get user route', () => {
    beforeEach(async () => {
        await Plan.destroy({ where: {
            name: {
                [Op.not]: 'free'
            }
        }});
        await User.destroy({ where: {} });
    }, 1000000);

    test('Get all', async () => {
        const email = "test@example.com";
        const name = "Test User";
        const password = "testpassword";
        const type = "regular";

        const userCreator = new UserCreator(email, name, password, type);
        const user = await userCreator.create();
       
        if (user) {
            const res = await request(expressApp).get(`${usersUrl}/`);

            expect(res).toBeTruthy()
            expect(res.status).toBe(200)
            expect(res.body.users).toHaveLength(1);
        } else {
            fail('error');
        }
    }, 100000);

    test('Get one', async () => {
        const email = "test@example.com";
        const name = "Test User";
        const password = "testpassword";
        const type = "regular";

        const userCreator = new UserCreator(email, name, password, type);
        const user = await userCreator.create();

        if (user) {
            const res = await request(expressApp).get(`${usersUrl}/${user.id}`);
            const userJson = await JSON.parse(JSON.stringify(await user.reload()));

            expect(res).toBeTruthy()
            expect(res.status).toBe(200)
            expect(res.body.user).toEqual(userJson);

            const res2 = await request(expressApp).get(`${usersUrl}/${user.id+1}`);

            expect(res2).toBeTruthy()
            expect(res2.status).toBe(404)
            expect(res2.body.message).toEqual('User not found');
        } else {
            fail('error');
        }
    }, 100000);
});

describe('Filter user route', () => {
    beforeEach(async () => {
        await Plan.destroy({ where: {
            name: {
                [Op.not]: 'free'
            }
        }});
        await User.destroy({ where: {} });
    }, 1000000);

    test('Get by name', async () => {
        const email = "test@example.com";
        const name = "Test User";
        const password = "testpassword";
        const type = "regular";

        const userCreator = new UserCreator(email, name, password, type);
        const user = await userCreator.create();
       
        if (user) {
            const res = await request(expressApp).get(`${usersUrl}/search/q?name=${user.name}`);

            expect(res).toBeTruthy()
            expect(res.status).toBe(200)
            expect(res.body.users).toHaveLength(1);
        } else {
            fail('error');
        }
    }, 100000);

    test('Get by createdAt', async () => {
        await User.bulkCreate([
            { email: 'user1@example.com', name: "User One", password: "password1", type: "regular"},
            { email: 'user2@example.com', name: "User Two", password: "password2", type: "regular"},
            { email: 'user3@example.com', name: "User Three", password: "password3", type: "regular"},
        ]);

        await new Promise(resolve => setTimeout(resolve, 1000));
        const userMeio = await User.create({ 
            email: 'user4@example.com', 
            name: "User Four", 
            password: "password4", 
            type: "regular"
        });

        await new Promise(resolve => setTimeout(resolve, 1000));
        const userFinal = await User.create({ 
            email: 'user5@example.com', 
            name: "User Five", 
            password: "password5", 
            type: "regular"
        });

        if (userMeio && userFinal) {
            const res = await request(expressApp).get(`${usersUrl}/search/q?created_at=${userMeio.createdAt}`);

            expect(res).toBeTruthy()
            expect(res.status).toBe(200)
            expect(res.body.users).toHaveLength(1);

            const res2 = await request(expressApp).get(`${usersUrl}/search/q?created_at=gt__${userMeio.createdAt}`);
            const res3 = await request(expressApp).get(`${usersUrl}/search/q?created_at=gte__${userMeio.createdAt}`);
            const res4 = await request(expressApp).get(`${usersUrl}/search/q?created_at=lt__${userMeio.createdAt}`);
            const res5 = await request(expressApp).get(`${usersUrl}/search/q?created_at=lte__${userMeio.createdAt}`);
            const res6 = await request(expressApp).get(`${usersUrl}/search/q?created_at=eq__${userMeio.createdAt}`);

            expect(res2.body.users).toHaveLength(1);
            expect(res3.body.users).toHaveLength(2);
            expect(res4.body.users).toHaveLength(3);
            expect(res5.body.users).toHaveLength(4);
            expect(res.body.users).toHaveLength(1);
        } else {
            fail('error');
        }
    }, 100000);
});

describe('Create user route', () => {

    beforeEach(async () => {
        await Plan.destroy({ where: {
            name: {
                [Op.not]: 'free'
            }
        }});
        await User.destroy({ where: {} });
        await Signature.destroy({where: {}});
    }, 1000000);

    test('test all ok', async () => {
        const payload = {
            name: 'Test User',
            email: "test@example.com",
            password: "testpassword",
            type: 'regular'
        }

        const res = await request(expressApp).post(usersUrl).send(payload);

        expect(res).toBeTruthy()
        expect(res.status).toBe(202)
        expect(res.body.user['name']).toEqual(payload.name);
        expect(res.body.user['email']).toEqual(payload.email);
        expect(res.body.user['type']).toEqual(payload.type);
        expect(res.body.user['password']).not.toEqual(payload.password);

        const sigs = await Signature.findAll();

        expect(sigs).toHaveLength(1);
        expect(sigs[0].userId).toBe(res.body.user.id)
    }, 100000);

    test('test fail because name was not given', async () => {
        const payload = {
            email: "test@example.com",
            password: "testpassword",
            type: 'regular'
        }

        const res = await request(expressApp).post(usersUrl).send(payload);

        expect(res).toBeTruthy();
        expect(res.status).toBe(400);
        expect(res.body.message).toEqual('cant create user');
    }, 100000);

    test('test fail because email was not given', async () => {
        const payload = {
            name: 'Test User',
            password: "testpassword",
            type: 'regular'
        }

        const res = await request(expressApp).post(usersUrl).send(payload);

        expect(res).toBeTruthy();
        expect(res.status).toBe(400);
        expect(res.body.message).toEqual('cant create user');
    }, 100000);

    test('test fail because type was not given', async () => {
        const payload = {
            name: 'Test User',
            email: "test@example.com",
            password: "testpassword",
        }
        const res = await request(expressApp).post(usersUrl).send(payload);

        expect(res).toBeTruthy();
        expect(res.status).toBe(400);
        expect(res.body.message).toEqual('cant create user');
    }, 100000);

    test('test fail because password was not given', async () => {
        const payload = {
            name: 'Test User',
            email: "test@example.com",
            type: 'regular'
        }

        const res = await request(expressApp).post(usersUrl).send(payload);

        expect(res).toBeTruthy();
        expect(res.status).toBe(400);
        expect(res.body.message).toEqual('cant create user');
    }, 100000);

    test('test fail because email alredy taken', async () => {
        const email = "test@example.com";
        const name = "Test User";
        const password = "testpassword";
        const type = "regular";

        const userCreator = new UserCreator(email, name, password, type);
        const user = await userCreator.create();

        const payload = {
            name: 'Test2 User',
            email: "test@example.com",
            password: "test2password",
            type: 'regular2'
        }

        const res = await request(expressApp).post(usersUrl).send(payload);

        expect(res).toBeTruthy();
        expect(res.status).toBe(400);
        expect(res.body.message).toEqual('cant create user');
    }, 100000);
});

describe('Update user route', () => {
    beforeEach(async () => {
        await Plan.destroy({ where: {
            name: {
                [Op.not]: 'free'
            }
        }});
        await User.destroy({ where: {} });
    }, 1000000);

    test('test ok', async () => {
        const email = "test@example.com";
        const name = "Test User";
        const password = "testpassword";
        const type = "regular";

        const userCreator = new UserCreator(email, name, password, type);
        const user = await userCreator.create();

        if (user) {
            const payload: any = {
                name: 'Updated User',
                email: "updated@example.com",
                password: "updatedpassword",
                type: "updated"
            };
            const oldPassword = user.password;

            const res = await request(expressApp).put(`${usersUrl}/${user.id}`).send(payload);

            const userJson = JSON.parse(JSON.stringify(user));

            expect(res.body.user.password).not.toEqual(oldPassword);

            payload.createdAt = userJson.createdAt;
            payload.id = userJson.id;
            delete res.body.user.updatedAt;
            delete res.body.user.password;
            delete payload.password;

            expect(res).toBeTruthy()
            expect(res.status).toBe(200)
            expect(res.body.user).toEqual(payload);
        } else {
            fail('error');
        }
    }, 100000);

    test('test fail because user was not found', async () => {
        const email = "test@example.com";
        const name = "Test User";
        const password = "testpassword";
        const type = "regular";

        const userCreator = new UserCreator(email, name, password, type);
        const user = await userCreator.create();

        if (user) {
            const payload: any = {
                name: 'Updated User',
                email: "updated@example.com",
                password: "updatedpassword",
                type: "updated"
            };

            const res = await request(expressApp).put(`${usersUrl}/${user.id+1}`).send(payload);

            expect(res).toBeTruthy()
            expect(res.status).toBe(404)
            expect(res.body.message).toEqual('User not found');
        } else {
            fail('error');
        }
    }, 100000);

    test('test fail because email already taken', async () => {
        const email = "test@example.com";
        const name = "Test User";
        const password = "testpassword";
        const type = "regular";

        const userCreator = new UserCreator(email, name, password, type);
        const user = await userCreator.create();

        const email2 = "updated@example.com";
        const name2 = "Test User";
        const userCreator2 = new UserCreator(email2, name2, password, type);
        const user2 = await userCreator2.create();

        if (user && user2) {
            const payload: any = {
                name: 'Updated User',
                email: "updated@example.com",
                password: "updatedpassword",
                type: "updated"
            };

            const res = await request(expressApp).put(`${usersUrl}/${user.id}`).send(payload);

            expect(res).toBeTruthy()
            expect(res.status).toBe(400)
        } else {
            fail('error');
        }
    }, 100000);
});