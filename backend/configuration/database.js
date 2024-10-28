const { Sequelize } = require('sequelize');

const sequelize1 = new Sequelize('fifa_male_players', 'root', 'root', {
  host: 'localhost', 
  dialect: 'mysql',
  port: 3307,
});

const sequelize2 = new Sequelize('fifa_male_players', 'root', 'root', {
  host: 'localhost', 
  dialect: 'mysql',
  port: 3308,
});

// Prueba la conexión
sequelize1.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida correctamente.');
  })
  .catch(err => {
    console.error('No se pudo conectar a la base de datos mysql1:', err);
    console.log('Intentando conectarse a la base de datos mysql2...');
    return sequelize2.authenticate()
      .then(() => {
        console.log('Conexión a la base de datos establecida correctamente.');
    }).catch(err => {
      console.error('No se pudo conectar a la base de datos mysql2:', err);
      console.log('No se pudo conectar a ninguna base de datos. Verifica la conexion de los servidores y que los contenedores esten levantados.');
    });
  });

module.exports = {sequelize1, sequelize2};