const route = require('express').Router();
const {
    PatientProfileGetController,
     PatientProfilePostController

} =require('../controller/patients/patientProfile');

const {
    PrescriptionDetailsGetController,
    MainProfileGetController,
    MainProfilePostController,
    TransactionGetController
} =require('../controller/patients/mainProfile')


const {isUserAuthenticated}= require('../middleware/authenticateCheacker')

route.get('/patient',isUserAuthenticated,PatientProfileGetController);
route.post('/patient',isUserAuthenticated,PatientProfilePostController);

route.get('/patient/prescription',isUserAuthenticated,PrescriptionDetailsGetController);
route.get('/patient_profile',isUserAuthenticated,MainProfileGetController);
route.post('/patient_profile',isUserAuthenticated,MainProfilePostController);

route.get('/transaction',isUserAuthenticated,TransactionGetController);



module.exports = route;