const maleEmployee = require('../models/maleEmployee');
const maleEmployeeController = {};

maleEmployeeController.getEmployees = async (req, res) => {
    const male_employees = await maleEmployee.findAll();
    res.json(male_employees);
};

maleEmployeeController.createEmployee = async (req, res) => {
    const { dni, name, email, birth_date } = req.body;
    console.log(dni,name,email,birth_date);
    try {
        const newEmployee = await maleEmployee.create({ dni: dni, name: name, email: email, birth_date: birth_date });
        res.status(201).json({
            'status': '1',
            'msg': 'Espectador guardado.'
        });
    } catch (error) {
        res.status(400).json({
        'status': '0',
        'msg': 'Error procesando operacion.',
        'error': error})
    }
}
    
module.exports = maleEmployeeController;