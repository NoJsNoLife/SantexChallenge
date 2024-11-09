const nationTeam = require('../models/nationTeam');
const nationTeamController = {};

nationTeamController.getNationsTeams = async (req, res) => {
    try {
        const nationTeamId = req.query.id ? parseInt(req.query.id, 10) : null;
        if (nationTeamId) {
            const team = await nationTeam.findByPk(nationTeamId);
            if (team) {
                return res.json(team);
            } else {
                return res.status(404).json({
                    'status': '0',
                    'msg': 'Equipo no encontrado.'
                });
            }
        }
        const teams = await nationTeam.findAll();
        res.json(teams);
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operación.',
            'error': error
        });
    }
};

nationTeamController.createNationTeam = async (req, res) => {
    const { nation_team_name } = req.body;
    try {
        const newNationTeam = await nationTeam.create({
            nation_team_name: nation_team_name
        });
        res.status(201).json({
            'status': '1',
            'msg': 'Equipo guardado.'
        });
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operación.',
            'error': error
        });
    }
};

nationTeamController.editNationTeam = async (req, res) => {
    const nationTeamId = req.query.id ? parseInt(req.query.id, 10) : null;
    const { nation_team_name } = req.body;
    if(!nationTeamId) return res.status(400).json({
        'status': '0',
        'msg': 'ID de equipo no proporcionado.'
    })
    try {
        const team = await nationTeam.findByPk(nationTeamId);
        if (team) {
            if(nation_team_name) team.nation_team_name = nation_team_name;
            
            await team.save();
            res.json({
                'status': '1',
                'msg': 'Equipo actualizado.'
            });
        } else {
            res.status(404).json({
                'status': '0',
                'msg': 'Equipo no encontrado.'
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

//TODO Delete NationTeam - No se puede borrar el equipo nacional por ahora. ESTO ELIMINARIA INFORMACION SENSIBLE DE LA BD.
    
module.exports = nationTeamController;