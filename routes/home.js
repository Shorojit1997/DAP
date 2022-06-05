const route = require('express').Router();
const {
    home,
    SignupGetController,
    LoginGetController,
    SignupPostController,
    LoginPostController,
    LogoutController

} =require('../controller/HomeController');

const {SearchGetController,ViewProfileGetController}=require('../controller/patients/SearchProfile')

const {payNowPost,PaySuccess,PayCancel,payNowGet}=require('../controller/Gateway/Paypal');
const {AppointmentPostController} =require('../controller/patients/Appointment')

const {isUserAuthenticated}= require('../middleware/authenticateCheacker')


// apointment route 
route.post('/appointment/:DoctorId',isUserAuthenticated,AppointmentPostController);
//search route 
route.get('/doctor/search',SearchGetController);
route.get('/doctor/view/:DoctorId',ViewProfileGetController);

// Payment Gateway integration 
route.post('/pay',isUserAuthenticated,payNowPost);
route.get('/pay',isUserAuthenticated,payNowGet);
route.get('/success',PaySuccess);
route.get('/cancel',PayCancel);

route.get('/signup',SignupGetController);
route.get('/login',LoginGetController);

route.post('/signup',SignupPostController);
route.post('/login',LoginPostController);
route.get('/logout',LogoutController);
route.get('/',home);


module.exports = route;