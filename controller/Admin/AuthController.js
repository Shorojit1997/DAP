
const bcrypt = require('bcrypt');
const query = require("../../database/query");
const { signUpValidation, adminSignUpValidation } = require('../../validation/signupValidation')

const AdminSignupGetController = async (req, res, next) => {
    console.log('Yes_signup')
    try {

        res.render('./admin/signUp.ejs', { title: "Signup here", error:'' });
    }
    catch (e) {

        next();
    }
}

const GetLoginPostController = async (req, res, next) => {
    console.log('Yes_signup')
    try {

        res.render('./admin/login.ejs', { title: "Login Here",error:'' });
    }
    catch (e) {

        next();
    }
}


const SignupPostController = async (req, res, next) => {
    console.log(req.body);

    try {
        const error = adminSignUpValidation(req.body);
        const hashPassword = await bcrypt.hash(req.body.password, 9);

        let email = await query(`select * from admins where Email='${req.body.email}'`);
        if (email.length) {
            error.email = "Email is already exists";
            next();
        }

        await query(`insert into admins (Name,Email,Password,Role) values ('${req.body.firstname + req.body.lastname}','${req.body.email}','${hashPassword}','Admin')`);

        let admin = await query(`select * from admins where email='${req.body.email}'`);
        req.session.isLogin = true;
        req.session.isAdminLogin = true;
        req.session.AdminId = admin[0].AdminId;
        req.session.Role = admin[0].Role
        req.session.save((err) => {
            if (err)
                return next();
        })

        res.redirect('/admin/dashboard')

    }
    catch (e) {

        next();
    }
}




const LoginPostController = async (req, res, next) => {
    console.log('YesLogin')

    try {

        let email = req.body.email;
        let password = req.body.password;
        let error;

        if (!email) {
            error = "Please fill this form"
        }
        if (!password) {
            error = "Please fill this form"
        }
        if (!email || !password)
            return res.render('./admin/login',
                {
                    title: "Login Here",
                    user: { isLogin: req.session.isLogin },
                    error: 'Please Fill this form'
                });

        let user = await query(`select * from admins where email='${email}'`);

        if (!user.length) {
            return res.render('./admin/login',
                {
                    title: "Login Here",
                    user: { isLogin: req.session.isLogin },
                    error: 'Wrong Credentials'
                });
        }

        let isUser = await bcrypt.compare(password, user[0].Password);
        if (isUser) {

            req.session.isLogin = true;
            req.session.AdminId = user[0].AdminId;
            req.session.isAdminLogin = true;
            req.session.Role = user[0].Role;

            req.session.save((err) => {
                if (err)
                    return next();
            })
            return res.redirect('/admin/dashboard')
        }
        else {
            error = 'Wrong Credentials'

            return res.render('./admin/login',
                {
                    title: "Login Here",
                    user: { isLogin: req.session.isLogin },
                    error
                });
        }
    }
    catch (e) {

        next();
    }
}

const LogoutController = async (req, res, next) => {

    try {
      await req.session.destroy();
      res.redirect('/admin/login');
    }
    catch (e) {
  
      next();
    }
  }
  

module.exports = {
    SignupPostController,
    AdminSignupGetController,
    GetLoginPostController,
    LoginPostController,
    LogoutController
}