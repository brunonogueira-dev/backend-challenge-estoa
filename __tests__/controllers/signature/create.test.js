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
const create_3 = __importDefault(require("../../../src/controllers/user/create"));
const plan_1 = __importDefault(require("../../../src/models/plan"));
const signature_1 = __importDefault(require("../../../src/models/signature"));
const user_1 = __importDefault(require("../../../src/models/user"));
const __createPlan__ = () => __awaiter(void 0, void 0, void 0, function* () {
    const name = "Test plan";
    const price = 2000;
    const expiration = 2;
    const planCreator = new create_1.default(name, price, expiration);
    return yield planCreator.create();
});
const __createUser__ = () => __awaiter(void 0, void 0, void 0, function* () {
    const email = "test@example.com";
    const name = "Test User";
    const password = "testpassword";
    const type = "regular";
    const userCreator = new create_3.default(email, name, password, type);
    return yield userCreator.create();
});
describe("Signature creation", () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield signature_1.default.destroy({ where: {} });
        yield plan_1.default.destroy({ where: {} });
        yield user_1.default.destroy({ where: {} });
    }));
    test('test ok signature is created', () => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const plan = yield __createPlan__();
        const user = yield __createUser__();
        if (plan && user) {
            const signatureCreator = new create_2.default(user, plan);
            const signature = yield signatureCreator.create();
            if (signature) {
                const sigUser = yield (signature === null || signature === void 0 ? void 0 : signature.userId);
                const sigPlan = yield (signature === null || signature === void 0 ? void 0 : signature.planId);
                const now = Date.now();
                const expirationDate = ((_a = signature === null || signature === void 0 ? void 0 : signature.expiration) === null || _a === void 0 ? void 0 : _a.getTime()) || 0;
                const differenceInMilliseconds = expirationDate - now;
                const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
                expect(sigPlan).toBe(plan.id);
                expect(sigUser).toBe(user.id);
                expect(differenceInDays).toBeGreaterThanOrEqual(29);
            }
            else {
                fail("Failed while trying to create signature");
            }
        }
        else {
            fail('Failed while trying to create plan and user');
        }
    }), 100000);
});
