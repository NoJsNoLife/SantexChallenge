const { Router } = require('express');
const router = Router();
const fifaController = require('../controllers/fifa.controller');

router.get('/', fifaController.getFifa);
router.post('/create', fifaController.createFifa);
router.put('/', fifaController.editFifa);

module.exports = router;