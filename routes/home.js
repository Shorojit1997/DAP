const route = require('express').Router();
const {home} =require('../controller/Home')


route.get('',home);

module.exports = route;