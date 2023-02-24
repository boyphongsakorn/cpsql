// import lib
const express = require('express');
const db = require('../util/db.config');
// define variable
const sequelize = db.sequelize;
const Chat = db.chat;
const route = express.Router();

route.get('/history/:id', async (req, res) => {
    Chat.findAll(
        {
            where: {
                user: req.params.id
            },
            order: [
                ['time', 'DESC']
            ],
        }
    ).then((data) => {
        res.setHeader('Access-Control-Allow-Origin', 'https://bpminecraft.com');
        res.send(data);
    }).catch((err) => {
        console.log(err);
        res.send(err);
    });
});

route.get('/history', async (req, res) => {
    const { Op } = require('sequelize');
    //unix yesterday
    let yesterday = Math.floor(Date.now() / 1000) - 86400;
    Chat.findAll(
        {
            where: {
                time: {
                    [Op.gt]: yesterday
                }
            },
            order: [
                ['time', 'DESC']
            ],
        }
    ).then((data) => {
        res.setHeader('Access-Control-Allow-Origin', 'https://bpminecraft.com');
        res.send(data);
    }).catch((err) => {
        console.log(err);
        res.send(err);
    });
});

module.exports = route;