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
const filter_1 = require("../../../src/controllers/user/filter");
const user_1 = __importDefault(require("../../../src/models/user"));
describe("User filter", () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield user_1.default.destroy({ where: {} });
    }));
    test('test filter by name', () => __awaiter(void 0, void 0, void 0, function* () {
        yield user_1.default.bulkCreate([
            { email: 'user1@example.com', name: "User One", password: "password1", type: "regular" },
            { email: 'user2@example.com', name: "User Two", password: "password2", type: "regular" },
            { email: 'user3@example.com', name: "User Three", password: "password3", type: "regular" },
        ]);
        const filter = new filter_1.Filter();
        const filteredUsers = yield filter.filter({
            name: "User One"
        });
        expect(filteredUsers).toHaveLength(1);
        expect(filteredUsers[0].name).toBe("User One");
    }));
    test('test filter by createdAt without operator', () => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        yield user_1.default.bulkCreate([
            { email: 'user1@example.com', name: "User One", password: "password1", type: "regular" },
            { email: 'user2@example.com', name: "User Two", password: "password2", type: "regular" },
            { email: 'user3@example.com', name: "User Three", password: "password3", type: "regular" },
        ]);
        const users = yield user_1.default.findAll();
        const filter = new filter_1.Filter();
        const filteredUsers = yield filter.filter({
            createdAt: (_a = users[0].createdAt) === null || _a === void 0 ? void 0 : _a.toISOString()
        });
        expect(filteredUsers).toHaveLength(3);
    }));
    test('test filter by createdAt with operator', () => __awaiter(void 0, void 0, void 0, function* () {
        var _b, _c, _d, _e, _f, _g;
        yield user_1.default.bulkCreate([
            { email: 'user1@example.com', name: "User One", password: "password1", type: "regular" },
            { email: 'user2@example.com', name: "User Two", password: "password2", type: "regular" },
            { email: 'user3@example.com', name: "User Three", password: "password3", type: "regular" },
        ]);
        yield new Promise(resolve => setTimeout(resolve, 1000));
        const userMeio = yield user_1.default.create({
            email: 'user4@example.com',
            name: "User Four",
            password: "password4",
            type: "regular"
        });
        yield new Promise(resolve => setTimeout(resolve, 1000));
        const userFinal = yield user_1.default.create({
            email: 'user5@example.com',
            name: "User Five",
            password: "password5",
            type: "regular"
        });
        const users = yield user_1.default.findAll();
        const filter = new filter_1.Filter();
        const filteredUsersComCreationIgualAoPrimerosCriados = yield filter.filter({
            createdAt: `eq__${(_b = users[0].createdAt) === null || _b === void 0 ? void 0 : _b.toISOString()}`
        });
        const filteredUsersComCreationIgualAoUserMeio = yield filter.filter({
            createdAt: `eq__${(_c = userMeio.createdAt) === null || _c === void 0 ? void 0 : _c.toISOString()}`
        });
        const filteredUsersComCreationMaior = yield filter.filter({
            createdAt: `gt__${(_d = userMeio.createdAt) === null || _d === void 0 ? void 0 : _d.toISOString()}`
        });
        const filteredUsersComCreationMenor = yield filter.filter({
            createdAt: `lt__${(_e = userMeio.createdAt) === null || _e === void 0 ? void 0 : _e.toISOString()}`
        });
        const filteredUsersComCreationIgualOuMaior = yield filter.filter({
            createdAt: `gte__${(_f = userMeio.createdAt) === null || _f === void 0 ? void 0 : _f.toISOString()}`
        });
        const filteredUsersComCreationIgualOuMenor = yield filter.filter({
            createdAt: `lte__${(_g = userMeio.createdAt) === null || _g === void 0 ? void 0 : _g.toISOString()}`
        });
        expect(filteredUsersComCreationIgualAoPrimerosCriados).toHaveLength(3);
        expect(filteredUsersComCreationIgualAoUserMeio).toHaveLength(1);
        expect(filteredUsersComCreationMaior).toHaveLength(1);
        expect(filteredUsersComCreationMenor).toHaveLength(3);
        expect(filteredUsersComCreationIgualOuMaior).toHaveLength(2);
        expect(filteredUsersComCreationIgualOuMenor).toHaveLength(4);
    }));
});
