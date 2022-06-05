
const query = require("../../database/query");

const SearchGetController = async (req, res, next) => {

  let search = req.query.search;
  let subSearch = '0';
  if (search) subSearch = search[0];
  let { Gender, Speciality } = req.query

  try {


    if (Gender) {
      let items = await query(`select * from doctorinfo cross join educations  where educations.DoctorId=doctorinfo.DoctorId and (doctorinfo.Gender='${Gender}')`);
      let newItem = items.map(item => {
        return {
          Name: item.Name,
          Speciality: item.Speciality,
          _Option: item._Option,
          VisitClinic: item.VisitClinic,
          VisitOnline: item.VisitOnline
        }
      })
      return res.status(200).json(newItem);
    }

    let items = await query(`select * from doctorinfo cross join educations  where educations.DoctorId=doctorinfo.DoctorId and (doctorinfo.SearchTag like '%${search}%' OR doctorinfo.SearchTag like '%${subSearch}%')`)
    return res.render('./patient/searchProfile', { title: "Search Doctor", items: items });


  }
  catch (e) {

    next();

  }
}

const ViewProfileGetController = async (req, res, next) => {
  let DoctorId = req.params.DoctorId;

  try {
    let DoctorInfo = await query(`select * from Doctorinfo cross join educations  where educations.DoctorId=DoctorInfo.doctorId and DoctorInfo.doctorid='${DoctorId}'`);

    let Patient_has = await query(`select  Count(patient_has_ratings.Rating) as Total, avg(patient_has_ratings.Rating) as Rating,RatingId from patient_has_ratings where ratingId in (select RatingId from ratings where doctorId='${DoctorId}') group by RatingId`);

    let RatingDetails = await query(`select  RatingId,Description from Ratings where doctorId=${DoctorId}`);

   // console.log(Patient_has);
  //  console.log(RatingDetails);

    RatingDetails = generateRating(RatingDetails, Patient_has);
  //  console.log(RatingDetails)

    let totalCnt = await query(`select  avg(patient_has_ratings.Rating) as Avgerage from patient_has_ratings where ratingId in (select RatingId from ratings where doctorId='${DoctorId}')`);



    return res.render('./patient/viewProfile',
      {
        title: `${DoctorInfo[0].Name} Profile`,
        DoctorInfo: DoctorInfo[0],
        RatingDetails: RatingDetails.RatingDetails,
        Total: RatingDetails.Total,
        Avgrage: totalCnt[0].Avgerage
      });

  }
  catch (e) {
    console.log(e);

    next();

  }
}


module.exports = { SearchGetController, ViewProfileGetController }



function generateRating(RatingDetails, Patient_has) {

  let Total = 0;

  for (let i = 0; i < RatingDetails.length; i++) {
    let Rating = 0;
    let SubTotal = 0;
    for (let j = 0; j < Patient_has.length; j++) {
      if (RatingDetails[i].RatingId == Patient_has[j].RatingId) {

        Rating = Patient_has[j].Rating;
        SubTotal = Patient_has[j].Total;
        break;
      }
    }

    RatingDetails[i].Rating = Rating;
    RatingDetails[i].Total = SubTotal;
    Total += RatingDetails[i].Total;

  }

  return { RatingDetails, Total };
}