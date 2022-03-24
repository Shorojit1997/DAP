
const setLocals = () => {
    return (req, res, next) => {
      res.locals.doctor = req.doctor;
      res.locals.isLogin = req.session.isLogin;
      res.locals.patient=req.patient
        next();
    }
}

module.exports = setLocals;