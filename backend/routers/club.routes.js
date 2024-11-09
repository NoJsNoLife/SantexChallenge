const { Router } = require('express');
const router = Router();
const clubController = require('../controllers/club.controller');

router.get('/', clubController.getClub);
router.post('/create', clubController.createClub);
router.put('/', clubController.editClub);

module.exports = router;