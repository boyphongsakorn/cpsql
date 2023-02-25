const express = require('express');
const db = require('../util/skinsrestorer.config');
const sequelize = db.sequelize;
const Skinsrestorer_skins = db.skinsrestorer_skins;
const Skinsrestorer_players = db.skinsrestorer_players;
const route = express.Router();

route.post('/addskin', async (req, res) => {
    //create now unix timestamp
    let timestamp = Math.floor(Date.now() / 1000);
    const addskin = await Skinsrestorer_skins.create({
            Nick: req.body.Nick+"-web",
            Value: req.body.Value,
            Signature: req.body.Signature,
            timestamp: timestamp,
        })
    //update skinsrestorer_players
    const updateplayer = await Skinsrestorer_players.update({
        Skin: req.body.Nick+"-web",
    }, {
        where: {
            Nick: req.body.Nick
        }
    });
    res.setHeader('Access-Control-Allow-Origin', 'https://bpminecraft.com');
    res.send(JSON.stringify({
        "status": "success",
        "message": "Skin added"
    }));
});

route.get('/getskin/:Nick', async (req, res) => {
    Skinsrestorer_skins.findOne({
        where: {
            Nick: req.params.Nick
        }
    }).then((data) => {
        res.setHeader('Access-Control-Allow-Origin', 'https://bpminecraft.com');
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    }).catch((err) => {
        console.log(err);
        res.send(err);
    });
});

route.get('/skinlink/:Nick', async (req, res) => {
    Skinsrestorer_players.findOne({
        where: {
            Nick: req.params.Nick
        }
    }).then((data) => {
        res.setHeader('Access-Control-Allow-Origin', 'https://bpminecraft.com');
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    }).catch((err) => {
        console.log(err);
    });
});

module.exports = route;