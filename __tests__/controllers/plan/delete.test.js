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
const delete_1 = require("../../../src/controllers/plan/delete");
const plan_1 = __importDefault(require("../../../src/models/plan"));
describe("Plan deletion", () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield plan_1.default.destroy({ where: {} });
    }));
    test('test delete ok', () => __awaiter(void 0, void 0, void 0, function* () {
        const plan = yield plan_1.default.create({
            name: "Test Plan",
            price: 2000,
            expiration: 1
        });
        const deleter = new delete_1.DeleteByPk(plan.id);
        yield deleter.delete();
        const deletedUser = yield plan_1.default.findByPk(plan.id);
        expect(deletedUser).toBeNull();
    }), 100000);
    test('test delete fail because plan not found', () => __awaiter(void 0, void 0, void 0, function* () {
        const deleter = new delete_1.DeleteByPk(1);
        try {
            yield deleter.delete();
            fail("Expected delete to fail, but it succeeded.");
        }
        catch (e) {
            expect(e.message).toBe("Plan not found");
        }
    }), 100000);
});
