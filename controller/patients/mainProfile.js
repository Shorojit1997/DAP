
const query = require("../../database/query");

const MainProfileGetController = async (req, res, next) => {

    let { Status } = req.query;
    let _query;

    if (Status == 'Previous') {

        _query = `select appointments.AppointmentId, DoctorInfo.Name,appointments.ProblemDesctiption,appointments.VisitAt,appointments.Date,appointments.Status from appointments cross join DoctorInfo  where DoctorInfo.DoctorId=appointments.DoctorId and appointments.Status='Completed' and appointments.PatientId='${req.patient.PatientId}'`;
    }
    else {
        _query = `select appointments.AppointmentId, DoctorInfo.Name,appointments.ProblemDesctiption,appointments.VisitAt,appointments.Date,appointments.Status from appointments cross join DoctorInfo  where DoctorInfo.DoctorId=appointments.DoctorId and (appointments.Status='Requesting' or appointments.Status='Accepted') and appointments.PatientId='${req.patient.PatientId}'`;
    }

    try {
        let Appointment = await query(_query);
        return res.render('./patient/mainProfile',
            {
                title: "Search Doctor",
                AppointmentList: Appointment,
                Status: Status
            });
    }
    catch (e) {

        next();

    }
}

const MainProfilePostController = async (req, res, next) => {
    let DoctorId = req.params.DoctorId;

    try {
        let DoctorInfo = await query(`select * from Doctorinfo cross join educations  where educations.DoctorId=DoctorInfo.doctorId and DoctorInfo.doctorid='${DoctorId}'`);
        return res.render('./patient/viewProfile', { title: `${DoctorInfo[0].Name} Profile`, DoctorInfo: DoctorInfo[0], AppointmenList: Appointment });

    }
    catch (e) {
        next();

    }
}

const TransactionGetController = async (req, res, next) => {

    let pageNumber = req.query.pageNumber;
    if (!pageNumber) pageNumber = 1;

    let lower = (pageNumber - 1) * 10;
    let uper = pageNumber * 10;

    try {

        let transactionList = await query(`select * from transactions ORDER BY CREATED_AT DESC  limit ${lower}, ${uper}`);
        return res.status(200).json({
            success: true,
            data: transactionList
        })

    }
    catch (e) {
        next();

    }

}

const AppointmentPostController = async (req, res, next) => {

    try {

        let transactionList = await query(`select * from transactions ORDER BY CREATED_AT DESC  limit ${lower}, ${uper}`);
        return res.status(200).json({
            success: true,
            data: transactionList
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


const ReviewGetController = async (req, res, next) => {

    let { AppointmentId } = req.query

    try {

        let RatingList = await query(`select RatingId,DoctorId,Description from ratings where doctorid=(select DoctorId from appointments where appointmentId=${AppointmentId})`);

        let Patient_has = await query(`select Rating,RatingId from patient_has_ratings where patientId=${req.patient.PatientId} and appointmentId=${AppointmentId}`);

        RatingList = generateRating(RatingList, Patient_has);
        
        return res.status(200).json({
            success: true,
            data: RatingList
        })

    }
    catch (e) {
        return res.json(
            {
                success: false
            });
    }

}

const ReviewPostController = async (req, res, next) => {

    let { AppointmentId, RatingId, Rating } = req.body

    try {
   
        let found = await query(`select * from patient_has_ratings where AppointmentId=${AppointmentId} and PatientId=${req.patient.PatientId}`);
       
        if (found.length) {
            await query(`delete from patient_has_ratings where AppointmentId=${AppointmentId} and PatientId=${req.patient.PatientId}`);
        }

        await query(`insert into patient_has_ratings(RatingId,AppointmentId,PatientId,Rating) values(${RatingId},${AppointmentId},${req.patient.PatientId},${Rating})`);

        let RatingList = await query(`select RatingId,DoctorId,Description from ratings where doctorid=(select DoctorId from appointments where appointmentId=${AppointmentId})`);

        let Patient_has = await query(`select Rating,RatingId from patient_has_ratings where patientId=${req.patient.PatientId} and appointmentId=${AppointmentId}`);

        RatingList = generateRating(RatingList, Patient_has);
     

        return res.status(200).json({
            success: true,
            data: RatingList
        })

    }
    catch (e) {
        return res.json(
            {
                data:[],
                success: false
            });
    }

}




module.exports = {
    ReviewPostController,
    ReviewGetController,
    PrescriptionDetailsGetController,
    MainProfilePostController,
    MainProfileGetController,
    TransactionGetController,
    AppointmentPostController
}


function generateRating(RatingDetails, Patient_has) {

    for (let i = 0; i < RatingDetails.length; i++) {
        var Rating = 0;
        for (let j = 0; j < Patient_has.length; j++) {

            if (RatingDetails[i].RatingId == Patient_has[j].RatingId) {
                Rating = Patient_has[j].Rating;
                break;
            }
        }
        RatingDetails[i].Rating = Rating;
    }
    return RatingDetails;
}