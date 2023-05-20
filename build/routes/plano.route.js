"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const plano_controller_1 = __importDefault(require("../controller/plano.controller"));
const router = (0, express_1.Router)();
const controller = new plano_controller_1.default();
router.get('/planos', controller.listarPlanos.bind(controller));
// router.post('/pagar-pix', (req: Request, res: Response) =>
//   controller.listarPlanos(req, res));
exports.default = router;
