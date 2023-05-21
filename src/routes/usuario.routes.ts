/* eslint-disable sonarjs/no-duplicate-string */
import { Router } from 'express';
import UsuarioController from '../controller/usuario.controller';

const router = Router();

const controller = new UsuarioController();

router.post('/usuarios', controller.addUsuario.bind(controller));

router.put('/usuarios/:id', controller.atualizaUsuario.bind(controller));

router.delete('/usuarios/:id', controller.deleteUsuario.bind(controller));

router.get('/usuarios/:id', controller.listaUsuarioId.bind(controller));

router.get('/usuarios', controller.listaUsuarios.bind(controller));

export default router;