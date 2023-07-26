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
const create_1 = __importDefault(require("../../../src/controllers/user/create"));
const user_1 = __importDefault(require("../../../src/models/user"));
describe("User creation", () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield user_1.default.destroy({ where: {} });
    }));
    test('test ok user is created inside the database', () => __awaiter(void 0, void 0, void 0, function* () {
        const email = "test@example.com";
        const name = "Test User";
        const password = "testpassword";
        const type = "regular";
        const userCreator = new create_1.default(email, name, password, type);
        const user = yield userCreator.create();
        console.log(user);
        expect(user).toBeTruthy();
        expect(user === null || user === void 0 ? void 0 : user.name).toBe(name);
        expect(user === null || user === void 0 ? void 0 : user.email).toBe(email);
        expect(user === null || user === void 0 ? void 0 : user.type).toBe(type);
    }), 100000);
    test('test ok user receive user from object', () => __awaiter(void 0, void 0, void 0, function* () {
        const email = "test@example.com";
        const name = "Test User";
        const password = "testpassword";
        const type = "regular";
        const userCreator = new create_1.default(email, name, password, type);
        const user = yield userCreator.create();
        const foundUser = yield user_1.default.findByPk(user === null || user === void 0 ? void 0 : user.id);
        expect(foundUser).toBeTruthy();
        expect(foundUser === null || foundUser === void 0 ? void 0 : foundUser.name).toBe(name);
        expect(foundUser === null || foundUser === void 0 ? void 0 : foundUser.email).toBe(email);
        expect(foundUser === null || foundUser === void 0 ? void 0 : foundUser.type).toBe(type);
    }), 100000);
    test('test ok user password is encrypted', () => __awaiter(void 0, void 0, void 0, function* () {
        const email = "test@example.com";
        const name = "Test User";
        const password = "testpassword";
        const type = "regular";
        const userCreator = new create_1.default(email, name, password, type);
        const user = yield userCreator.create();
        expect(user).toBeTruthy();
        expect(user === null || user === void 0 ? void 0 : user.password).not.toBe(password);
    }), 100000);
    test('test fail because email is in the wrong format', () => __awaiter(void 0, void 0, void 0, function* () {
        const email = "invalidemail";
        const name = "Test User";
        const password = "testpassword";
        const type = "regular";
        const userCreator = new create_1.default(email, name, password, type);
        const user = yield userCreator.create();
        expect(user).toBeNull();
    }), 100000);
    test('test fail because user with given email already exists', () => __awaiter(void 0, void 0, void 0, function* () {
        const email = "test@example.com";
        const name = "Test User";
        const password = "testpassword";
        const type = "regular";
        yield user_1.default.create({ email, name: "Other User", password: "otherpassword", type: "other" });
        const userCreator = new create_1.default(email, name, password, type);
        const user = yield userCreator.create();
        expect(user).toBeNull();
    }), 100000);
    test('test fail because email was not given', () => __awaiter(void 0, void 0, void 0, function* () {
        const name = "Test User";
        const password = "testpassword";
        const type = "regular";
        const userCreator = new create_1.default("", name, password, type);
        const user = yield userCreator.create();
        expect(user).toBeNull();
    }), 100000);
    test('test fail because name was not given', () => __awaiter(void 0, void 0, void 0, function* () {
        const email = "test@example.com";
        const password = "testpassword";
        const type = "regular";
        const userCreator = new create_1.default(email, "", password, type);
        const user = yield userCreator.create();
        expect(user).toBeNull();
    }), 100000);
    test('test fail because password was not given', () => __awaiter(void 0, void 0, void 0, function* () {
        const email = "test@example.com";
        const name = "Test User";
        const type = "regular";
        const userCreator = new create_1.default(email, name, "", type);
        const user = yield userCreator.create();
        expect(user).toBeNull();
    }), 100000);
    test('test fail because type was not given', () => __awaiter(void 0, void 0, void 0, function* () {
        const email = "test@example.com";
        const name = "Test User";
        const password = "testpassword";
        const userCreator = new create_1.default(email, name, password, "");
        const user = yield userCreator.create();
        expect(user).toBeNull();
    }), 100000);
});
