const { Router } = require('express');
const router = Router();
const maleEmployeeController = require('../controllers/maleEmployee.controller');

//definimos las rutas para la gestion de agente
router.get('/', maleEmployeeController.getEmployees);
router.post('/create', maleEmployeeController.createEmployee);
//router.get('/id/:id');
//router.get('/:dni');

module.exports = router;