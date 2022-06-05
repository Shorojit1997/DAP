
const bcrypt = require('bcrypt');
const query = require("../../database/query");

const doctorProfileGetController = async (req, res, next) => {

  let page = 1;
  page = req.query.pageNumber

  try {

    let ProfileRate = await query(`select CompleteProfile from doctorinfo where doctorid='${req.doctor.DoctorId}';`);
    if (ProfileRate[0].CompleteProfile < 50) {
      let doctor = await query(`select * from doctorinfo cross join address where address.AddressId=doctorinfo.AddressId and DoctorId='${req.doctor.DoctorId}'`);
      if (doctor.length) {

        res.locals.doctor = doctor[0];
      }
      res.render('./doctor/doctorprofile1', { title: "Dashboard", user: { isLogin: false } });
    }

    else if (ProfileRate[0].CompleteProfile < 75) {

      let doctor = await query(`select * from doctorinfo cross join educations where educations.DoctorId=doctorinfo.DoctorId and doctorinfo.DoctorId='${req.doctor.DoctorId}'`);
      if (doctor.length) {
        res.locals.doctor = doctor[0];
      }
      res.render('./doctor/doctorprofile2', { title: "Dashboard", user: { isLogin: false } });
    }
    else if (page == 2) {
      let doctor = await query(`select * from doctorinfo cross join educations where educations.DoctorId=doctorinfo.DoctorId and doctorinfo.DoctorId='${req.doctor.DoctorId}'`);
      if (doctor.length) {
        res.locals.doctor = doctor[0];
      }
      res.render('./doctor/doctorprofile2', { title: "Dashboard", user: { isLogin: false } });
    }
    else {
      let doctor = await query(`select * from doctorinfo cross join address where address.AddressId=doctorinfo.AddressId and DoctorId='${req.doctor.DoctorId}'`);
      if (doctor) {
        res.locals.doctor = doctor[0];
      }
      res.render('./doctor/doctorprofile1', { title: "Dashboard", user: { isLogin: false } });
    }

  }
  catch (e) {

    next();

  }
}

const doctorProfilePostController = async (req, res, next) => {
  let page = 1;
  page = req.query.pageNumber

  try {
    let adrs = await query(`select AddressId  from address where addressId='${req.doctor.AddressId}'`)
    let edu = await query(`select DoctorId from educations where DoctorId='${req.doctor.DoctorId}'`);
    if (!adrs.length) {
      let addres=await query(`insert into address(Location,Zip,Country) values('','','')`);
      await query(`update doctorinfo set AddressId='${addres.insertId}' where DoctorId='${req.doctor.DoctorId}'`);
      req.doctor.AddressId=addres.insertId;
    }
    
   
    if (!edu.length) {
      await query(`insert into educations(DoctorId) values('${req.doctor.DoctorId}')`);
    }
    
    let ProfileRate = await query(`select CompleteProfile from doctorinfo where doctorid='${req.doctor.DoctorId}';`);
  
    if (ProfileRate[0].CompleteProfile < 50) {
      
       await query(`update address set Location='${req.body.location}', Zip='${req.body.zip}',Country='${req.body.country}' where AddressId='${req.doctor.AddressId}'`);
      await query(`update doctorinfo set CompleteProfile=50, Name='${req.body.name}', DateOfBirth='${req.body.date.slice(0, 10)}',Gender='${req.body.gender}',BloodGroup='${req.body.bloodgroup}',Height='${req.body.height}',Weight='${req.body.weight}',Language='${req.body.language}' where DoctorId='${req.doctor.DoctorId}'`)
     
      return res.redirect('/dashboard/profile1')
    }

    // after 50% 
    else if (ProfileRate[0].CompleteProfile < 75) {
      await query(`update  educations set _option='${req.body.educations}' where doctorId='${req.doctor.DoctorId}'`);
      await query(`update doctorinfo set CompleteProfile=75, Awards='${req.body.awards}',Speciality='${req.body.speciality}',treatmentAreas='${req.body.treatmentArea}',Bio='${req.body.bio}',VideoBioUrl='${req.body.videoBioUrl}',VisitOnline='${req.body.onlineVisit}',VisitClinic='${req.body.clinicVisit}',AccountNumber='${req.body.accountNumber}',SearchTag='${req.body.SearchTag}',Available='${req.body.Available}' where DoctorId='${req.doctor.DoctorId}'`);
      return res.redirect('/dashboard/profile1');
    }
    else if (page == 2) {
    
      await query(`update educations set _option='${req.body.educations}'`);
   
    
      await query(`update doctorinfo set  Awards='${req.body.awards}',Speciality='${req.body.speciality}',treatmentAreas='${req.body.treatmentArea}',Bio='${req.body.bio}',VideoBioUrl='${req.body.videoBioUrl}',VisitOnline='${req.body.onlineVisit}',VisitClinic='${req.body.clinicVisit}',AccountNumber='${req.body.accountNumber}',SearchTag='${req.body.SearchTag}',Available='${req.body.Available}' where DoctorId='${req.doctor.DoctorId}'`)
      
      return res.redirect(`/dashboard/profile1?pageNumber=${page}`);
    }
    else {
      await query(`update address set Location='${req.body.location}',Zip='${req.body.zip}',Country='${req.body.country}';`);
      await query(`update doctorinfo set  Name='${req.body.name}', DateOfBirth='${req.body.date.slice(0, 10)}',Gender='${req.body.gender}',BloodGroup='${req.body.bloodgroup}',Height='${req.body.height}',Weight='${req.body.weight}',Language='${req.body.language}' where DoctorId='${req.doctor.DoctorId}'`)
      return res.redirect('/dashboard/profile1')
    }

  }
  catch (e) {

    next();

  }
}




module.exports = { doctorProfileGetController, doctorProfilePostController }