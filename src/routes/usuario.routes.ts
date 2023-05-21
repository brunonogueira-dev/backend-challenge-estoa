/* eslint-disable sonarjs/no-duplicate-string */
import { Router } from 'express';
import UsuarioController from '../controller/usuario.controller';
import { existeMiddleware, typesMiddleware } from '../middlewares/usuario.middleware';
import tipoMiddleware from '../middlewares/usuario.tipo.middleware';

const router = Router();

const controller = new UsuarioController();

router.post('/usuarios', existeMiddleware, typesMiddleware, controller.addUsuario.bind(controller));

router.put(
  '/usuarios/:id', 
  existeMiddleware, 
  typesMiddleware,
  tipoMiddleware,
  controller.atualizaUsuario.bind(controller),
);

router.delete('/usuarios/:id', controller.deleteUsuario.bind(controller));

router.get('/usuarios/:id', controller.listaUsuarioId.bind(controller));

router.get('/usuarios', controller.listaUsuarios.bind(controller));

export default router;