const { Router } = require('express');
const router = Router();
const leagueController = require('../controllers/league.controller');

router.get('/', leagueController.getLeagues);
router.post('/create', leagueController.createLeague);
router.put('/', leagueController.editLeague);

module.exports = router;