const { Sequelize } = require('sequelize');
const { DataTypes } = require('sequelize');
const {sequelize1_male, sequelize2_male} = require('../configurations/database');

function getDBConn() {
  try {
    sequelize1_male.validate();
    return sequelize1_male;
  } catch (err) {
    return sequelize2_male;
  }
}

const nationality = getDBConn().define('nacionalidad', {
  nationality_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  nationality_name: {
    type: DataTypes.STRING(150),
    allowNull: false
  }
}, {
  tableName: 'nacionalidades', // Nombre de la tabla
  timestamps: false, // Si no tienes columnas createdAt o updatedAt
  modelName: 'nacionalidad'
});

module.exports = nationality;