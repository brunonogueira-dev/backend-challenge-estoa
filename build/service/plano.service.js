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
const plano_model_1 = __importDefault(require("../database/models/plano.model"));
class PlanoService {
    // eslint-disable-next-line class-methods-use-this
    listarPlanos() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield plano_model_1.default.findAll();
            response.forEach((r) => {
                // eslint-disable-next-line no-param-reassign
                r.preco /= 100;
            });
            return response;
        });
    }
    // eslint-disable-next-line class-methods-use-this
    addPlano(data) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(data);
            const { nome, periodo, preco } = data;
            const { id } = yield plano_model_1.default.create({ nome, periodo, preco: preco * 100 });
            return id;
        });
    }
}
exports.default = PlanoService;
