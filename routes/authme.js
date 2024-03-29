const express = require('express');
const bpdb = require('../util/bpminecraft.config.js');
const db = require('../util/authmedb.config');
// define variable
const sequelize = db.sequelize;
const Mclogin = db.mclogin;
const Discordmclink = bpdb.discordmclink;
const route = express.Router();

// post check password
route.post('/check', async (req, res) => {
    // get username and password
    const requsername = req.body.username;
    const reqpassword = req.body.password;
    // check if username is empty
    if (requsername === '') {
        res.status(400).json({ error: 'Username is empty' });
    }
    // check if password is empty
    if (reqpassword === '') {
        res.status(400).json({ error: 'Password is empty' });
    }
    // check if username and password is not empty
    if (requsername !== '' && reqpassword !== '') {
        // sha256 password
        console.log(reqpassword);
        const crypto = require('crypto');
        const password = crypto.createHash('sha256').update(reqpassword, 'utf8').digest('hex');
        // get password from database
        const ogpassword = await Mclogin.findOne({
            where: {
                username: requsername
            }
        })
        if (ogpassword === null) {
            return res.status(400).json({ error: 'Username is incorrect' });
        }
        //split password by $ and get the second part
        const ogpassword2 = ogpassword.password.split('$')[2];
        // add ogpassword2 to password
        const passwordwithsalt = password + ogpassword2;
        // sha256 passwordwithsalt
        const aftersalt = crypto.createHash('sha256').update(passwordwithsalt, 'utf8').digest('hex');
        console.log(aftersalt);
        // check if aftersalt is correct as last part of ogpassword
        res.setHeader('Access-Control-Allow-Origin', '*');
        if (aftersalt === ogpassword.password.split('$')[3]) {
            //remove password from ogpassword
            let tempinfo = ogpassword.toJSON();
            delete tempinfo.password;
            const query = await Discordmclink.findOne({
                where: {
                    authme_id: tempinfo.id
                }
            });
            if (query) {
                tempinfo.discord = query.discord;
                tempinfo.minecraftuuid = query.uuid;
                tempinfo.linkdiscord = true;
            } else {
                tempinfo.discord = null;
                tempinfo.minecraftuuid = null;
                tempinfo.linkdiscord = false;
            }
            res.json({ result: 'Login success', info: tempinfo });
        } else {
            res.json({ error: 'Username or password is incorrect' });
        }
        // check if username and password is correct
        // Mclogin.findOne({
        //     where: {
        //         username: username,
        //         password: password
        //     }
        // }).then((result) => {
        //     if (result) {
        //         res.status(200).json({ result: 'Login success' });
        //     } else {
        //         res.status(400).json({ error: 'Username or password is incorrect' });
        //     }
        // }).catch((err) => {
        //     res.status(500).json({ error: err });
        // });
    }
})

// route.get('/findByName/:username', async (req, res) => {
//     const username = req.params.username;
//     const query = await Mclogin.findOne({
//         where: {
//             username: username
//         }
//     });
//     if (query) {
//         res.setHeader('Access-Control-Allow-Origin', '*');
//         res.json({
//             status: 200,
//             message: 'success',
//             id: query.id,
//             username: query.username,
//         });
//     } else {
//         res.setHeader('Access-Control-Allow-Origin', '*');
//         res.json({
//             status: 404,
//             message: 'not found',
//         });
//     }
// });

module.exports = route;