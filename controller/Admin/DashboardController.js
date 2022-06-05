
const bcrypt = require('bcrypt');
const query = require("../../database/query");

const DashboardGetController = async (req, res, next) => {


  try {
     let DoctorDetails=await query(`select * from doctorInfo`);
     let PatientDetails=await query(`select * from patients`);
     let AppointmentDetails=await query(`select * from appointments`);

     let TotalDoctor=await query(`select count(*) as TotalDoctor from doctorInfo`);
     let TotalPatient=await query(`select count(*) as TotalPatient from patients`);
     let TotalAppointment=await query(`select count(*) as TotalAppointment from appointments`);
     let TotalPrescription=await query(`select count(*) as TotalPrescription from prescriptions`);

     console.log(TotalDoctor);

      res.render('./admin/adminIndex.ejs', 
      { 
        title: "Dashboard",
        TotalDoctor:TotalDoctor.length? TotalDoctor[0].TotalDoctor:0,
        TotalPatient:TotalPatient.length? TotalPatient[0].TotalPatient:0,
        TotalAppointment:TotalAppointment.length? TotalAppointment[0].TotalAppointment:0,
        TotalPrescription:TotalPrescription.length? TotalPrescription[0].TotalPrescription:0,
        DoctorDetails,
        PatientDetails,
        AppointmentDetails

      
      });

  }
  catch (e) {
  }
}


const PatientGetController = async (req, res, next) => {


  try {
 
     let PatientDetails=await query(`select * from patients`);

      res.render('./admin/patientDetails.ejs', 
      { 
        title: "Patient Details",
        PatientDetails,
  
      });

  }
  catch (e) {
  }
}






module.exports = { DashboardGetController,PatientGetController }