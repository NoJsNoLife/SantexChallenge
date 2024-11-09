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

const fifa = getDBConn().define('fifa', {
  fifa_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  fifa_version: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fifa_update: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fifa_update_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  }
}, {
  tableName: 'fifa', // Nombre de la tabla
  timestamps: false, // Si no tienes columnas createdAt o updatedAt
  modelName: 'fifa'
});

module.exports = fifa;