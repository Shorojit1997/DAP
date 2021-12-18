let express = require("express");
let morgan = require("morgan");

const middleware = [
    morgan('dev'),
    express.json(),
    express.urlencoded({ extended: false, }),
    express.static('public'),
]

module.exports = middleware;