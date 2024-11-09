const league = require('../models/league');
const leagueController = {};

leagueController.getLeagues = async (req, res) => {
    try {
        const leagueId = req.query.id ? parseInt(req.query.id, 10) : null;
        if (leagueId) {
            const auxLeague = await league.findByPk(leagueId);
            if (auxLeague) {
                return res.json(auxLeague);
            } else {
                return res.status(404).json({
                    'status': '0',
                    'msg': 'Liga no encontrada.'
                });
            }
        }
        // Si no hay ID en el query, devuelve todos los jugadores
        const leagues = await league.findAll();
        res.json(leagues);
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operación.',
            'error': error
        });
    }
};

leagueController.createLeague = async (req, res) => {
    const { league_name, league_level } = req.body;
    try {
        const newLeague = await league.create({
            league_name: league_name,
            league_level: league_level
        });
        res.status(201).json({
            'status': '1',
            'msg': 'Liga guardada.'
        });
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operación.',
            'error': error
        });
    }
};

leagueController.editLeague = async (req, res) => {
    const leagueId = req.query.id ? parseInt(req.query.id, 10) : null;
    const { league_name, league_level } = req.body;
    if(leagueId === null) return res.status(400).json({
        'status': '0',
        'msg': 'ID de liga no proporcionado.'
    })
    try {
        const auxLeague = await league.findByPk(leagueId);
        if (auxLeague) {
            if(league_name) auxLeague.league_name = league_name;
            if(league_level) auxLeague.league_level = league_level;
            await auxLeague.save();
            res.json({
                'status': '1',
                'msg': 'Liga actualizada.'
            });
        } else {
            res.status(404).json({
                'status': '0',
                'msg': 'Liga no encontrada.'
            });
        }
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operación.',
            'error': error
        });
    }
};

//TODO Delete League - No se puede borrar la liga por ahora. ESTO ELIMINARIA MUCHA INFORMACION SENSIBLE DE LA DB.
    
module.exports = leagueController;