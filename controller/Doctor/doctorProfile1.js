
const bcrypt = require('bcrypt');
const query = require("../../database/query");

const doctorProfileGetController = async (req, res, next) => {

  try {
    let ProfileRate = await query(`select CompleteProfile from doctorinfo where doctorid='${req.doctor.DoctorId}';`);
    if (ProfileRate[0].CompleteProfile < 50) {
      let doctor = await query(`select * from doctorinfo cross join address where address.AddressId=doctorinfo.AddressId and DoctorId='${req.doctor.DoctorId}'`);
      if (doctor) {
        res.locals.doctor = doctor[0];
      }
      res.render('./doctor/doctorprofile1', { title: "Dashboard", user: { isLogin: false } });
    }
    else if (ProfileRate[0].CompleteProfile < 75) {
      let doctor = await query(`select * from doctorinfo cross join address where address.AddressId=doctorinfo.AddressId and DoctorId='${req.doctor.DoctorId}'`);
      if (doctor) {
        res.locals.doctor = doctor[0];
      }
      res.render('./doctor/doctorprofile1', { title: "Dashboard", user: { isLogin: false } });
    }
  }
  catch (e) {

    console.log(e);

  }
}

const doctorProfilePostController = async (req, res, next) => {

  try {
    let ProfileRate = await query(`select CompleteProfile from doctorinfo where doctorid='${req.doctor.DoctorId}';`);
    let addressId = await query(`insert into address(Location,Zip,Country) values('${req.body.location}','${req.body.zip}','${req.body.country}')`);
    await query(`update doctorinfo set CompleteProfile=50, AddressId='${addressId.insertId}', Name='${req.body.name}', DateOfBirth='${req.body.date.slice(0, 10)}',Gender='${req.body.gender}' where DoctorId='${req.doctor.DoctorId}'`)
    return res.redirect('/dashboard/profile1')
  }
  catch (e) {

    console.log(e);

  }
}


module.exports = { doctorProfileGetController, doctorProfilePostController }