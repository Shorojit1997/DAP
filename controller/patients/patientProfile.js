
const bcrypt = require('bcrypt');
const query = require("../../database/query");

const PatientProfileGetController = async (req, res, next) => {


  try {
     let patient = await query(`select * from patients cross join address where address.AddressId=patients.AddressId and PatientId='${req.patient.PatientId}'`);
     if (patient.length) {
       res.locals.patient = patient[0];
    }
    return res.render('./patient/patientProfile', { title: "Dashboard" });

  }
  catch (e) {

    next();

  }
}

const PatientProfilePostController = async (req, res, next) => {

  try {

      let addressId=await query(`select AddressId from patients where PatientId='${req.patient.PatientId}'`)

      if(addressId[0].AddressId==null){
          let address=await query(`insert into address(Location,Zip,Country) values('','','')`);
          await query(`update patients set AddressId='${address.insertId}'`);
      }
      await query(`update  address set Location='${req.body.location}',Zip='${req.body.zip}',Country='${req.body.country}'`);
       await query(`update  patients set  Name='${req.body.name}',Email='${req.body.email}', DateOfBirth='${req.body.date.slice(0, 10)}',Gender='${req.body.gender}',AccountNumber='${req.body.AccountNumber}',BloodGroup='${req.body.bloodgroup}',Height='${req.body.height}',Weight='${req.body.weight}',Language='${req.body.language}' where PatientId='${req.patient.PatientId}'`)

       return res.redirect('/dashboard/patient')

  }
  catch (e) {
    console.log(e);

    next();

  }
}


module.exports = { PatientProfileGetController, PatientProfilePostController }