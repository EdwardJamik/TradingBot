const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const botRoute = require('./routes/bot.route');
const bodyParser = require('body-parser');
const path = require("path");
const fs = require("fs");
require('dotenv').config();

const app = express();
const sendingFolder = path.join(__dirname, 'uploads');
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // змініть '*' на домен вашого React додатку
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

//middlewares
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());

app.use(cors({
    origin: true,
    credentials: true,
}));

app.use('/api/v1/', botRoute);
// app.use('/api/v1/admin/', require('./routes/admin.route'));

app.use('*', (req, res) => res.status(404).json({ error: 'not found' }));

module.exports = app;
