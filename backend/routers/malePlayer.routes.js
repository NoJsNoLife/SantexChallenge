const { Router } = require('express');
const router = Router();
const malePlayerController = require('../controllers/malePlayer.controller');

router.get('/', malePlayerController.getPlayers);
router.post('/create', malePlayerController.createPlayer);
router.put('/', malePlayerController.editPlayer);

module.exports = router;