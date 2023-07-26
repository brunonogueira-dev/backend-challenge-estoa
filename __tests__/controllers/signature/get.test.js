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
const create_2 = __importDefault(require("../../../src/controllers/signatures/create"));
const get_1 = require("../../../src/controllers/signatures/get");
const create_3 = __importDefault(require("../../../src/controllers/user/create"));
const plan_1 = __importDefault(require("../../../src/models/plan"));
const signature_1 = __importDefault(require("../../../src/models/signature"));
const user_1 = __importDefault(require("../../../src/models/user"));
const __createPlan__ = (n) => __awaiter(void 0, void 0, void 0, function* () {
    const name = `Test plan ${n}`;
    const price = 2000;
    const expiration = 2;
    const planCreator = new create_1.default(name, price, expiration);
    return yield planCreator.create();
});
const __createUser__ = (n) => __awaiter(void 0, void 0, void 0, function* () {
    const email = `test${n}@example.com`;
    const name = `Test User${n}`;
    const password = "testpassword";
    const type = "regular";
    const userCreator = new create_3.default(email, name, password, type);
    return yield userCreator.create();
});
describe("Signature retrive", () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield signature_1.default.destroy({ where: {} });
        yield plan_1.default.destroy({ where: {} });
        yield user_1.default.destroy({ where: {} });
        for (let i = 0; i < 2; i++) {
            yield __createPlan__(i);
        }
        for (let i = 0; i < 2; i++) {
            yield __createUser__(i);
        }
    }));
    test('test get by user and retrive users and plans', () => __awaiter(void 0, void 0, void 0, function* () {
        const plans = yield plan_1.default.findAll();
        const users = yield user_1.default.findAll();
        const creator1 = new create_2.default(users[0], plans[0]);
        yield creator1.create();
        const creator2 = new create_2.default(users[0], plans[1]);
        yield creator2.create();
        const creator3 = new create_2.default(users[1], plans[0]);
        yield creator3.create();
        const getter1 = new get_1.GetSignatureByUserPk(users[0].id);
        const signatures1 = yield getter1.get();
        const getter2 = new get_1.GetSignatureByUserPk(users[1].id);
        const signatures2 = yield getter2.get();
        expect(signatures1).toHaveLength(2);
        expect(signatures2).toHaveLength(1);
        expect(signatures1[0].userId).toBe(users[0].id);
        expect(signatures1[1].userId).toBe(users[0].id);
        expect(signatures2[0].userId).toBe(users[1].id);
        expect(signatures1[0].planId).toBe(plans[0].id);
        expect(signatures1[1].planId).toBe(plans[1].id);
        expect(signatures2[0].planId).toBe(plans[0].id);
    }), 100000);
    test('test get user by signature pk', () => __awaiter(void 0, void 0, void 0, function* () {
        const plans = yield plan_1.default.findAll();
        const users = yield user_1.default.findAll();
        const creator1 = new create_2.default(users[0], plans[0]);
        const sig = yield creator1.create();
        if (sig) {
            const signatures = yield signature_1.default.findAll();
            console.log("------", signatures);
            const getter = new get_1.GetUserSignaturePk(signatures[0].id);
            const user = yield getter.get();
            console.log("---------", user);
            expect(user).toBeTruthy();
            expect(user).toBe(users[0]);
        }
        else {
            fail("Failed trying to create signature");
        }
        const getter2 = new get_1.GetUserSignaturePk(-1);
        try {
            const user = yield getter2.get();
            if (user) {
                fail("Should have thrown an error");
            }
        }
        catch (_) {
        }
    }), 100000);
});
