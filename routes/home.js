const route = require('express').Router();
const {
    home,
    SignupGetController,
    LoginGetController,
    SignupPostController,
    LoginPostController,
    LogoutController

} =require('../controller/HomeController')

const {isUserAuthenticated}= require('../middleware/authenticateCheacker')

route.get('/signup',SignupGetController);
route.get('/login',LoginGetController);

route.post('/signup',SignupPostController);
route.post('/login',LoginPostController);
route.get('/logout',LogoutController);
route.get('/',isUserAuthenticated,home);


module.exports = route;