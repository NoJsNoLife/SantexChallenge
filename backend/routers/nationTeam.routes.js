const { Router } = require('express');
const router = Router();
const nationTeamController = require('../controllers/nationTeam.controller');

router.get('/', nationTeamController.getNationsTeams);
router.post('/create', nationTeamController.createNationTeam);
router.put('/', nationTeamController.editNationTeam);

module.exports = router;