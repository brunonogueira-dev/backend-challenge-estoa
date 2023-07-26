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
const create_1 = __importDefault(require("../../../src/controllers/plan/create"));
const plan_1 = __importDefault(require("../../../src/models/plan"));
describe("Plan creation", () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield plan_1.default.destroy({ where: {} });
    }));
    test('test ok plan is created inside the database', () => __awaiter(void 0, void 0, void 0, function* () {
        const name = "Test plan";
        const price = 2000;
        const expiration = 2;
        const planCreator = new create_1.default(name, price, expiration);
        const plan = yield planCreator.create();
        expect(plan).toBeTruthy();
        expect(plan === null || plan === void 0 ? void 0 : plan.name).toBe(name);
        expect(plan === null || plan === void 0 ? void 0 : plan.price).toBe(price);
        expect(plan === null || plan === void 0 ? void 0 : plan.expiration).toBe(expiration);
    }), 100000);
    test('test ok plan receive plan from object', () => __awaiter(void 0, void 0, void 0, function* () {
        const name = "Test plan";
        const price = 2000;
        const expiration = 2;
        const planCreator = new create_1.default(name, price, expiration);
        const plan = yield planCreator.create();
        const foundPlan = yield plan_1.default.findByPk(plan === null || plan === void 0 ? void 0 : plan.id);
        expect(foundPlan).toBeTruthy();
        expect(foundPlan === null || foundPlan === void 0 ? void 0 : foundPlan.name).toBe(name);
        expect(foundPlan === null || foundPlan === void 0 ? void 0 : foundPlan.price).toBe(price);
        expect(foundPlan === null || foundPlan === void 0 ? void 0 : foundPlan.expiration).toBe(expiration);
    }), 100000);
    test('test fail because name was not given', () => __awaiter(void 0, void 0, void 0, function* () {
        const name = "";
        const price = 2000;
        const expiration = 2;
        const planCreator = new create_1.default(name, price, expiration);
        const plan = yield planCreator.create();
        expect(plan).toBeNull();
    }), 100000);
    test('test fail because expiration cant be zero', () => __awaiter(void 0, void 0, void 0, function* () {
        const name = 'Test plan';
        const price = 2000;
        const expiration = 0;
        const planCreator = new create_1.default(name, price, expiration);
        const plan = yield planCreator.create();
        expect(plan).toBeNull();
    }), 100000);
});
