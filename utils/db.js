const Sequelize = require('sequelize');

let sequelize = null;


sequelize = new Sequelize('test', 'root', 'gulu@123', {
  host: '127.0.0.1',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  timezone:'+08:00',
  define: { 
  	engine: 'InnoDB' ,
  	charset:'utf8mb4',
  	
  },
});



module.exports = sequelize;