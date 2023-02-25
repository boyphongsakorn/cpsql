const Sequelize = require('sequelize');
require('dotenv').config();
const sequelize = new Sequelize('skinsrestorer', process.env.DB_USER, process.env.DB_PASS, {
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

db.skinsrestorer_players = require('../model/skinsrestorer_players.js')(sequelize, Sequelize);
db.skinsrestorer_skins = require('../model/skinsrestorer_skins.js')(sequelize, Sequelize);

module.exports = db;