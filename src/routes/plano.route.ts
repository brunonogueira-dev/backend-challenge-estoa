/* eslint-disable sonarjs/no-duplicate-string */
import { Router } from 'express';
import PlanoController from '../controller/plano.controller';
import { 
  existeMiddleware, 
  typesMiddleware, 
  positiveMiddleware } from '../middlewares/plano.middleware';

const router = Router();

const controller = new PlanoController();

router.post(
  '/planos', 
  existeMiddleware, 
  typesMiddleware, 
  positiveMiddleware,
  controller.addPlano.bind(controller),
);

router.get('/planos/:id', controller.listaPlanosId.bind(controller));

router.delete('/planos/:id', controller.deletePlano.bind(controller));

router.put(
  '/planos/:id', 
  existeMiddleware, 
  typesMiddleware, 
  positiveMiddleware,
  controller.atualizaPlano.bind(controller),
);

router.get('/planos', controller.listarPlanos.bind(controller));

export default router;