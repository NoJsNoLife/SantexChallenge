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

const nation_team = getDBConn().define('nacionalidad', {
  nation_team_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  nation_team_name: {
    type: DataTypes.STRING(150),
    allowNull: false
  }
}, {
  tableName: 'equipos_nacionales', // Nombre de la tabla
  timestamps: false, // Si no tienes columnas createdAt o updatedAt
  modelName: 'equipo_nacional'
});

module.exports = nation_team;