const route = require('express').Router();
const {
    doctorProfileGetController,
    doctorProfilePostController,
    

} =require('../controller/Doctor/doctorProfile1')

const {mainProfileGetController,
    AcceptPatientRequestPostController,
    PresentConsultationGetController,
    PreviousConsultationGetController,
    StartPrescribingGetController,
    AddReportPosController,
    DeleteReportPosController,
    AddMedicinePosController,
    DeleteMedicinePosController,
    PrescriptionDetailsGetController,
    AppointmentDetailsGetController,
    EndAppointmentPostController
}=require('../controller/Doctor/MainProfileController')

const {isUserAuthenticated}= require('../middleware/authenticateCheacker');


const {
    DoctoRatingGetController
} =require('../controller/Doctor/RatingConroller')



route.get('/doctor/rating',isUserAuthenticated,DoctoRatingGetController);

// main profile 

route.get('/doctor_profile',isUserAuthenticated,mainProfileGetController);
route.post('/accept',isUserAuthenticated,AcceptPatientRequestPostController);

route.get('/present_consultation',isUserAuthenticated,PresentConsultationGetController);
route.get('/previous_consultation',isUserAuthenticated,PreviousConsultationGetController);

route.get('/view/prescriptions/:id',isUserAuthenticated,StartPrescribingGetController);
// for reports 
route.post('/view/prescription/reports/add',isUserAuthenticated,AddReportPosController);
route.post('/view/prescription/reports/delete',isUserAuthenticated,DeleteReportPosController);

// for reports 
route.post('/view/prescription/medicine/add',isUserAuthenticated,AddMedicinePosController);
route.post('/view/prescription/medicine/delete',isUserAuthenticated,DeleteMedicinePosController);

route.post('/view/prescription/details',isUserAuthenticated,PrescriptionDetailsGetController);

route.get('/view/appointment_details',isUserAuthenticated,AppointmentDetailsGetController);
route.get('/view/end_appointment',isUserAuthenticated,EndAppointmentPostController);


// update profile 
route.get('/profile1',isUserAuthenticated,doctorProfileGetController);
route.post('/profile1',isUserAuthenticated,doctorProfilePostController);


module.exports = route;