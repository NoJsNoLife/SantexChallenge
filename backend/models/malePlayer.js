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

const malePlayer = getDBConn().define('malePlayer', {
  player_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  short_name: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  long_name: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  dob: {
    type: DataTypes.DATEONLY,
    allowNull: false
  }
}, {
  tableName: 'jugadores', // Nombre de la tabla
  timestamps: false, // Si no tienes columnas createdAt o updatedAt
  modelName: 'jugador'
});

module.exports = malePlayer;