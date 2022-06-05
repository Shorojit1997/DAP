
const setLocals = () => {

    return (req, res, next) => {
      res.locals.doctor = req.doctor;
      res.locals.isLogin = req.session.isLogin;
      res.locals.patient=req.patient;
      res.locals.isAdminLogin=false;
      if(req.session.AdminId){
        res.locals.isAdminLogin=true;
      }
       next();
    }
}

module.exports = setLocals;