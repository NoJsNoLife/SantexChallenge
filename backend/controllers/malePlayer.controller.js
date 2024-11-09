const malePlayer = require('../models/malePlayer');
const malePlayerController = {};

malePlayerController.getPlayers = async (req, res) => {
    const malePlayers = await malePlayer.findAll();
    res.json(malePlayers);
};

malePlayerController.createPlayer = async (req, res) => {
    const { dni, short_name, long_name, dob } = req.body;
    console.log(dni, short_name, long_name, dob);
    try {
        const newPlayer = await malePlayer.create({ dni: dni, short_name: short_name, long_name: long_name, dob: dob });
        res.status(201).json({
            'status': '1',
            'msg': 'Jugador guardado.'
        });
    } catch (error) {
        res.status(400).json({
        'status': '0',
        'msg': 'Error procesando operacion.',
        'error': error})
    }
}
    
module.exports = malePlayerController;