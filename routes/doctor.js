const route = require('express').Router();
const {
    doctorProfileGetController,
    doctorProfilePostController,
    

} =require('../controller/Doctor/doctorProfile1')

const {mainProfileGetController,
    AcceptPatientRequestPostController,
    PresentConsultationGetController,
    StartPrescribingGetController
}=require('../controller/Doctor/MainProfileController')

const {isUserAuthenticated}= require('../middleware/authenticateCheacker');



// main profile 

route.get('/doctor_profile',isUserAuthenticated,mainProfileGetController);
route.post('/accept',isUserAuthenticated,AcceptPatientRequestPostController);

route.get('/present_consultation',isUserAuthenticated,PresentConsultationGetController);
//route.post('/present_consultation/:PatientId',isUserAuthenticated,PresentConsultationGetController);

route.get('/view/prescriptions/:id',isUserAuthenticated,StartPrescribingGetController);


// update profile 
route.get('/profile1',isUserAuthenticated,doctorProfileGetController);
route.post('/profile1',isUserAuthenticated,doctorProfilePostController);


module.exports = route;