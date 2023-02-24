const Sequelize = require('sequelize');
const env = require('./env');
const sequelize = new Sequelize(env.database, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mariadb',
  operatorsAliases: false,

  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//import model
db.blog = require('../model/blog.js')(sequelize, Sequelize);
db.user = require('../model/user.js')(sequelize, Sequelize);
db.blockname = require('../model/blockname.js')(sequelize, Sequelize);
db.chat = require('../model/chat.js')(sequelize, Sequelize);

module.exports = db;