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
const update_1 = require("../../../src/controllers/user/update");
const user_1 = __importDefault(require("../../../src/models/user"));
describe("User update", () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield user_1.default.destroy({ where: {} });
    }));
    test('test fail because user was not found', () => __awaiter(void 0, void 0, void 0, function* () {
        const updater = new update_1.UpdateByPk(0);
        try {
            yield updater.update({
                email: "updated_email@example.com",
                name: "Updated Name",
                type: "updated_type",
                password: "updated_password"
            });
            fail("Expected update to fail, but it succeeded.");
        }
        catch (error) {
            expect(error.message).toBe("User not found");
        }
    }), 100000);
    test('test upated name', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_1.default.create({
            email: 'test@example.com',
            name: "Test User",
            password: "testpassword",
            type: "regular"
        });
        const updater = new update_1.UpdateByPk(user.id);
        const updatedName = "Updated Name";
        yield updater.update({ name: updatedName });
        const updatedUser = yield user_1.default.findByPk(user.id);
        expect(updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.name).toBe(updatedName);
    }), 100000);
    test('test updated email', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_1.default.create({
            email: 'test@example.com',
            name: "Test User",
            password: "testpassword",
            type: "regular"
        });
        const updater = new update_1.UpdateByPk(user.id);
        const updatedEmail = "updatedEmail@example.com";
        yield updater.update({ email: updatedEmail });
        const updatedUser = yield user_1.default.findByPk(user.id);
        expect(updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.email).toBe(updatedEmail);
    }), 100000);
    test('test updated type', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_1.default.create({
            email: 'test@example.com',
            name: "Test User",
            password: "testpassword",
            type: "regular"
        });
        const updater = new update_1.UpdateByPk(user.id);
        const updatedType = "Updated type";
        yield updater.update({ type: updatedType });
        const updatedUser = yield user_1.default.findByPk(user.id);
        expect(updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.type).toBe(updatedType);
    }), 100000);
    test('test updated password', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_1.default.create({
            email: 'test@example.com',
            name: "Test User",
            password: "testpassword",
            type: "regular"
        });
        const oldPassword = user.password;
        const updater = new update_1.UpdateByPk(user.id);
        const updatedPassword = "updated_password";
        yield updater.update({ password: updatedPassword });
        const updatedUser = yield user_1.default.findByPk(user.id);
        expect(updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.password).not.toBe(oldPassword);
        const userAutenticated = user_1.default.authenticate(user.email, updatedPassword);
        expect(userAutenticated).toBeTruthy();
    }), 100000);
    test('test updatedAt changed', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_1.default.create({
            email: 'test@example.com',
            name: "Test User",
            password: "testpassword",
            type: "regular"
        });
        const initialUpdatedAt = user.updatedAt;
        const updater = new update_1.UpdateByPk(user.id);
        yield new Promise(resolve => setTimeout(resolve, 1000));
        yield updater.update({ email: "updated_email@example.com" });
        const updatedUser = yield user_1.default.findByPk(user.id);
        expect(updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.updatedAt).not.toEqual(initialUpdatedAt);
    }), 100000);
});
