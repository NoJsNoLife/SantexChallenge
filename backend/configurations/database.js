const { Sequelize } = require('sequelize');

const femaleDB = 'fifa_female_players';
const maleDB = 'fifa_male_players';
const mysql1_port = 3307;
const mysql2_port = 3308;
const host = 'localhost';
const dialect = 'mysql';
const loggin = false;

const sequelize1_male = new Sequelize(maleDB, 'root', 'root', {
  host: host, 
  dialect: dialect,
  port: mysql1_port,
  logging: loggin,
});
const sequelize1_female = new Sequelize(femaleDB, 'root', 'root', {
  host: host, 
  dialect: dialect,
  port: mysql1_port,
  logging: loggin,
});

const sequelize2_male = new Sequelize(maleDB, 'root', 'root', {
  host: host, 
  dialect: dialect,
  port: mysql2_port,
  logging: loggin,
});
const sequelize2_female = new Sequelize(femaleDB, 'root', 'root', {
  host: host, 
  dialect: dialect,
  port: mysql2_port,
  logging: loggin,
});

// Prueba la conexión
sequelize1_male.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida correctamente.');
  })
  .catch(err => {
    console.error(`No se pudo conectar a la base de datos ${maleDB} en mysql1:`, err);
    console.log('Intentando conectarse a la base de datos mysql2...');
    return sequelize2_male.authenticate()
      .then(() => {
        console.log('Conexión a la base de datos establecida correctamente.');
    }).catch(err => {
      console.error(`No se pudo conectar a la base de datos ${maleDB} en mysql2:`, err);
      console.log(`No se pudo conectar a ninguna base de datos ${maleDB}. Verifica la conexion de los servidores, que los contenedores esten levantados y la existencia de la BD.`);
    });
  });

  sequelize1_female.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida correctamente.');
  })
  .catch(err => {
    console.error(`No se pudo conectar a la base de datos ${femaleDB} en mysql1:`, err);
    console.log('Intentando conectarse a la base de datos mysql2...');
    return sequelize2_male.authenticate()
      .then(() => {
        console.log('Conexión a la base de datos establecida correctamente.');
    }).catch(err => {
      console.error(`No se pudo conectar a la base de datos ${femaleDB} en mysql2:`, err);
      console.log(`No se pudo conectar a ninguna base de datos ${femaleDB}. Verifica la conexion de los servidores, que los contenedores esten levantados y la existencia de la BD.`);
    });
  });
module.exports = {sequelize1_male, sequelize1_female, sequelize2_male, sequelize2_female};