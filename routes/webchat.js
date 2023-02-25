const express = require('express');
const db = require('../util/bpminecraft.config.js');
// define variable
const sequelize = db.sequelize;
const Webchat = db.webchat;
const route = express.Router();

route.get('/history', async (req, res) => {
    const { Op } = require('sequelize');
    //unix yesterday
    let yesterday = Math.floor(Date.now() / 1000) - 86400;
    Webchat.findAll(
        {
            where: {
                time: {
                    [Op.gt]: yesterday
                }
            },
            order: [
                ['time', 'ASC']
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

route.post('/newchat', async (req, res) => {
    //console.log(req.body);
    Webchat.create({
        time: req.body.time,
        user: req.body.user,
        discord: req.body.discord,
        message: req.body.message,
    }).then((data) => {
        res.setHeader('Access-Control-Allow-Origin', 'https://bpminecraft.com');
        res.send(data);
    }).catch((err) => {
        console.log(err);
        res.send(err);
    });
});

module.exports = route;