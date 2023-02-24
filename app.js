// import express & define port = 3000
const express = require('express');
const app = express();
const port = 3000;
// set use body json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// add route
const blogRoute = require('./routes/blog');
app.use('/blog', blogRoute);

const userRoute = require('./routes/user');
app.use('/user', userRoute);

const blocknameRoute = require('./routes/blockname');
app.use('/blockname', blocknameRoute);

const authmeRoute = require('./routes/authme');
app.use('/authme', authmeRoute);
// set port & run server
app.listen(port, () => console.log(`Example app listening on port ${port}!`));