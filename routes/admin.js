const route = require('express').Router();


const{
    DashboardGetController,
    PatientGetController
    
}=require('../controller/Admin/DashboardController')

const{
    AdminSignupGetController,
    SignupPostController,
    GetLoginPostController,
    LoginPostController,
    LogoutController
   
}=require('../controller/Admin/AuthController')

const {isAdminAuthenticated}= require('../middleware/authenticateCheacker')



 route.get('/signup',isAdminAuthenticated,AdminSignupGetController);
 route.post('/signup',isAdminAuthenticated,SignupPostController);

 route.get('/dashboard',isAdminAuthenticated,DashboardGetController);
 route.get('/patient_table',isAdminAuthenticated,PatientGetController);

 route.get('/login',GetLoginPostController);
route.post('/login',LoginPostController);

route.get('/logout',isAdminAuthenticated,LogoutController);




module.exports = route;