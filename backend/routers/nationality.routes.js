const { Router } = require('express');
const router = Router();
const nationalityController = require('../controllers/nationality.controller');

router.get('/', nationalityController.getNationalities);
router.post('/create', nationalityController.createNationality);
router.put('/', nationalityController.editNationality);

module.exports = router;