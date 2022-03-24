
const query = require("../../database/query");


const AppointmentPostController = async (req, res, next) => {

    const { problemStatement, level, visitAt } = req.body
    const DoctorId = req.params.DoctorId
    


    try {
        let patientBalance = await query(`select Balance from patients where patientId='${req.patient.PatientId}' `)
        let doctorVisit;
        if (visitAt == 'Online')
            doctorVisit = await query(`select VisitOnline as Balance from doctorinfo where doctorId='${DoctorId}'`);
        else
            doctorVisit = await query(`select VisitClinic as Balance from doctorinfo where doctorId='${DoctorId}'`);
     

        if (patientBalance[0].Balance >= doctorVisit[0].Balance) {
            await Promise.all[
                query(`update doctorinfo set Balance=Balance+${doctorVisit[0].Balance} where DoctorId='${DoctorId}'`),
                query(`update patients set Balance=Balance-${doctorVisit[0].Balance} where PatientId='${req.patient.PatientId}'`),
                query(`insert into appointments(DoctorId,PatientId,Status,ProblemDesctiption,Emmergiency,VisitAt) values('${DoctorId}','${req.patient.PatientId}','Requesting','${problemStatement}',${level},'${visitAt}');`)]
        }
        return res.redirect('/dashboard/patient_profile');
    }
    catch (e) {
        next();

    }

}




module.exports = { AppointmentPostController }