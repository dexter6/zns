var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mysql = require('mysql');
var path = require('path');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt-nodejs');



var config = require('./config');

app.use(express.static(__dirname+'/public'));

var pool = mysql.createPool(config.pool);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, \ Authorization');
    next();
});
app.use(morgan('dev'));

var authRouter = require('./app/routes/auth')(app,express,pool,jwt,config.secret, bcrypt);
app.use('/auth', authRouter);


var apiRouter = require('./app/routes/api')(app, express, pool);
app.use('/api', apiRouter);

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/app/index.html'));
});

app.listen(config.port);
console.log('Server running on port ' + config.port);
