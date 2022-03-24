
const query = require("../../database/query");

const MainProfileGetController = async (req, res, next) => {

    try {
        let Appointment= await query(`select DoctorInfo.Name,appointments.ProblemDesctiption,appointments.VisitAt,appointments.Date,appointments.Status from appointments cross join DoctorInfo  where DoctorInfo.DoctorId=appointments.DoctorId and PatientId='${req.patient.PatientId}'`)
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




module.exports = { MainProfilePostController, MainProfileGetController,TransactionGetController,AppointmentPostController }