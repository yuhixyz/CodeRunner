const express = require('express');
const app = express();
const codeRouter = require('./routes/code');
const cors = require('cors');
const userRouter = require('./routes/user');
const config = require('./utils/config');
const mongoose = require('mongoose')
const path = require('path');

console.log('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
    .then(result => {
        // console.log(result);
    })
    .catch(err => {
        console.log(err.message);
    });


app.use(express.static('dist'))
app.use(cors())
app.use(express.json());
app.use('/api/users', userRouter);
app.use('/api/code', codeRouter);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});


module.exports = app;