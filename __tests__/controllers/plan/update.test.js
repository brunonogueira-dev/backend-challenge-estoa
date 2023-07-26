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
const update_1 = require("../../../src/controllers/plan/update");
const plan_1 = __importDefault(require("../../../src/models/plan"));
describe("Plan update", () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield plan_1.default.destroy({ where: {} });
    }));
    test('test fail because plan was not found', () => __awaiter(void 0, void 0, void 0, function* () {
        const updater = new update_1.UpdateByPk(0);
        try {
            yield updater.update({
                name: "Updated Name",
                price: 1000,
                expiration: 2
            });
            fail("Expected update to fail, but it succeeded.");
        }
        catch (error) {
            expect(error.message).toBe("Plan not found");
        }
    }), 100000);
    test('test upated name', () => __awaiter(void 0, void 0, void 0, function* () {
        const plan = yield plan_1.default.create({
            name: "Test Plan",
            price: 2000,
            expiration: 1
        });
        const updater = new update_1.UpdateByPk(plan.id);
        const updatedName = "Updated Name";
        yield updater.update({ name: updatedName });
        const updatedPlan = yield plan_1.default.findByPk(plan.id);
        expect(updatedPlan === null || updatedPlan === void 0 ? void 0 : updatedPlan.name).toBe(updatedName);
    }), 100000);
    test('test upated price', () => __awaiter(void 0, void 0, void 0, function* () {
        const plan = yield plan_1.default.create({
            name: "Test Plan",
            price: 2000,
            expiration: 1
        });
        const updater = new update_1.UpdateByPk(plan.id);
        const updatedPrice = 3000;
        yield updater.update({ price: updatedPrice });
        const updatedPlan = yield plan_1.default.findByPk(plan.id);
        expect(updatedPlan === null || updatedPlan === void 0 ? void 0 : updatedPlan.price).toBe(updatedPrice);
    }), 100000);
    test('test upated expire', () => __awaiter(void 0, void 0, void 0, function* () {
        const plan = yield plan_1.default.create({
            name: "Test Plan",
            price: 2000,
            expiration: 1
        });
        const updater = new update_1.UpdateByPk(plan.id);
        const updatedExpire = 3;
        yield updater.update({ expiration: updatedExpire });
        const updatedPlan = yield plan_1.default.findByPk(plan.id);
        expect(updatedPlan === null || updatedPlan === void 0 ? void 0 : updatedPlan.expiration).toBe(updatedExpire);
    }), 100000);
    test('test updatedAt changed', () => __awaiter(void 0, void 0, void 0, function* () {
        const plan = yield plan_1.default.create({
            name: "Test Plan",
            price: 2000,
            expiration: 1
        });
        const initialUpdatedAt = plan.updatedAt;
        const updater = new update_1.UpdateByPk(plan.id);
        yield new Promise(resolve => setTimeout(resolve, 1000));
        yield updater.update({ name: "Updated Name" });
        const updatedUser = yield plan_1.default.findByPk(plan.id);
        expect(updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.updatedAt).not.toEqual(initialUpdatedAt);
    }), 100000);
});
