// import lib
const express = require('express');
const db = require('../util/db.config');
// define variable
const sequelize = db.sequelize;
const Blog = db.blog;
const route = express.Router();

// get blog with id
route.get('/find/id/:id', async (req, res, next) => {
  console.log('body::==', req.body);
  console.log('params::==', req.params);
  const blogId = req.params.id;
  let blogs = {};
  if (blogId) {
    blogs = await Blog.findByPk(blogId);
  }
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json(blogs);
});

route.get('/find/user/:userid', async (req, res, next) => {
  console.log('body::==', req.body);
  console.log('params::==', req.params);
  const userId = req.params.userid;
  let blogs = {};
  if (userId) {
    blogs = await Blog.findAll({
      where: {
        user: userId
      }
    });
  }
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json(blogs);
});

route.get('/find/user/:userid/:pagenumber', async (req, res, next) => {
  console.log('body::==', req.body);
  console.log('params::==', req.params);
  const userId = req.params.userid;
  let blogs = {};
  if (userId) {
    blogs = await Blog.findAll({
      where: {
        user: userId
      },
      offset: (req.params.pagenumber-1)*40,
      limit:40
    });
  }
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json(blogs);
});

// get blogs all
route.get('/find/all', async (req, res, next) => {
  console.log('body::==', req.body);
  console.log('params::==', req.params);
  const blogs = await Blog.findAll();
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json(blogs);
});

//get blogs by using column between x1,y1,z1 and x2,y2,z2
route.get('/find/xyz/:x1/:y1/:z1/:x2/:y2/:z2', async (req, res, next) => {
  const { Op } = require('sequelize');
  console.log('body::==', req.body);
  console.log('params::==', req.params);
    const blogs = await Blog.findAll({
      where: {
        // x: {
        //   [Op.between]: [req.params.x1, req.params.x2]
        // },
        // y: {
        //   [Op.between]: [req.params.y1, req.params.y2]
        // },
        // z: {
        //   [Op.between]: [req.params.z1, req.params.z2]
        // }
        [Op.or]: [
          { x: { [Op.between]: [req.params.x1, req.params.x2] } },
          { y: { [Op.between]: [req.params.y1, req.params.y2] } },
          { z: { [Op.between]: [req.params.z1, req.params.z2] } }
        ]
      },
    });
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(blogs);
});

route.get('/find/xyz/:x1/:y1/:z1/:x2/:y2/:z2/:pagenumber', async (req, res, next) => {
  console.log('body::==', req.body);
  console.log('params::==', req.params);
    const blogs = await Blog.findAll({
      where: {
        // x: {
        //   [Op.between]: [req.params.x1, req.params.x2]
        // },
        // y: {
        //   [Op.between]: [req.params.y1, req.params.y2]
        // },
        // z: {
        //   [Op.between]: [req.params.z1, req.params.z2]
        // }
        [Op.or]: [
          { x: { [Op.between]: [req.params.x1, req.params.x2] } },
          { y: { [Op.between]: [req.params.y1, req.params.y2] } },
          { z: { [Op.between]: [req.params.z1, req.params.z2] } }
        ]
      },
      offset: (req.params.pagenumber-1)*40,
      limit:40
    });
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(blogs);
});

route.get('/find/xyz/count/:x1/:y1/:z1/:x2/:y2/:z2', async (req, res, next) => {
  console.log('body::==', req.body);
  console.log('params::==', req.params);
    const blogs = await Blog.count({
      where: {
        // x: {
        //   [Op.between]: [req.params.x1, req.params.x2]
        // },
        // y: {
        //   [Op.between]: [req.params.y1, req.params.y2]
        // },
        // z: {
        //   [Op.between]: [req.params.z1, req.params.z2]
        // }
        [Op.or]: [
          { x: { [Op.between]: [req.params.x1, req.params.x2] } },
          { y: { [Op.between]: [req.params.y1, req.params.y2] } },
          { z: { [Op.between]: [req.params.z1, req.params.z2] } }
        ]
      },
    });
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(blogs);
});

// get blogs page
route.get('/find/page/:pagenumber', async (req, res, next) => {
  console.log('body::==', req.body);
  console.log('params::==', req.params);
  const blogs = await Blog.findAll({offset: (req.params.pagenumber-1)*40,limit:40});
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json(blogs);
});

// count blogs all
route.get('/find/all/count', async (req, res, next) => {
  console.log('body::==', req.body);
  console.log('params::==', req.params);
  const blogs = await Blog.count();
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json(blogs);
});

route.get('/find/all/count/:userid', async (req, res, next) => {
  console.log('body::==', req.body);
  console.log('params::==', req.params);
  const userId = req.params.userid;
  const blogs = await Blog.count({
    where: {
      user: userId
    }
  });
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json(blogs);
});

//create blog
/*route.post('/create', async (req, res, next) => {
  console.log('body::==', req.body);
  console.log('params::==', req.params);
  const blog = req.body;
  let newBlog = null;
  if (blog) {
    newBlog = await sequelize.transaction(function(t) {
      // chain all your queries here. make sure you return them.
      return Blog.create(blog, { transaction: t });
    });
  }
  res.json(newBlog);
});

//update blog
route.put('/update/:id', async (req, res, next) => {
  console.log('body::==', req.body);
  console.log('params::==', req.params);
  const blog = req.body;
  const postId = req.params.id;
  let updateBlog = null;
  if (blog && postId) {
    updateBlog = await sequelize.transaction(function(t) {
      return Blog.update(
        blog,
        { where: { postId: postId } },
        { transaction: t }
      );
    });
  }
  res.json(updateBlog);
});

//delete blog with id
route.delete('/delete/:id', async (req, res, next) => {
  console.log('body::==', req.body);
  console.log('params::==', req.params);
  const blogId = req.params.id;
  let blogDestroy = null;
  if (blogId) {
    const blog = await Blog.findById(blogId);
    if (blog) {
      blogDestroy = await blog.destroy();
    }
  }
  res.json(blogDestroy);
});*/

module.exports = route;
