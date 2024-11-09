const fifa = require('../models/fifa');
const fifaController = {};

fifaController.getFifa = async (req, res) => {
    try {
        const fifaId = req.query.id ? parseInt(req.query.id, 10) : null;
        if (fifaId) {
            const f = await fifa.findByPk(fifaId);
            if (f) {
                return res.json(f);
            } else {
                return res.status(404).json({
                    'status': '0',
                    'msg': 'Version de fifa no encontrada.'
                });
            }
        }
        const f = await fifa.findAll();
        res.json(f);
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operación.',
            'error': error
        });
    }
};

fifaController.createFifa = async (req, res) => {
    const { fifa_version, fifa_update, fifa_update_date } = req.body;

    // Verifica que el formato de fifa_update_date sea válido
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(fifa_update_date)) {
        return res.status(400).json({
            'status': '0',
            'msg': 'Formato de fecha inválido. Use "YYYY-MM-DD".'
        });
    }
    try {
        const newFifa = await fifa.create({
            fifa_version: fifa_version,
            fifa_update: fifa_update,
            fifa_update_date: fifa_update_date
        });
        res.status(201).json({
            'status': '1',
            'msg': 'Version de Fifa guardada.'
        });
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operación.',
            'error': error
        });
    }
};

fifaController.editFifa = async (req, res) => {
    const fifaId = req.query.id ? parseInt(req.query.id, 10) : null;
    const { fifa_version, fifa_update, fifa_update_date } = req.body;
    // Verifica que el formato de fifa_update_date sea válido
    if(fifaId === null) return res.status(400).json({
        'status': '0',
        'msg': 'ID de Fifa no proporcionado.'
    })
    try {
        const f = await fifa.findByPk(fifaId);
        if (f) {
            if(fifa_version) f.fifa_version = fifa_version;
            if(fifa_update) f.fifa_update = fifa_update;
            if(fifa_update_date){ 
                const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
                if (!dateRegex.test(fifa_update_date)) {
                    return res.status(400).json({
                        'status': '0',
                        'msg': 'Formato de fecha inválido. Use "YYYY-MM-DD".'
                    });
                }
                f.fifa_update_date = fifa_update_date;
            }
            await f.save();
            res.json({
                'status': '1',
                'msg': 'Version de Fifa actualizada.'
            });
        } else {
            res.status(404).json({
                'status': '0',
                'msg': 'Version de Fifa no encontrada.'
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

//TODO Delete Fifa - No se puede borrar la version de Fifa por ahora. ESTO ELIMINARIA MUCHA INFORMACION SENSIBLE DE LA DB.
    
module.exports = fifaController;