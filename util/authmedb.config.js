const Sequelize = require('sequelize');
//const env = require('./env');
require('dotenv').config();
const sequelize = new Sequelize('mclogin', process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mariadb',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//import model
// db.blog = require('../model/blog.js')(sequelize, Sequelize);
// db.user = require('../model/user.js')(sequelize, Sequelize);
// db.blockname = require('../model/blockname.js')(sequelize, Sequelize);
db.mclogin = require('../model/mclogin.js')(sequelize, Sequelize);

module.exports = db;