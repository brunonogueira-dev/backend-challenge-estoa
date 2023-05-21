import { Router } from 'express';
import UsuarioController from '../controller/usuario.controller';

const router = Router();

const controller = new UsuarioController();

router.post('/usuarios', controller.addUsuario.bind(controller));

router.get('/usuarios', controller.listaUsuarios.bind(controller));

export default router;