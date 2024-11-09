const nationality = require('../models/nationality');
const nationalityController = {};

nationalityController.getNationalities = async (req, res) => {
    try {
        const nationalityId = req.query.id ? parseInt(req.query.id, 10) : null;
        if (nationalityId) {
            const nation = await nationality.findByPk(nationalityId);
            if (nation) {
                return res.json(nation);
            } else {
                return res.status(404).json({
                    'status': '0',
                    'msg': 'Nacionalidad no encontrada.'
                });
            }
        }
        const nationalities = await nationality.findAll();
        res.json(nationalities);
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operación.',
            'error': error
        });
    }
};

nationalityController.createNationality = async (req, res) => {
    const { nationality_name } = req.body;
    try {
        const newNationality = await nationality.create({
            nationality_name: nationality_name
        });
        res.status(201).json({
            'status': '1',
            'msg': 'Nacionalidad guardada.'
        });
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operación.',
            'error': error
        });
    }
};

nationalityController.editNationality = async (req, res) => {
    const nationalityId = req.query.id ? parseInt(req.query.id, 10) : null;
    const { nationality_name } = req.body;
    if(!nationalityId) return res.status(400).json({
        'status': '0',
        'msg': 'ID de nacionalidad no proporcionado.'
    })
    try {
        const nation = await nationality.findByPk(nationalityId);
        if (nation) {
            if(nationality_name) nation.nationality_name = nationality_name;
            
            await nation.save();
            res.json({
                'status': '1',
                'msg': 'Nacionalidad actualizada.'
            });
        } else {
            res.status(404).json({
                'status': '0',
                'msg': 'Nacionalidad no encontrada.'
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

//TODO Delete Nationality - No se puede borrar la nacionalidad por ahora. ESTO ELIMINARIA INFORMACION SENSIBLE DE LA BD.
    
module.exports = nationalityController;