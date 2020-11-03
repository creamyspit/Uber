const Sequelize = require('Sequelize')
const sequelize = new Sequelize('Uber', 'root', 'Jemima', {
    host: 'localhost',
    dialect: 'mysql' ,
  
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
  

 
  });
  sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });

module.exports = sequelize