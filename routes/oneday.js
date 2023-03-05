const express = require('express');
const db = require('../util/oneday.config.js');
// define variable
const sequelize = db.sequelize;
const Dragon_damage = db.dragon_damage;
const Event_room = db.event_room;
const route = express.Router();

route.get('/allevent', async (req, res) => {
    Event_room.findAll(
        {
            order: [
                ['event_start', 'ASC']
            ],
        }
    ).then((data) => {
        res.setHeader('Access-Control-Allow-Origin', 'https://bpminecraft.com');
        res.send(data);
    }).catch((err) => {
        console.log(err);
        res.setHeader('Access-Control-Allow-Origin', 'https://bpminecraft.com');
        res.send(err);
    });
});

route.get('/damage/:event_id', async (req, res) => {
    Dragon_damage.findAll(
        {
            where: {
                event_id: req.params.event_id
            },
            order: [
                ['alldamage', 'DESC']
            ],
        }
    ).then((data) => {
        res.setHeader('Access-Control-Allow-Origin', 'https://bpminecraft.com');
        res.send(data);
    }).catch((err) => {
        console.log(err);
        res.setHeader('Access-Control-Allow-Origin', 'https://bpminecraft.com');
        res.send(err);
    });
});

module.exports = route;