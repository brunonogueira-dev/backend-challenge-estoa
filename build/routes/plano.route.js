"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable sonarjs/no-duplicate-string */
const express_1 = require("express");
const plano_controller_1 = __importDefault(require("../controller/plano.controller"));
const plano_middleware_1 = require("../middlewares/plano.middleware");
const router = (0, express_1.Router)();
const controller = new plano_controller_1.default();
router.post('/planos', plano_middleware_1.existeMiddleware, plano_middleware_1.typesMiddleware, plano_middleware_1.positiveMiddleware, controller.addPlano.bind(controller));
router.get('/planos/:id', controller.listaPlanosId.bind(controller));
router.delete('/planos/:id', controller.deletePlano.bind(controller));
router.put('/planos/:id', plano_middleware_1.existeMiddleware, plano_middleware_1.typesMiddleware, plano_middleware_1.positiveMiddleware, controller.atualizaPlano.bind(controller));
router.get('/planos', controller.listarPlanos.bind(controller));
exports.default = router;
