

const express = require('express');
const connection = require("./database/Database")
const router = require('./routes/routes')


const middleware = require('./middleware/middleware');
const app = express();
const port = 3000;

app.use(middleware);

app.set('view engine', 'ejs');
app.set('views','views');

router(app);

app.get('*',(req,res,next)=>{  return res.render('error',{title:"Something happened wrong!"})})

connection.connect((error) => {
  if (error) {
    console.log("Database Connection failed");
  }
  else {
    console.log("Database Success");
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    })
  }
});


