let express = require("express");
let morgan = require("morgan");
let logger = require("logger")
let setLocals = require('./setLocals');
let { isUserAuthenticated, loginUserbinding } = require('./authenticateCheacker')

var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'doctor'
};

var sessionStore = new MySQLStore(options);

const middleware = [
    morgan('dev'),
    express.json(),
    express.urlencoded({ extended: true, }),
    express.static('public'),
    session({
        key: '_doctor',
        secret: 'doctor_session',
        store: sessionStore,
        resave: true,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60
        }
    }),
    loginUserbinding(),
    setLocals()
]

module.exports = middleware;