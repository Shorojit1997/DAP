
const User = require('../models/User')
const Admin = require('../models/Admin');
const Clubinfo=require('../models/Clubinfo')

const loginUserbinding = async (req, res, next) => {
    if (!req.session.isUserLogin) {
        return next();
    }
    try {
        let user = await User.findById(req.session.user._id);
        req.user = user;
        next();
    }
    catch (e) {
        return next(e);
    }
}


const loginAdminBinding = async (req, res, next) => {
    if (!req.session.isAdminLogin) {
        return next();
    }
    try {
        let admin = await Admin.findById(req.session.admin._id);
        req.admin = admin;
        next();
    }
    catch (e) {
        return next(e);
    }
}
const loginClubBinding = async (req, res, next) => {
    if (!req.session.isClubLogin) {
        return next();
    }
    try {
        let clubInfo = await Clubinfo.findById(req.session.club._id);
        req.club = clubInfo;
        next();
    }
    catch (e) {
        return next(e);
    }
}

module.exports = { loginUserbinding, loginAdminBinding,loginClubBinding }