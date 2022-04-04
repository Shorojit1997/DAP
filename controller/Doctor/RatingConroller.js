

const query = require("../../database/query");


const DoctoRatingGetController = async (req, res, next) => {

  try {
    let DoctorInfo=await query(`select * from Doctorinfo cross join educations  where educations.DoctorId=DoctorInfo.doctorId and DoctorInfo.doctorid='${req.doctor.DoctorId}'`);
    
    return res.render('./doctor/doctorViewProfile.ejs', 
    {
          title:`${DoctorInfo[0].Name} Profile`,
          DoctorInfo: DoctorInfo[0]}
    );


  }
  catch (e) {
    next();

  }
}







module.exports = {
    DoctoRatingGetController
}