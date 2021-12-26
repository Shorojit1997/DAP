const CreateTable = require('../database/CreateTable')


const home = async (req, res, next) => {
  
  try {
    // CreateTable();
    console.log(req.session);
    res.setHeader('Content-Type', 'text/html');
    
    req.session.isLogin = true;
    req.session.save((err) => {
      if (err)
        return next();
    })
    res.render('index', { title: "This is doctor page" });
  }
  catch (e) {

    console.log(e);

  }


  //  res.send("Hello from doctor")
}


module.exports = { home }