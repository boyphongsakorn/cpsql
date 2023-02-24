const express = require('express');
const db = require('../util/authmedb.config');
// define variable
const sequelize = db.sequelize;
const Mclogin = db.mclogin;
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
        //split password by $ and get the second part
        const ogpassword2 = ogpassword.password.split('$')[2];
        // add ogpassword2 to password
        const passwordwithsalt = password + ogpassword2;
        // sha256 passwordwithsalt
        const aftersalt = crypto.createHash('sha256').update(passwordwithsalt, 'utf8').digest('hex');
        console.log(aftersalt);
        // check if aftersalt is correct as last part of ogpassword
        if (aftersalt === ogpassword.password.split('$')[3]) {
            res.status(200).json({ result: 'Login success' });
        } else {
            res.status(400).json({ error: 'Username or password is incorrect' });
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

module.exports = route;