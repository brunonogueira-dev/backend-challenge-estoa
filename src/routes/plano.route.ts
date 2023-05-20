import { Router } from 'express';
import PlanoController from '../controller/plano.controller';

const router = Router();

const controller = new PlanoController();

router.post('/planos', controller.addPlano.bind(controller));

router.get('/planos/:id', controller.listaPlanosId.bind(controller));

router.delete('/planos/:id', controller.deletePlano.bind(controller));

router.get('/planos', controller.listarPlanos.bind(controller));

export default router;