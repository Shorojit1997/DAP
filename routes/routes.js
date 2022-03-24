const Home=require('./home');
const Doctor=require('./doctor');
const Patient=require('./patient');


let routes=[
    {
        path:'/dashboard',
        handeler:Doctor
    },
    {
        path:'/dashboard',
        handeler:Patient
    },
    {
        path:'',
        handeler:Home
    },

]

module.exports=(app)=>{

    routes.map((route)=>{
        if(route.path=='/'){
            app.get(route.path,route.handeler);
        }
        else{
            app.use(route.path,route.handeler);
        }
    })

}