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

app.all('*', (req, res) => {
    res.set('Access-Control-Allow-Origin','http://myapp.com');
    res.set('Access-Control-Allow-Methods','GET,POST');
    res.set('Access-Control-Allow-Headers','X-Requested-With,Content-Type');

    if ('OPTIONS' == req.method) return res.send(200);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));