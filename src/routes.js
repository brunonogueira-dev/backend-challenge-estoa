const { Router } = require('express');
const UserController = require('../src/app/controllers/userController')
const PlanController = require('../src/app/controllers/planController')
const SignatureController = require('../src/app/controllers/signatureController')

const router = Router();


//Usuarios
router.get('/users', UserController.findAll);
router.get('/user/:id', UserController.findById);
router.post('/register', UserController.create);
router.put('/user/:id', UserController.update);
router.delete('/delUser/:id', UserController.deleteUser);


//Planos
router.get('/plans', PlanController.findAll);
router.get('/plan/:id', PlanController.findById);
router.post('/create', PlanController.create);
router.put('/plan/:id', PlanController.update);
router.delete('/delPlan/:id', PlanController.deletePlan);


//Assinaturas
router.get('/signature', SignatureController.findAll);
router.get('/signature/:id', SignatureController.findById);
router.post('/sing', SignatureController.create);
router.delete('/delSig/:id', SignatureController.deleteSignature)



module.exports = router;