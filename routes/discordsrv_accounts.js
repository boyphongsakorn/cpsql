const express = require('express');
const db = require('../util/discordsrv.config.js');
// define variable
const sequelize = db.sequelize;
const Discordsrv_accounts = db.discordsrv_accounts;
const route = express.Router();

// post check password
route.get('/checklink', async (req, res) => {
    console.log('body::==', req.body);
    console.log('params::==', req.params);
    const discordid = req.query.discordid;
    console.log('discordid::==', discordid);
    const query = await Discordsrv_accounts.findOne({
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

module.exports = route;