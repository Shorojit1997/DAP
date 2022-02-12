const route = require('express').Router();
const {
    doctorProfileGetController,
    doctorProfilePostController

} =require('../controller/Doctor/doctorProfile1')

const {isUserAuthenticated}= require('../middleware/authenticateCheacker')

route.get('/profile1',isUserAuthenticated,doctorProfileGetController);
route.post('/profile1',isUserAuthenticated,doctorProfilePostController);


module.exports = route;