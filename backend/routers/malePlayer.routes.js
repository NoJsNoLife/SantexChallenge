const { Router } = require('express');
const router = Router();
const malePlayerController = require('../controllers/malePlayer.controller');

//definimos las rutas para la gestion de agente
router.get('/', malePlayerController.getPlayers);
//router.post('/');
//router.get('/id/:id');
//router.get('/:dni');

module.exports = router;