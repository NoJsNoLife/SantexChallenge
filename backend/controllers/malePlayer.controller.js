const malePlayer = require('../models/malePlayer');
const malePlayerController = {};

malePlayerController.getPlayers = async (req, res) => {
    try {
        const playerId = req.query.id ? parseInt(req.query.id, 10) : null;
        if (playerId) {
            // Si se proporciona un ID en el query, busca solo ese jugador
            const player = await malePlayer.findByPk(playerId);
            if (player) {
                return res.json(player);
            } else {
                return res.status(404).json({
                    'status': '0',
                    'msg': 'Jugador no encontrado.'
                });
            }
        }
        // Si no hay ID en el query, devuelve todos los jugadores
        const players = await malePlayer.findAll();
        res.json(players);
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operación.',
            'error': error
        });
    }
};

malePlayerController.createPlayer = async (req, res) => {
    const { short_name, long_name, dob } = req.body;

    // Verifica que el formato de dob sea válido
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(dob)) {
        return res.status(400).json({
            'status': '0',
            'msg': 'Formato de fecha inválido. Use "YYYY-MM-DD".'
        });
    }
    try {
        const newPlayer = await malePlayer.create({
            short_name: short_name,
            long_name: long_name,
            dob: dob
        });
        res.status(201).json({
            'status': '1',
            'msg': 'Jugador guardado.'
        });
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operación.',
            'error': error
        });
    }
};

malePlayerController.editPlayer = async (req, res) => {
    const playerId = req.query.id ? parseInt(req.query.id, 10) : null;
    const { short_name, long_name, dob } = req.body;
    // Verifica que el formato de dob sea válido
    if(playerId === null) return res.status(400).json({
        'status': '0',
        'msg': 'ID de jugador no proporcionado.'
    })
    try {
        const player = await malePlayer.findByPk(playerId);
        if (player) {
            // Actualiza el jugador
            if(short_name) player.short_name = short_name;
            if(long_name) player.long_name = long_name;
            if(dob){ 
                const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
                if (!dateRegex.test(dob)) {
                    return res.status(400).json({
                        'status': '0',
                        'msg': 'Formato de fecha inválido. Use "YYYY-MM-DD".'
                    });
                }
                player.dob = dob;
            }
            await player.save();
            res.json({
                'status': '1',
                'msg': 'Jugador actualizado.'
            });
        } else {
            res.status(404).json({
                'status': '0',
                'msg': 'Jugador no encontrado.'
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

//TODO Delete Player - No se puede borrar el jugador por ahora. ESTO ELIMINARIA TODA LA INFORMACION DE PERFILES, CONTRATOS, ETC.
    
module.exports = malePlayerController;