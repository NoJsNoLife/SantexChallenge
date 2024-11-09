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

const league = getDBConn().define('league', {
  league_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  league_name: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  league_level: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'ligas', // Nombre de la tabla
  timestamps: false, // Si no tienes columnas createdAt o updatedAt
  modelName: 'liga'
});

module.exports = league;