// import lib
const express = require('express');
const db = require('../util/db.config');
// define variable
const sequelize = db.sequelize;
const User_log = db.user_log;
const route = express.Router();

route.get('/log/uuid/:uuid', async (req, res) => {
    const uuid = req.params.uuid;
    const result = await User_log.findOne({
        where: {
            uuid: uuid
        }
    });
    res.setHeader('Access-Control-Allow-Origin', 'https://bpminecraft.com');
    res.send(result);
});

module.exports = route;