"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const get_1 = require("../../../src/controllers/plan/get");
const plan_1 = __importDefault(require("../../../src/models/plan"));
describe("Plan retrive", () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield plan_1.default.destroy({ where: {} });
    }));
    test('test get all retrive an empty list', () => __awaiter(void 0, void 0, void 0, function* () {
        const getter = new get_1.GetterAll();
        const plans = yield getter.get();
        expect(plans).toHaveLength(0);
    }), 100000);
    test('test get all retrive the two created plans', () => __awaiter(void 0, void 0, void 0, function* () {
        yield plan_1.default.bulkCreate([
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
        const getter = new get_1.GetterAll();
        const plans = yield getter.get();
        expect(plans).toHaveLength(2);
    }), 100000);
    test('test get plan by pk fail because user does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        const plan = yield plan_1.default.create({
            name: "Test Plan",
            price: 2000,
            expiration: 1
        });
        const getter = new get_1.GetterByPk(plan.id + 1);
        const retrivedPlans = yield getter.get();
        expect(retrivedPlans).toBeNull();
    }), 100000);
    test('test get plan by pk retrived plan instance', () => __awaiter(void 0, void 0, void 0, function* () {
        const plan = yield plan_1.default.create({
            name: "Test Plan",
            price: 2000,
            expiration: 1
        });
        const getter = new get_1.GetterByPk(plan.id);
        const retrievedPlan = yield getter.get();
        expect(retrievedPlan).toEqual(expect.objectContaining({
            id: plan.id,
            name: "Test Plan",
            price: 2000,
            expiration: 1
        }));
    }), 100000);
});
