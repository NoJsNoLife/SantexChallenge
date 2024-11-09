const club = require('../models/club');
const clubController = {};

clubController.getClub = async (req, res) => {
    try {
        const clubId = req.query.id ? parseInt(req.query.id, 10) : null;
        if (clubId) {
            const c = await club.findByPk(clubId);
            if (c) {
                return res.json(c);
            } else {
                return res.status(404).json({
                    'status': '0',
                    'msg': 'Club no encontrado.'
                });
            }
        }
        const clubes = await club.findAll();
        res.json(clubes);
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operación.',
            'error': error
        });
    }
};

clubController.createClub = async (req, res) => {
    const { club_name } = req.body;
    try {
        const newClub = await club.create({
            club_name: club_name
        });
        res.status(201).json({
            'status': '1',
            'msg': 'Club guardado.'
        });
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operación.',
            'error': error
        });
    }
};

clubController.editClub = async (req, res) => {
    const clubId = req.query.id ? parseInt(req.query.id, 10) : null;
    const { club_name } = req.body;
    if(!clubId) return res.status(400).json({
        'status': '0',
        'msg': 'ID de Club no proporcionado.'
    })
    try {
        const c = await club.findByPk(clubId);
        if (c) {
            if(club_name) c.club_name = club_name;
            
            await c.save();
            res.json({
                'status': '1',
                'msg': 'Club actualizado.'
            });
        } else {
            res.status(404).json({
                'status': '0',
                'msg': 'Club no encontrado.'
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

//TODO Delete Club - No se puede borrar el Club por ahora. ESTO ELIMINARIA INFORMACION SENSIBLE DE LA BD.
    
module.exports = clubController;