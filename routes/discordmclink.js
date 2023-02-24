const express = require('express');
const db = require('../util/bpminecraft.config.js');
// define variable
const sequelize = db.sequelize;
const Discordmclink = db.discordmclink;
const route = express.Router();

//authme
const amdb = require('../util/authmedb.config.js');
const amsequelize = amdb.sequelize;
const Mclogin = amdb.mclogin;

//post check password
route.get('/checklink', async (req, res) => {
    console.log('body::==', req.body);
    console.log('params::==', req.params);
    const discordid = req.query.discordid;
    console.log('discordid::==', discordid);
    const query = await Discordmclink.findOne({
        where: {
            discord: discordid
        }
    });
    //console.log('query::==', query);
    if (query) {
        res.setHeader('Access-Control-Allow-Origin', 'https://bpminecraft.com');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', true);
        res.json({
            status: 200,
            message: 'success',
            minecraftid: query.uuid
        });
    } else {
        res.setHeader('Access-Control-Allow-Origin', 'https://bpminecraft.com');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', true);
        res.json({
            status: 404,
            message: 'not found',
            minecraftid: null
        });
    }
});

route.post('/link', async (req, res) => {
    console.log('body::==', req.body);
    console.log('params::==', req.params);
    const discordid = req.body.discordid;
    const minecraftid = req.body.minecraftid;
    const authme_id = req.body.authme_id;
    const uuidfrom = req.body.uuidfrom;
    console.log('discordid::==', discordid);
    console.log('minecraftid::==', minecraftid);
    const query = await Discordmclink.findOne({
        where: {
            discord: discordid
        }
    });
    const findid = await Mclogin.findOne({
        where: {
            username: minecraftid
        }
    });
    if (query) {
        res.setHeader('Access-Control-Allow-Origin', 'https://bpminecraft.com');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', true);
        res.json({
            status: 201,
            message: 'duplicate',
            minecraftid: query.uuid
        });
    } else {
        let from = 'official'
        if (minecraftid == null) {
            from = 'cracked'
        }
        // insert
        const insert = await Discordmclink.create({
            discord: discordid,
            uuid: minecraftid,
            authme_id: findid.id,
            uuidfrom: uuidfrom
        });
        if (insert) {
            res.setHeader('Access-Control-Allow-Origin', 'https://bpminecraft.com');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
            res.setHeader('Access-Control-Allow-Credentials', true);
            res.json({
                status: 200,
                message: 'success',
                minecraftid: minecraftid
            });
        } else {
            res.setHeader('Access-Control-Allow-Origin', 'https://bpminecraft.com');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
            res.setHeader('Access-Control-Allow-Credentials', true);
            res.json({
                status: 500,
                message: 'error',
                minecraftid: null
            });
        }
    }
});

module.exports = route;