const express = require('express');
const app = express();
const codeRouter = require('./routes/code');
const cors = require('cors');

app.use(cors())
app.use(express.json());
app.use('/api/code', codeRouter);

module.exports = app;