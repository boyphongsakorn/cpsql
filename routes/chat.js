// import lib
const express = require('express');
const db = require('../util/db.config');
// define variable
const sequelize = db.sequelize;
const Chat = db.chat;
const route = express.Router();

route.get('/history', (req, res) => {
    Chat.findAll().then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send(err);
    });
});

module.exports = route;