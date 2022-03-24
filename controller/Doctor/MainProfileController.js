

const query = require("../../database/query");
const { DoctorSidebar } = require('../../controller/sidelinkList')
const mainProfileGetController = async (req, res, next) => {

  try {

    let AppointmentList = await query(`select Patients.Name,appointments.AppointmentId,appointments.ProblemDesctiption,appointments.VisitAt,appointments.Date,appointments.Status from appointments cross join Patients  where Patients.PatientId=appointments.PatientId and appointments.Status='Requesting' and DoctorId='${req.doctor.DoctorId}'`);
    return res.render('./doctor/mainDoctorProfile',
      {
        title: 'Doctor Profile',
        sideBarList: DoctorSidebar,
        AppointmentList: AppointmentList
      })
  }
  catch (e) {

    next();

  }
}


const PresentConsultationGetController = async (req, res, next) => {

  try {

    let AppointmentList = await query(`select Patients.Name,appointments.AppointmentId,appointments.ProblemDesctiption,appointments.VisitAt,appointments.Date,appointments.Status from appointments cross join Patients  where Patients.PatientId=appointments.PatientId and appointments.Status='Accepted' and DoctorId='${req.doctor.DoctorId}' order by appointments.Date ASC`);
    return res.render('./doctor/PresentConsultation',
      {
        title: 'Present Consultations',
        sideBarList: DoctorSidebar,
        AppointmentList: AppointmentList
      })
  }
  catch (e) {

    next();

  }
}
const AcceptPatientRequestPostController = async (req, res, next) => {
  var { date } = req.body;
  var { appointmentId } = req.query;
  try {
    await query(`update appointments set Date='${date}',Status='Accepted' where AppointmentId='${appointmentId}'`);
    return res.redirect('/dashboard/doctor_profile');

  }
  catch (e) {
    next();
  }
}


const StartPrescribingGetController = async (req, res, next) => {

  const AppointmentId = req.params.id;


  try {

    //  let patientList=await query(`select Patients.Name , appointments.AppointmentId from appointments cross join patients where appointments.doctorId='${req.doctor.DoctorId}' and appointments.Status='Requesting' and appointments.patientId=patients.patientId`);

    let CurrentAppointments=await query(`select Name from doctorinfo where Doctorinfo.doctorId in ( select appointments.DoctorId from appointments where not DoctorId=${req.doctor.DoctorId} and appointments.PatientId in (select PatientId from appointments where AppointmentId='${AppointmentId}') and Status='Accepted')`);

    let MedicleHistory=await query(`select appointmentId from appointments where Status='Completed' and patientId in ( select PatientId from appointments where AppointmentId=${AppointmentId});`);

    let PrescriptionHistory=await query(`select * from prescriptions where PatientId in ( select PatientId from appointments where AppointmentId=${AppointmentId});`);

    let Mediclereports=await query(`select * from Medicle_reports where PatientId in ( select PatientId from appointments where AppointmentId=${AppointmentId});`);
   




    return res.render('./doctor/ViewPrescription',
      {
        title: "View",
        CurrentAppointments,
        MedicleHistory,
        PrescriptionHistory,
        Mediclereports
      });

  }
  catch (e) {
    console.log(e);
    next();
  }
}



module.exports = {
  mainProfileGetController,
  AcceptPatientRequestPostController,
  PresentConsultationGetController,
  StartPrescribingGetController
}