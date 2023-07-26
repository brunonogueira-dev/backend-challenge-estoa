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
const get_1 = require("../../../src/controllers/user/get");
const user_1 = __importDefault(require("../../../src/models/user"));
describe("User retrive", () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield user_1.default.destroy({ where: {} });
    }));
    test('test get all retrive an empty list', () => __awaiter(void 0, void 0, void 0, function* () {
        const getter = new get_1.GetterAll();
        const users = yield getter.get();
        expect(users).toHaveLength(0);
    }), 100000);
    test('test get all retrive the two created users', () => __awaiter(void 0, void 0, void 0, function* () {
        yield user_1.default.bulkCreate([
            {
                email: 'user1@example.com',
                name: "User One",
                password: "password1",
                type: "regular"
            },
            {
                email: 'user2@example.com',
                name: "User Two",
                password: "password2",
                type: "regular"
            },
        ]);
        const getter = new get_1.GetterAll();
        const users = yield getter.get();
        expect(users).toHaveLength(2);
    }), 100000);
    test('test get user by pk fail because user does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_1.default.create({
            email: 'test@example.com',
            name: "Test User",
            password: "testpassword",
            type: "regular"
        });
        const getter = new get_1.GetterByPk(user.id + 1);
        const retrivedUser = yield getter.get();
        expect(retrivedUser).toBeNull();
    }), 100000);
    test('test get user by pk retrived user instance', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_1.default.create({
            email: 'test@example.com',
            name: "Test User",
            password: "testpassword",
            type: "regular"
        });
        const getter = new get_1.GetterByPk(user.id);
        const retrievedUser = yield getter.get();
        expect(retrievedUser).toEqual(expect.objectContaining({
            id: user.id,
            name: "Test User",
            email: 'test@example.com',
            type: 'regular'
        }));
    }), 100000);
});
