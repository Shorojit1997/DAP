

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
        AppointmentList: AppointmentList,
        Status: "End-Ap"
      })
  }
  catch (e) {

    next();

  }
}

const PreviousConsultationGetController = async (req, res, next) => {

  try {

    let AppointmentList = await query(`select Patients.Name,appointments.AppointmentId,appointments.ProblemDesctiption,appointments.VisitAt,appointments.Date,appointments.Status from appointments cross join Patients  where Patients.PatientId=appointments.PatientId and appointments.Status='Completed' and DoctorId='${req.doctor.DoctorId}' order by appointments.Date ASC`);
    return res.render('./doctor/PreviousConsultation.ejs',
      {
        title: 'Previous Consultations',
        sideBarList: DoctorSidebar,
        AppointmentList: AppointmentList,
        Status: "Completed"
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
  const { Status } = req.query
  console.log(Status);



  try {

    //  let patientList=await query(`select Patients.Name , appointments.AppointmentId from appointments cross join patients where appointments.doctorId='${req.doctor.DoctorId}' and appointments.Status='Requesting' and appointments.patientId=patients.patientId`);

    let CurrentAppointments = await query(`select  Name from doctorinfo where Doctorinfo.doctorId in ( select appointments.DoctorId from appointments where not DoctorId=${req.doctor.DoctorId} and appointments.PatientId in (select PatientId from appointments where AppointmentId='${AppointmentId}') and Status='Accepted') limit 10`);


    let MedicleHistory = await query(`select appointmentId from appointments where Status='Completed' and patientId in ( select PatientId from appointments where AppointmentId=${AppointmentId})  limit 10 ;`);

    let PrescriptionHistory = await query(`select * from prescriptions where PatientId=( select PatientId from appointments where AppointmentId=${AppointmentId})  limit 20;`);

    let Mediclereports = await query(`select * from Medicle_reports where PrescriptionId=( select PrescriptionId from Prescriptions where AppointmentId=${AppointmentId})  limit 30;`);

    let Medicine = await query(`select * from Medicines where PrescriptionId=( select PrescriptionId from Prescriptions where AppointmentId=${AppointmentId})  limit 30;`);



    return res.render('./doctor/ViewPrescription',
      {
        title: "View",
        CurrentAppointments,
        MedicleHistory,
        PrescriptionHistory,
        Mediclereports,
        Medicine,
        AppointmentId,
        Status
      });

  }
  catch (e) {

    next();
  }
}

const AddReportPosController = async (req, res, next) => {

  const { ReportName, appointmentId } = req.body
  try {

    let prescription = await query(`select * from prescriptions where AppointmentId=${appointmentId}`);
    if (!prescription.length) {
      await query(`insert into prescriptions (AppointmentId,PatientId) values('${appointmentId}',(select PatientId from appointments where appointmentId=${appointmentId}))`);
    }

    await query(`insert into Medicle_reports(PrescriptionId,PatientId,ReportName) values((select PrescriptionId from prescriptions where appointmentId=${appointmentId}),(select PatientId from appointments where appointmentId=${appointmentId}),'${ReportName}')`);

    return res.json({
      success: true
    })

  }
  catch (e) {

    next();
  }
}

const DeleteReportPosController = async (req, res, next) => {

  const { ReportId } = req.body
  try {
    await query(`delete from medicle_reports where reportId=${ReportId}`);

    return res.json({
      success: true
    })

  }
  catch (e) {

    next();
  }
}



const AddMedicinePosController = async (req, res, next) => {

  const { MedicineName, Duration, Type, Note, appointmentId } = req.body

  try {

    let prescription = await query(`select * from prescriptions where AppointmentId=${appointmentId}`);
    if (!prescription.length) {
      await query(`insert into prescriptions (AppointmentId,PatientId) values('${appointmentId}',(select PatientId from appointments where appointmentId=${appointmentId}))`);
    }

    await query(`insert into Medicines(PrescriptionId,PatientId,MedicineName,Duration,Type,Note) values((select PrescriptionId from prescriptions where appointmentId=${appointmentId}),(select PatientId from appointments where appointmentId=${appointmentId}),'${MedicineName}','${Duration}','${Type}','${Note}')`);

    return res.json({
      success: true
    })

  }
  catch (e) {

    next();
  }
}

const DeleteMedicinePosController = async (req, res, next) => {

  const { MedicineId } = req.body
  try {
    await query(`delete from medicines where MedicineId=${MedicineId}`);

    return res.json({
      success: true
    })

  }
  catch (e) {

    next();
  }
}




const PrescriptionDetailsGetController = async (req, res, next) => {

  const { AppointmentId } = req.body;



  try {

    let AppointmentDetails = await query(`select * from appointments where appointmentId=${AppointmentId}`);
    let DoctorName = await query(`select  Name from doctorinfo where doctorId=( select DoctorId from appointments where appointmentId=${AppointmentId});`);


    let MedicleReports = await query(`select * from Medicle_reports where PrescriptionId=( select PrescriptionId from Prescriptions where AppointmentId=${AppointmentId})  limit 30;`);

    let Medicine = await query(`select * from Medicines where PrescriptionId=( select PrescriptionId from Prescriptions where AppointmentId=${AppointmentId})  limit 30;`);


    return res.json(
      {
        data: {
          DoctorName,
          MedicleReports,
          Medicine,
          AppointmentDetails,
          AppointmentId,
          Status: ""
        },
        success: true
      });

  }
  catch (e) {
    return res.json(
      {
        success: false
      });

  }
}

const AppointmentDetailsGetController = async (req, res, next) => {

  const { AppointmentId } = req.query;

  try {

    let AppointmentDetails = await query(`select Appointments.AppointmentId, DoctorInfo.Name,appointments.ProblemDesctiption,appointments.VisitAt,appointments.Date,appointments.Status from appointments, DoctorInfo where DoctorInfo.DoctorId=appointments.DoctorId  and  appointments.AppointmentId='${AppointmentId}'`)
    return res.json(
      {
        data: {
          AppointmentDetails,
        },
        success: true
      });

  }
  catch (e) {
    return res.json(
      {
        success: false
      });

  }
}

const EndAppointmentPostController = async (req, res, next) => {

  const { AppointmentId } = req.query;
  try {

    await query(`update appointments set Status='Completed' where appointmentId=${AppointmentId}`);
    return res.redirect('/dashboard/present_consultation');

  }
  catch (e) {
    next();

  }
}







module.exports = {
  mainProfileGetController,
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
}