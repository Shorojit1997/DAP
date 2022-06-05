

const query = require("../../database/query");


const DoctoRatingGetController = async (req, res, next) => {

  try {
    
    let DoctorInfo = await query(`select * from Doctorinfo cross join educations  where educations.DoctorId=DoctorInfo.doctorId and DoctorInfo.doctorid='${req.doctor.DoctorId}'`);
    
    let Patient_has = await query(`select  Count(patient_has_ratings.Rating) as Total, avg(patient_has_ratings.Rating) as Rating,RatingId from patient_has_ratings where ratingId in (select RatingId from ratings where doctorId='${req.doctor.DoctorId}') group by RatingId`);
    
    let RatingDetails = await query(`select  RatingId,Description from Ratings where doctorId=${req.doctor.DoctorId}`);

    RatingDetails=generateRating(RatingDetails, Patient_has);


    let totalCnt=await query(`select  avg(patient_has_ratings.Rating) as Avgerage from patient_has_ratings where ratingId in (select RatingId from ratings where doctorId='${req.doctor.DoctorId}')`);
    
    return res.render('./doctor/doctorViewProfile.ejs',
      {
        title: `${DoctorInfo[0].Name} Profile`,
        DoctorInfo: DoctorInfo[0],
        RatingDetails: RatingDetails.RatingDetails,
        Total:RatingDetails.Total,
        Avgrage:totalCnt[0].Avgerage
      }
    );


  }
  catch (e) {
    next();

  }
}

const DoctoRatingPostController = async (req, res, next) => {

  const { Description } = req.body;


  try {

  let info=  await query(`insert into Ratings(Description,DoctorId) values('${Description}','${req.doctor.DoctorId}')`);

    return res.json(
      {
        data: {
          RatingId:info.insertId
        },
        success: true
      }
    );


  }
  catch (e) {
    next();

  }
}

const DeleteDoctoRatingPostController = async (req, res, next) => {

  const { RatingId } = req.body;
  

  try {

    await query(`delete from patient_has_ratings where RatingId=${RatingId}`);
    await query(`delete from Ratings where RatingId=${RatingId};`);
    return res.json(
      {
        data: {},
        success: true
      }
    );


  }
  catch (e) {
    next();

  }
}






module.exports = {
  DoctoRatingGetController,
  DoctoRatingPostController,
  DeleteDoctoRatingPostController
}



function generateRating(RatingDetails, Patient_has) {

  let Total=0;

  for (let i = 0; i < RatingDetails.length; i++) {
     let Rating=0;
     let SubTotal=0;
    for (let j = 0; j < Patient_has.length; j++) {
      if (RatingDetails[i].RatingId == Patient_has[j].RatingId) {
    
        Rating = Patient_has[j].Rating;
        SubTotal=Patient_has[j].Total;
        break;
      }
    }
  
    RatingDetails[i].Rating = Rating;
    RatingDetails[i].Total=SubTotal;
    Total+= RatingDetails[i].Total;
   
  }

  return {RatingDetails,Total};
}