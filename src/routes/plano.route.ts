import { Router } from 'express';
import PlanoController from '../controller/plano.controller';

const router = Router();

const controller = new PlanoController();

router.get('/planos', controller.listarPlanos.bind(controller));

export default router;