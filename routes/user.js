// import lib
const express = require('express');
const db = require('../util/db.config');
// define variable
const sequelize = db.sequelize;
const User = db.user;
const route = express.Router();

// get blog with id
route.get('/find/id/:id', async (req, res, next) => {
  console.log('body::==', req.body);
  console.log('params::==', req.params);
  const userId = req.params.id;
  let blogs = {};
  if (userId) {
    blogs = await User.findByPk(userId);
  }
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json(blogs);
});

// get blogs all
route.get('/find/all', async (req, res, next) => {
  console.log('body::==', req.body);
  console.log('params::==', req.params);
  const blogs = await User.findAll();
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json(blogs);
});

module.exports = route;