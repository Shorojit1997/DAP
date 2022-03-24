const query = require('../database/query')

// session authentication checker 

const isUserAuthenticated = (req,res,next) => {
  //  console.log('IsUserAuthenticated', req.session.isLogin)
    if (!req.session.isLogin) {
        return res.redirect('/login')
    }
    
    next();
}



const loginUserbinding = () => {
    return async (req, res, next) => {
       // console.log('LoginuserBinding', req.session.isLogin)
        if (!req.session.isLogin) {
            return next();
        }
        if(req.session.isLogin && (req.path=='/login' || req.path=='/signup')){
            return res.redirect('/');
        }
        try {

            let info;
            if (req.session.DoctorId) {
                info = await query(`select * from doctorInfo where DoctorId='${req.session.DoctorId}'`);
                req.doctor = info[0];
            }
            else {
                info = await query(`select * from patients where PatientId='${req.session.PatientId}'`);
                req.patient = info[0];
            }
            next();
        }
        catch (e) {
            return next(e);
        }
    }
}

module.exports = { isUserAuthenticated, loginUserbinding };