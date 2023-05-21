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
const plano_service_1 = __importDefault(require("../service/plano.service"));
class PlanoController {
    constructor() {
        this.service = new plano_service_1.default();
        this.noPlan = 'Plano inexistente';
    }
    listarPlanos(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const lista = yield this.service.listarPlanos();
            return res.status(200).json({ lista });
        });
    }
    addPlano(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nome, periodo, preco } = req.body;
            const id = yield this.service.addPlano({ nome, periodo, preco });
            return res.status(201).json({ id });
        });
    }
    listaPlanosId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const nId = Number(id);
            const list = yield this.service.listaPlanosId(nId);
            if (list) {
                return res.status(200).json(list);
            }
            return res.status(404).json({ message: this.noPlan });
        });
    }
    deletePlano(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const nId = Number(id);
            const message = yield this.service.deletePlano(nId);
            if (message) {
                return res.status(200).json({ message });
            }
            return res.status(404).json({ message: this.noPlan });
        });
    }
    atualizaPlano(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const data = req.body;
            const nId = Number(id);
            const message = yield this.service.atualizaPlano(nId, data);
            if (message) {
                return res.status(200).json({ message });
            }
            return res.status(404).json({ message: this.noPlan });
        });
    }
}
exports.default = PlanoController;
