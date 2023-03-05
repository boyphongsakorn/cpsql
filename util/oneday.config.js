const Sequelize = require('sequelize');
//const env = require('./env');
require('dotenv').config();
const sequelize = new Sequelize('oneday', process.env.DB_USER, process.env.DB_PASS, {
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
db.event_room = require('../model/event_room.js')(sequelize, Sequelize);
db.dragon_damage = require('../model/dragon_damage.js')(sequelize, Sequelize);

module.exports = db;