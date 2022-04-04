
const query = require("../../database/query");

const MainProfileGetController = async (req, res, next) => {

    let {Status}=req.query;
    let _query;
    
    if(Status=='Previous'){
       
        _query=`select appointments.AppointmentId, DoctorInfo.Name,appointments.ProblemDesctiption,appointments.VisitAt,appointments.Date,appointments.Status from appointments cross join DoctorInfo  where DoctorInfo.DoctorId=appointments.DoctorId and appointments.Status='Completed' and appointments.PatientId='${req.patient.PatientId}'`;
    }
    else{
        _query=`select appointments.AppointmentId, DoctorInfo.Name,appointments.ProblemDesctiption,appointments.VisitAt,appointments.Date,appointments.Status from appointments cross join DoctorInfo  where DoctorInfo.DoctorId=appointments.DoctorId and (appointments.Status='Requesting' or appointments.Status='Accepted') and appointments.PatientId='${req.patient.PatientId}'`;
    }

    try {
        let Appointment= await query(_query);
        return res.render('./patient/mainProfile', { title: "Search Doctor",AppointmentList:Appointment });
    }
    catch (e) {

        next();

    }
}

const MainProfilePostController = async (req, res, next) => {
    let DoctorId = req.params.DoctorId;

    try {
        let DoctorInfo = await query(`select * from Doctorinfo cross join educations  where educations.DoctorId=DoctorInfo.doctorId and DoctorInfo.doctorid='${DoctorId}'`);
        return res.render('./patient/viewProfile', { title: `${DoctorInfo[0].Name} Profile`, DoctorInfo: DoctorInfo[0],AppointmenList:Appointment });

    }
    catch (e) {
        next();

    }
}

const TransactionGetController=async(req,res,next)=>{

       let pageNumber=req.query.pageNumber;
       if(!pageNumber)pageNumber=1;

       let lower=(pageNumber-1)*10;
       let uper=pageNumber*10;

    try {

        let transactionList=await query(`select * from transactions ORDER BY CREATED_AT DESC  limit ${lower}, ${uper}`);
        return res.status(200).json({
            success:true,
            data:transactionList
        })

    }
    catch (e) {
        next();

    }

}

const AppointmentPostController=async(req,res,next)=>{

 try {

     let transactionList=await query(`select * from transactions ORDER BY CREATED_AT DESC  limit ${lower}, ${uper}`);
     return res.status(200).json({
         success:true,
         data:transactionList
     })

 }
 catch (e) {
     next();

 }

}

const PrescriptionDetailsGetController = async (req, res, next) => {

    const { AppointmentId } = req.query;
 
  
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
  
  




module.exports = { 
    PrescriptionDetailsGetController,
    MainProfilePostController, 
    MainProfileGetController,
    TransactionGetController,
    AppointmentPostController 
}