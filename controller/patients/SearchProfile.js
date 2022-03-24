
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
    let DoctorId=req.params.DoctorId;
   
  try {
    let DoctorInfo=await query(`select * from Doctorinfo cross join educations  where educations.DoctorId=DoctorInfo.doctorId and DoctorInfo.doctorid='${DoctorId}'`);
    
    return res.render('./patient/viewProfile', { title:`${DoctorInfo[0].Name} Profile`, DoctorInfo: DoctorInfo[0]});

  }
  catch (e) {
    console.log(e);

    next();

  }
}


module.exports = { SearchGetController, ViewProfileGetController }